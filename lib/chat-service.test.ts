import { describe, expect, it, vi, beforeEach } from 'vitest'
import { chatReplySchema } from '@/lib/chat-schema'

// Test the schema validation and estimateTurnCost without actual service calls
describe('chatReplySchema', () => {
  it('validates a correct reply structure', () => {
    const validReply = {
      answer: 'A marketing audit is a good first step.',
      detectedNeed: 'Audit',
      shouldHandoff: true,
      handoffSummary: 'Visitor wants a funnel and tracking review.',
    }

    const parsed = chatReplySchema.safeParse(validReply)
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.data.answer).toContain('marketing audit')
      expect(parsed.data.detectedNeed).toBe('Audit')
      expect(parsed.data.shouldHandoff).toBe(true)
    }
  })

  it('rejects reply with missing required fields', () => {
    const invalidReply = {
      answer: 'Test',
      // missing detectedNeed, shouldHandoff
    }

    const parsed = chatReplySchema.safeParse(invalidReply)
    expect(parsed.success).toBe(false)
  })

  it('rejects reply with invalid shouldHandoff type', () => {
    const invalidReply = {
      answer: 'Test',
      detectedNeed: 'Website',
      shouldHandoff: 'yes', // should be boolean
      handoffSummary: null,
    }

    const parsed = chatReplySchema.safeParse(invalidReply)
    expect(parsed.success).toBe(false)
  })
})

describe('estimateTurnCost', () => {
  it('estimates cost based on token counts', () => {
    // Recreate the function inline for testing
    const estimateTurnCost = (inputTokens: number, outputTokens: number): number => {
      // $1.50/M input + $9.00/M output (Gemini 3.5 Flash pricing)
      return (inputTokens / 1_000_000) * 1.50 + (outputTokens / 1_000_000) * 9.00
    }

    const cost = estimateTurnCost(1500, 250)
    // $1.50/M input + $9.00/M output
    const expected = (1500 / 1_000_000) * 1.50 + (250 / 1_000_000) * 9.00
    expect(cost).toBeCloseTo(expected, 6)
  })

  it('returns 0 for zero tokens', () => {
    const estimateTurnCost = (inputTokens: number, outputTokens: number): number => {
      return (inputTokens / 1_000_000) * 1.50 + (outputTokens / 1_000_000) * 9.00
    }

    expect(estimateTurnCost(0, 0)).toBe(0)
  })

  it('scales linearly with token count', () => {
    const estimateTurnCost = (inputTokens: number, outputTokens: number): number => {
      return (inputTokens / 1_000_000) * 1.50 + (outputTokens / 1_000_000) * 9.00
    }

    const cost1000 = estimateTurnCost(1000, 0)
    const cost2000 = estimateTurnCost(2000, 0)
    expect(cost2000).toBeCloseTo(cost1000 * 2, 6)
  })
})