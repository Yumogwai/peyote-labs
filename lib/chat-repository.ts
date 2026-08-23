import { dbProxy } from '@/lib/db'
import { chatConversations, chatMessages } from '@/db/schema'
import { eq, desc, and } from 'drizzle-orm'
import type { NewChatConversation, NewChatMessage, ChatConversation, ChatMessage } from '@/db/schema'

export class ChatRepository {
  async createConversation(data: Pick<NewChatConversation, 'locale' | 'firstPagePath'>): Promise<string> {
    const result = await dbProxy
      .insert(chatConversations)
      .values({
        locale: data.locale,
        firstPagePath: data.firstPagePath,
      })
      .returning({ id: chatConversations.id })

    return result[0].id
  }

  async getConversation(id: string): Promise<ChatConversation | null> {
    const result = await dbProxy
      .select()
      .from(chatConversations)
      .where(eq(chatConversations.id, id))
      .limit(1)

    return result[0] ?? null
  }

  async addMessage(data: NewChatMessage): Promise<ChatMessage> {
    const result = await dbProxy
      .insert(chatMessages)
      .values(data)
      .returning()

    return result[0]
  }

  async getRecentMessages(conversationId: string, limit: number): Promise<ChatMessage[]> {
    return dbProxy
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.conversationId, conversationId))
      .orderBy(desc(chatMessages.createdAt))
      .limit(limit)
  }

  async updateConversationNeed(conversationId: string, need: string): Promise<void> {
    await dbProxy
      .update(chatConversations)
      .set({ detectedNeed: need, lastActivityAt: new Date() })
      .where(eq(chatConversations.id, conversationId))
  }

  async markHandoffClicked(conversationId: string): Promise<void> {
    await dbProxy
      .update(chatConversations)
      .set({ handoffClickedAt: new Date(), lastActivityAt: new Date() })
      .where(eq(chatConversations.id, conversationId))
  }

  async markBudgetExhausted(conversationId: string): Promise<void> {
    await dbProxy
      .update(chatConversations)
      .set({ budgetExhaustedAt: new Date(), lastActivityAt: new Date() })
      .where(eq(chatConversations.id, conversationId))
  }

  async updateLastActivity(conversationId: string): Promise<void> {
    await dbProxy
      .update(chatConversations)
      .set({ lastActivityAt: new Date() })
      .where(eq(chatConversations.id, conversationId))
  }

  async deleteConversation(conversationId: string): Promise<void> {
    await dbProxy
      .delete(chatConversations)
      .where(eq(chatConversations.id, conversationId))
  }
}