import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

// Lazy database connection - only create when DATABASE_URL is available
let db: ReturnType<typeof drizzle> | null = null

export function getDb() {
  if (!db && process.env.DATABASE_URL) {
    const sql = neon(process.env.DATABASE_URL)
    db = drizzle(sql)
  }
  return db
}

// Export a proxy that throws a clear error if used without DATABASE_URL
export const dbProxy = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop) {
    const realDb = getDb()
    if (!realDb) {
      throw new Error('Database not initialized. DATABASE_URL environment variable is required.')
    }
    return (realDb as any)[prop]
  },
})