import { describe, expect, it } from 'vitest'
import { chatReplySchema, chatRequestSchema } from '@/lib/chat-schema'

describe('chatRequestSchema', () => {
  it('accepts a single message field', () => {
    const parsed = chatRequestSchema.safeParse({ message: 'I need more qualified leads.' })
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.data).toBe('I need more qualified leads.')
    }
  })

  it('accepts legacy single-item messages array', () => {
    const parsed = chatRequestSchema.safeParse({
      messages: [{ role: 'user', content: 'I need more qualified leads.' }],
    })
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.data).toBe('I need more qualified leads.')
    }
  })

  it('rejects oversized content and unsafe payloads', () => {
    expect(chatRequestSchema.safeParse({ message: 'x'.repeat(1001) }).success).toBe(false)
    expect(chatRequestSchema.safeParse({ message: 'javascript:alert(1)' }).success).toBe(false)
    expect(chatRequestSchema.safeParse({}).success).toBe(false)
  })
})

describe('chatReplySchema', () => {
  it('allows only approved services and plain-text handoff summaries', () => {
    expect(
      chatReplySchema.safeParse({
        answer: 'A marketing audit is a good first step.',
        detectedNeed: 'Audit',
        shouldHandoff: true,
        handoffSummary: 'Visitor wants a funnel and tracking review.',
      }).success,
    ).toBe(true)

    expect(
      chatReplySchema.safeParse({
        answer: '<script>alert(1)</script>',
        detectedNeed: 'Unknown service',
        shouldHandoff: true,
        handoffSummary: 'x'.repeat(501),
      }).success,
    ).toBe(false)
  })
})
