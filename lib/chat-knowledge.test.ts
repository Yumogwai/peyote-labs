import { describe, expect, it } from 'vitest'
import { buildChatKnowledge } from '@/lib/chat-knowledge'

describe('buildChatKnowledge', () => {
  it('includes every approved Peyote Labs service and product link', () => {
    const knowledge = buildChatKnowledge()

    expect(knowledge).toContain('Website design & build')
    expect(knowledge).toContain('SEO & SEO automation')
    expect(knowledge).toContain('Marketing audit')
    expect(knowledge).toContain('Creative generation')
    expect(knowledge).toContain('Advertising')
    expect(knowledge).toContain('https://job-command.com')
    expect(knowledge).toContain('https://wellfitcv.com')
  })

  it('sets safe commercial and product-support boundaries', () => {
    const knowledge = buildChatKnowledge()

    expect(knowledge).toContain('Do not invent prices, timelines, guarantees, clients, or case studies.')
    expect(knowledge).toContain('Never ask for or repeat passwords, API keys, payment card numbers, or private employee information.')
  })
})
