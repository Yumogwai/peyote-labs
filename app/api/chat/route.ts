import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { chatRequestSchema } from '@/lib/chat-schema'
import { ChatRepository } from '@/lib/chat-repository'
import { ChatService } from '@/lib/chat-service'
import { createBudgetTracker } from '@/lib/budget'
import { checkRateLimit, rateLimitKey } from '@/lib/rate-limit'
import { getDefaultKnowledge } from '@/lib/chat-service'

const COOKIE_NAME = 'chat_conv_id'
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 30, // 30 days
  path: '/',
}

const budgetTracker = createBudgetTracker({
  monthlyBudgetUsd: Number(process.env.CHAT_MONTHLY_BUDGET_USD ?? 10),
  alertThresholdUsd: Number(process.env.CHAT_BUDGET_ALERT_USD ?? 8),
})

export async function POST(request: NextRequest) {
  // Check if chat is enabled
  if (process.env.CHAT_ENABLED !== 'true') {
    return NextResponse.json(
      { error: 'Chat is currently unavailable', handoffUrl: '/contact' },
      { status: 503 }
    )
  }

  // Parse and validate request
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = chatRequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request payload', details: parsed.error.flatten() }, { status: 400 })
  }

  const { messages } = parsed.data

  // Rate limiting by IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const rateLimitResult = await checkRateLimit(rateLimitKey(ip, '/api/chat'))
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      {
        error: 'Rate limit exceeded',
        retryAfterMs: rateLimitResult.resetMs,
        handoffUrl: '/contact',
      },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rateLimitResult.resetMs ?? 60000) / 1000)) } }
    )
  }

  // Budget check
  const budgetStatus = budgetTracker.getStatus()
  if (!budgetStatus.allowed) {
    return NextResponse.json(
      { error: 'AI budget exhausted for this month', handoffUrl: '/contact' },
      { status: 503 }
    )
  }

  // Get or create conversation
  const repo = new ChatRepository()
  let conversationId = request.cookies.get(COOKIE_NAME)?.value

  if (!conversationId) {
    const firstPagePath = request.headers.get('referer') ?? '/'
    conversationId = await repo.createConversation({ locale: 'en', firstPagePath })
  }

  // Store user message
  const lastUserMessage = messages[messages.length - 1]
  await repo.addMessage({
    conversationId,
    role: 'user',
    content: lastUserMessage.content,
    pagePath: request.headers.get('referer') ?? '/',
  })

  // Get recent history for context (last 10 turns = 20 messages max)
  const history = await repo.getRecentMessages(conversationId, 20)
  const contextMessages = history
    .reverse()
    .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))

  // Generate AI response
  let reply
  try {
    const service = new ChatService()
    reply = await service.generateReply(contextMessages, getDefaultKnowledge())
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown model error'
    console.error('[chat] Model error:', message, error)
    return NextResponse.json(
      { error: 'Unable to generate response', handoffUrl: '/contact', detail: message },
      { status: 502 }
    )
  }

  // Store assistant message
  await repo.addMessage({
    conversationId,
    role: 'assistant',
    content: reply.answer,
    pagePath: request.headers.get('referer') ?? '/',
    modelId: 'gemini-2.5-flash',
    latencyMs: 0, // Could be measured
  })

  // Update conversation metadata
  if (reply.detectedNeed) {
    await repo.updateConversationNeed(conversationId, reply.detectedNeed)
  }
  if (reply.shouldHandoff) {
    await repo.markHandoffClicked(conversationId)
  }
  await repo.updateLastActivity(conversationId)

  // Record budget spend (estimate based on typical token counts)
  budgetTracker.recordSpend(0.0045) // ~$0.0045 per turn estimate

  // Check budget after spend
  const updatedBudget = budgetTracker.getStatus()
  if (!updatedBudget.allowed) {
    await repo.markBudgetExhausted(conversationId)
  }

  // Build response
  const response = NextResponse.json({
    answer: reply.answer,
    detectedNeed: reply.detectedNeed,
    shouldHandoff: reply.shouldHandoff,
    handoffSummary: reply.handoffSummary,
    budgetAlert: updatedBudget.alert,
    budgetExhausted: updatedBudget.exhausted,
  })

  // Set conversation cookie if new
  if (!request.cookies.get(COOKIE_NAME)) {
    response.cookies.set(COOKIE_NAME, conversationId, COOKIE_OPTIONS)
  }

  return response
}