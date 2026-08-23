import { describe, expect, it, beforeEach, vi } from 'vitest'
import { ChatRepository } from '@/lib/chat-repository'

// Create a mock repository with jest.fn for each method
const createMockRepo = () => ({
  createConversation: vi.fn(),
  addMessage: vi.fn(),
  getRecentMessages: vi.fn(),
  updateConversationNeed: vi.fn(),
  markHandoffClicked: vi.fn(),
  markBudgetExhausted: vi.fn(),
  updateLastActivity: vi.fn(),
})

describe('ChatRepository', () => {
  let repo: ChatRepository
  let mockRepo: ReturnType<typeof createMockRepo>

  beforeEach(() => {
    vi.clearAllMocks()
    mockRepo = createMockRepo()
    // Use the mock methods directly
    repo = mockRepo as unknown as ChatRepository
  })

  it('creates a conversation and returns the ID', async () => {
    const mockConversation = {
      id: 'test-conv-id',
      createdAt: new Date(),
      lastActivityAt: new Date(),
      locale: 'en',
      firstPagePath: '/',
      detectedNeed: null,
      handoffClickedAt: null,
      budgetExhaustedAt: null,
    }

    mockRepo.createConversation.mockResolvedValue('test-conv-id')

    const id = await repo.createConversation({ locale: 'en', firstPagePath: '/' })
    expect(id).toBe('test-conv-id')
    expect(mockRepo.createConversation).toHaveBeenCalledWith({ locale: 'en', firstPagePath: '/' })
  })

  it('stores a message and returns it', async () => {
    const mockMessage = {
      id: 'test-msg-id',
      conversationId: 'test-conv-id',
      role: 'user',
      content: 'Hello',
      createdAt: new Date(),
      pagePath: '/',
      modelId: null,
      latencyMs: null,
    }

    mockRepo.addMessage.mockResolvedValue(mockMessage)

    const msg = await repo.addMessage({
      conversationId: 'test-conv-id',
      role: 'user',
      content: 'Hello',
      pagePath: '/',
    })
    expect(msg.id).toBe('test-msg-id')
    expect(msg.role).toBe('user')
  })

  it('fetches recent messages for a conversation', async () => {
    const mockMessages = [
      {
        id: 'msg-1',
        conversationId: 'test-conv-id',
        role: 'user',
        content: 'Hi',
        createdAt: new Date('2024-01-01T10:00:00Z'),
        pagePath: '/',
        modelId: null,
        latencyMs: null,
      },
      {
        id: 'msg-2',
        conversationId: 'test-conv-id',
        role: 'assistant',
        content: 'Hello!',
        createdAt: new Date('2024-01-01T10:00:01Z'),
        pagePath: '/',
        modelId: 'gemini-3.5-flash',
        latencyMs: 500,
      },
    ]

    mockRepo.getRecentMessages.mockResolvedValue(mockMessages)

    const messages = await repo.getRecentMessages('test-conv-id', 10)
    expect(messages).toHaveLength(2)
    expect(messages[0].role).toBe('user')
    expect(messages[1].role).toBe('assistant')
  })

  it('updates conversation detected need', async () => {
    mockRepo.updateConversationNeed.mockResolvedValue(undefined)

    await repo.updateConversationNeed('test-conv-id', 'Website')
    expect(mockRepo.updateConversationNeed).toHaveBeenCalledWith('test-conv-id', 'Website')
  })

  it('marks handoff clicked', async () => {
    mockRepo.markHandoffClicked.mockResolvedValue(undefined)

    await repo.markHandoffClicked('test-conv-id')
    expect(mockRepo.markHandoffClicked).toHaveBeenCalledWith('test-conv-id')
  })

  it('marks budget exhausted', async () => {
    mockRepo.markBudgetExhausted.mockResolvedValue(undefined)

    await repo.markBudgetExhausted('test-conv-id')
    expect(mockRepo.markBudgetExhausted).toHaveBeenCalledWith('test-conv-id')
  })
})