import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, beforeEach, vi } from 'vitest'
import { ChatWidget } from '@/components/chat/chat-widget'

describe('ChatWidget', () => {
  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue('true'), // Privacy already accepted
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    }
    vi.stubGlobal('localStorage', localStorageMock)
  })

  it('shows an opening greeting and click-to-send qualification questions', async () => {
    const user = userEvent.setup()
    render(<ChatWidget />)

    await user.click(screen.getByRole('button', { name: 'Ask Peyote Labs' }))

    expect(
      screen.getByText('Tell us what you are trying to improve — your website, SEO, lead flow, creative, or paid campaigns.'),
    ).toBeInTheDocument()
    const leadsPrompt = screen.getByRole('button', { name: 'I need more qualified leads' })
    expect(leadsPrompt).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'My site is not converting' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'I need an SEO plan' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Which service fits my business?' })).toBeInTheDocument()

    await user.click(leadsPrompt)
    // After clicking, the selected prompt should be shown as a user message
    expect(screen.getByText('I need more qualified leads')).toBeInTheDocument()
  })
})
