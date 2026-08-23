import { NextRequest, NextResponse } from 'next/server'
import { chatRequestSchema } from '@/lib/chat-schema'
import { ChatRepository } from '@/lib/chat-repository'
import { ChatService, getDefaultKnowledge } from '@/lib/chat-service'
import { createBudgetTracker } from '@/lib/budget'
import { checkRateLimit, rateLimitKey } from '@/lib/rate-limit'
import { evaluateInboundMessage, redactSensitiveText } from '@/lib/chat-security'
import type { ChatReply } from '@/lib/chat-schema'

const COOKIE_NAME = 'chat_conv_id'
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 30,
  path: '/',
}

const budgetTracker = createBudgetTracker({
  monthlyBudgetUsd: Number(process.env.CHAT_MONTHLY_BUDGET_USD ?? 10),
  alertThresholdUsd: Number(process.env.CHAT_BUDGET_ALERT_USD ?? 8),
})

function chatJsonResponse(
  request: NextRequest,
  conversationId: string,
  payload: Record<string, unknown>,
  status = 200,
) {
  const response = NextResponse.json(payload, { status })
  if (!request.cookies.get(COOKIE_NAME)) {
    response.cookies.set(COOKIE_NAME, conversationId, COOKIE_OPTIONS)
  }
  return response
}

function replyPayload(reply: ChatReply, budget?: { alert: boolean; exhausted: boolean }) {
  return {
    answer: reply.answer,
    detectedNeed: reply.detectedNeed,
    shouldHandoff: reply.shouldHandoff,
    handoffSummary: reply.handoffSummary,
    budgetAlert: budget?.alert ?? false,
    budgetExhausted: budget?.exhausted ?? false,
  }
}

export async function POST(request: NextRequest) {
  if (process.env.CHAT_ENABLED !== 'true') {
    return NextResponse.json(
      { error: 'Chat is currently unavailable', handoffUrl: '/contact' },
      { status: 503 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = chatRequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid request payload', details: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const lastUserMessage = parsed.data.messages[parsed.data.messages.length - 1]
  const inbound = evaluateInboundMessage(lastUserMessage.content)

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const rateLimitResult = await checkRateLimit(rateLimitKey(ip, '/api/chat'))
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      {
        error: 'Rate limit exceeded',
        retryAfterMs: rateLimitResult.resetMs,
        handoffUrl: '/contact',
      },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil((rateLimitResult.resetMs ?? 60000) / 1000)) },
      },
    )
  }

  const budgetStatus = budgetTracker.getStatus()
  if (!budgetStatus.allowed && inbound.action === 'allow') {
    return NextResponse.json(
      { error: 'AI budget exhausted for this month', handoffUrl: '/contact' },
      { status: 503 },
    )
  }

  const repo = new ChatRepository()
  let conversationId = request.cookies.get(COOKIE_NAME)?.value

  if (!conversationId) {
    conversationId = await repo.createConversation({
      locale: 'en',
      firstPagePath: request.headers.get('referer') ?? '/',
    })
  }

  const storedUserContent =
    inbound.action === 'allow'
      ? inbound.content
      : redactSensitiveText(lastUserMessage.content.trim())

  await repo.addMessage({
    conversationId,
    role: 'user',
    content: storedUserContent,
    pagePath: request.headers.get('referer') ?? '/',
  })

  if (inbound.action === 'block') {
    await repo.addMessage({
      conversationId,
      role: 'assistant',
      content: inbound.reply.answer,
      pagePath: request.headers.get('referer') ?? '/',
      modelId: 'security-filter',
      latencyMs: 0,
    })
    await repo.updateLastActivity(conversationId)
    return chatJsonResponse(request, conversationId, replyPayload(inbound.reply))
  }

  const history = await repo.getRecentMessages(conversationId, 20)
  const contextMessages = history
    .reverse()
    .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))

  let reply: ChatReply
  try {
    const service = new ChatService()
    reply = await service.generateReply(contextMessages, getDefaultKnowledge())
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown model error'
    console.error('[chat] Model error:', message, error)
    const payload: Record<string, string> = {
      error: 'Unable to generate response',
      handoffUrl: '/contact',
    }
    if (process.env.NODE_ENV !== 'production') {
      payload.detail = message
    }
    return NextResponse.json(payload, { status: 502 })
  }

  await repo.addMessage({
    conversationId,
    role: 'assistant',
    content: reply.answer,
    pagePath: request.headers.get('referer') ?? '/',
    modelId: 'gemini-2.5-flash',
    latencyMs: 0,
  })

  if (reply.detectedNeed) {
    await repo.updateConversationNeed(conversationId, reply.detectedNeed)
  }
  if (reply.shouldHandoff) {
    await repo.markHandoffClicked(conversationId)
  }
  await repo.updateLastActivity(conversationId)

  budgetTracker.recordSpend(0.0045)
  const updatedBudget = budgetTracker.getStatus()
  if (!updatedBudget.allowed) {
    await repo.markBudgetExhausted(conversationId)
  }

  return chatJsonResponse(
    request,
    conversationId,
    replyPayload(reply, { alert: updatedBudget.alert, exhausted: updatedBudget.exhausted }),
  )
}
