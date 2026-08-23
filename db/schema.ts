import { pgTable, text, timestamp, uuid, boolean, integer, index, uniqueIndex } from 'drizzle-orm/pg-core'

export const chatConversations = pgTable(
  'chat_conversations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    lastActivityAt: timestamp('last_activity_at', { withTimezone: true }).notNull().defaultNow(),
    locale: text('locale').notNull().default('en'),
    firstPagePath: text('first_page_path').notNull(),
    detectedNeed: text('detected_need'),
    handoffClickedAt: timestamp('handoff_clicked_at', { withTimezone: true }),
    budgetExhaustedAt: timestamp('budget_exhausted_at', { withTimezone: true }),
  },
  (table) => [
    index('chat_conversations_last_activity_idx').on(table.lastActivityAt),
    index('chat_conversations_detected_need_idx').on(table.detectedNeed),
  ],
)

export const chatMessages = pgTable(
  'chat_messages',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    conversationId: uuid('conversation_id')
      .notNull()
      .references(() => chatConversations.id, { onDelete: 'cascade' }),
    role: text('role', { enum: ['user', 'assistant'] }).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    pagePath: text('page_path').notNull(),
    modelId: text('model_id'),
    latencyMs: integer('latency_ms'),
  },
  (table) => [
    index('chat_messages_conversation_created_idx').on(table.conversationId, table.createdAt),
    index('chat_messages_role_idx').on(table.role),
  ],
)

export type ChatConversation = typeof chatConversations.$inferSelect
export type NewChatConversation = typeof chatConversations.$inferInsert
export type ChatMessage = typeof chatMessages.$inferSelect
export type NewChatMessage = typeof chatMessages.$inferInsert