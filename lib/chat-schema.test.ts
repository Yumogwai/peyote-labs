import { describe, expect, it } from 'vitest'
import { chatReplySchema, chatRequestSchema } from '@/lib/chat-schema'

describe('chatRequestSchema', () => {
  it('accepts a short visitor message and rejects oversized content', () => {
    expect(
      chatRequestSchema.safeParse({
        messages: [{ role: 'user', content: 'I need more qualified leads.' }],
      }).success,
    ).toBe(true)

    expect(
      chatRequestSchema.safeParse({
        messages: [{ role: 'user', content: 'x'.repeat(1001) }],
      }).success,
    ).toBe(false)
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
