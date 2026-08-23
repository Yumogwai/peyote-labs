import { describe, expect, it, beforeEach } from 'vitest'
import { rateLimitKey, rateLimitConfig, checkRateLimit, createRateLimiter, clearMemoryStore } from '@/lib/rate-limit'

describe('rate-limit', () => {
  beforeEach(() => {
    clearMemoryStore()
  })

  it('builds a consistent key from IP and route', () => {
    expect(rateLimitKey('1.2.3.4', '/api/chat')).toBe('ratelimit:/api/chat:1.2.3.4')
    expect(rateLimitKey('2001:db8::1', '/api/chat')).toBe('ratelimit:/api/chat:2001:db8::1')
  })

  it('uses configured limits', () => {
    const cfg = rateLimitConfig()
    expect(cfg.maxRequests).toBeGreaterThan(0)
    expect(cfg.windowMs).toBeGreaterThan(0)
  })

  it('allows requests under the limit and rejects over', async () => {
    const limiter = createRateLimiter({ maxRequests: 2, windowMs: 60_000 })
    const key = 'test-key'

    await expect(limiter.check(key)).resolves.toEqual({ allowed: true, remaining: 1 })
    await expect(limiter.check(key)).resolves.toEqual({ allowed: true, remaining: 0 })
    await expect(limiter.check(key)).resolves.toEqual({ allowed: false, remaining: 0, resetMs: expect.any(Number) })
  })
})