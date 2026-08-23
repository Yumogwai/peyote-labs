import { kv } from '@vercel/kv'

interface RateLimitConfig {
  maxRequests: number
  windowMs: number
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetMs?: number
}

const DEFAULT_MAX_REQUESTS = 20
const DEFAULT_WINDOW_MS = 60 * 60 * 1000 // 1 hour

// In-memory fallback for environments without Vercel KV (local dev, tests)
const memoryStore = new Map<string, number[]>()

export function rateLimitKey(ip: string, route: string): string {
  return `ratelimit:${route}:${ip}`
}

export function rateLimitConfig(): RateLimitConfig {
  return {
    maxRequests: Number(process.env.CHAT_RATE_LIMIT_PER_HOUR ?? DEFAULT_MAX_REQUESTS),
    windowMs: DEFAULT_WINDOW_MS,
  }
}

async function checkRateLimitKV(key: string, config: RateLimitConfig): Promise<RateLimitResult> {
  const now = Date.now()
  const windowStart = now - config.windowMs

  const multi = kv.multi()
  multi.zremrangebyscore(key, 0, windowStart)
  multi.zcard(key)
  multi.zadd(key, { score: now, member: `${now}-${Math.random()}` })
  multi.expire(key, Math.ceil(config.windowMs / 1000))

  const results = await multi.exec()
  const currentCount = (results[1] as number) ?? 0

  if (currentCount >= config.maxRequests) {
    const oldest = await kv.zrange(key, 0, 0, { withScores: true })
    const oldestEntry = oldest[0] as { score: number } | undefined
    const resetMs = oldestEntry ? oldestEntry.score + config.windowMs - now : config.windowMs
    return { allowed: false, remaining: 0, resetMs: Math.max(0, resetMs) }
  }

  return { allowed: true, remaining: config.maxRequests - currentCount - 1 }
}

function checkRateLimitMemory(key: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now()
  const windowStart = now - config.windowMs

  const timestamps = memoryStore.get(key) ?? []
  const recent = timestamps.filter((ts) => ts > windowStart)

  if (recent.length >= config.maxRequests) {
    const oldest = recent[0]
    const resetMs = oldest + config.windowMs - now
    return { allowed: false, remaining: 0, resetMs: Math.max(0, resetMs) }
  }

  recent.push(now)
  memoryStore.set(key, recent)
  return { allowed: true, remaining: config.maxRequests - recent.length }
}

export async function checkRateLimit(key: string, config?: Partial<RateLimitConfig>): Promise<RateLimitResult> {
  const cfg = { ...rateLimitConfig(), ...config }

  // Use Vercel KV in production (Vercel sets KV_REST_API_URL), otherwise in-memory
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    return checkRateLimitKV(key, cfg)
  }

  return checkRateLimitMemory(key, cfg)
}

export function createRateLimiter(config?: Partial<RateLimitConfig>) {
  const cfg = { ...rateLimitConfig(), ...config }
  return {
    async check(key: string): Promise<RateLimitResult> {
      return checkRateLimit(key, cfg)
    },
  }
}

// Export for testing
export function clearMemoryStore() {
  memoryStore.clear()
}