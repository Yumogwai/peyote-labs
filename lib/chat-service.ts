import { GoogleGenAI } from '@google/genai'
import { chatReplySchema, type ChatReply } from '@/lib/chat-schema'
import { buildChatKnowledge } from '@/lib/chat-knowledge'

const MODEL_ID = 'gemini-2.5-flash'
const INPUT_PRICE_PER_M = 0.3
const OUTPUT_PRICE_PER_M = 2.5

export function estimateTurnCost(inputTokens: number, outputTokens: number): number {
  return (inputTokens / 1_000_000) * INPUT_PRICE_PER_M + (outputTokens / 1_000_000) * OUTPUT_PRICE_PER_M
}

export class ChatService {
  private ai: GoogleGenAI

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not set')
    }
    this.ai = new GoogleGenAI({ apiKey })
  }

  private buildSystemPrompt(knowledge: string): string {
    return [
      'You are the English-language sales concierge for Peyote Labs, a two-person studio in Warsaw.',
      'Your job is to qualify prospective service leads, recommend the most relevant service, and invite them to use the contact form when ready.',
      '',
      'APPROVED KNOWLEDGE BASE:',
      knowledge,
      '',
      'STRICT RULES:',
      '- Answer ONLY from the approved knowledge above. If the answer is not there, say you do not know and offer the contact form.',
      '- Do not invent prices, timelines, guarantees, clients, case studies, staff biographies, or legal/financial advice.',
      '- Do not provide product support for JobCommand or WellFitCV; link visitors to those sites instead.',
      '- Ask at most one follow-up question at a time.',
      '- Be concise, direct, and professional. Studio voice, not individual freelancer.',
      '- If the visitor asks for something outside scope, politely decline and offer the contact form.',
      '',
      'RESPONSE FORMAT (JSON only, no extra text):',
      '{',
      '  "answer": "your plain-text response to the visitor (max 1200 chars, no HTML)",',
      '  "detectedNeed": "Website" | "SEO" | "Audit" | "Creatives" | "Ads" | "Product partnership" | "Other" | null,',
      '  "shouldHandoff": boolean,',
      '  "handoffSummary": "short summary for the contact form (max 500 chars, no HTML) or null"',
      '}',
    ].join('\n')
  }

  async generateReply(
    messages: Array<{ role: 'user' | 'assistant'; content: string }>,
    knowledge?: string
  ): Promise<ChatReply> {
    const knowledgeBase = knowledge ?? buildChatKnowledge()
    const systemPrompt = this.buildSystemPrompt(knowledgeBase)

    const contents = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      ...messages.map((m) => ({ role: m.role, parts: [{ text: m.content }] })),
    ]

    const response = await this.ai.models.generateContent({
      model: MODEL_ID,
      contents,
      config: {
        temperature: 0.2,
        maxOutputTokens: 800,
        responseMimeType: 'application/json',
      },
    })

    const text = response.text?.trim()
    if (!text) {
      throw new Error('Empty response from model')
    }

    const jsonText = text
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim()

    let parsed: unknown
    try {
      parsed = JSON.parse(jsonText)
    } catch {
      throw new Error('Model response is not valid JSON')
    }

    const validated = chatReplySchema.safeParse(parsed)
    if (!validated.success) {
      throw new Error(`Model response failed validation: ${validated.error.message}`)
    }

    return validated.data
  }
}

export function getDefaultKnowledge(): string {
  return buildChatKnowledge()
}