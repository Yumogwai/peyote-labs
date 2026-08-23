'use client'

import { MessageCircle, X, Send, Loader2, AlertCircle, Check } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { saveChatHandoff } from '@/lib/chat-handoff'

const SUGGESTIONS = [
  'I need more qualified leads',
  'My site is not converting',
  'I need an SEO plan',
  'Which service fits my business?',
]

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatState {
  messages: Message[]
  status: 'idle' | 'sending' | 'error' | 'rate_limited' | 'budget_exhausted' | 'handoff'
  errorMessage?: string
  budgetAlert: boolean
  showPrivacyBanner: boolean
  handoffData?: {
    summary: string
    need: string
  }
}

const STORAGE_KEY = 'peyote_chat_privacy_accepted'

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<ChatState>({
    messages: [],
    status: 'idle',
    budgetAlert: false,
    showPrivacyBanner: true,
  })
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesScrollRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const isFirstOpen = useRef(true)

  // Load privacy acceptance from localStorage
  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY)
    if (accepted === 'true') {
      setState((prev) => ({ ...prev, showPrivacyBanner: false }))
    }
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current && typeof messagesEndRef.current.scrollIntoView === 'function') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [state.messages])

  // Keep wheel / touch scroll inside the chat panel (no background scroll-through)
  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    const messages = messagesScrollRef.current
    if (!panel) return

    const trapWheel = (event: WheelEvent) => {
      const scrollEl = messages
      if (!scrollEl) {
        event.preventDefault()
        return
      }

      const { scrollTop, scrollHeight, clientHeight } = scrollEl
      const canScroll = scrollHeight > clientHeight + 1
      const delta = event.deltaY
      const atTop = scrollTop <= 0
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1

      if (!canScroll || (delta < 0 && atTop) || (delta > 0 && atBottom)) {
        event.preventDefault()
      }
    }

    panel.addEventListener('wheel', trapWheel, { passive: false })
    return () => panel.removeEventListener('wheel', trapWheel)
  }, [open])

  // Generate unique ID
  const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

  // Accept privacy banner
  const acceptPrivacy = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setState((prev) => ({ ...prev, showPrivacyBanner: false }))
  }

  // Send message to API
  const sendMessage = useCallback(async (content: string) => {
    if (state.showPrivacyBanner) return

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date(),
    }

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      status: 'sending',
      errorMessage: undefined,
    }))

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 429) {
          setState((prev) => ({
            ...prev,
            status: 'rate_limited',
            errorMessage: data.error || 'Rate limit exceeded. Please try again later.',
          }))
        } else if (response.status === 503) {
          setState((prev) => ({
            ...prev,
            status: data.budgetExhausted ? 'budget_exhausted' : 'error',
            errorMessage: data.error || 'Chat is currently unavailable.',
          }))
        } else {
          throw new Error(data.error || 'Failed to get response')
        }
        return
      }

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: data.answer,
        timestamp: new Date(),
      }

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        status: data.shouldHandoff ? 'handoff' : 'idle',
        budgetAlert: data.budgetAlert ?? prev.budgetAlert,
        handoffData: data.shouldHandoff ? { summary: data.handoffSummary || '', need: data.detectedNeed || '' } : undefined,
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: 'error',
        errorMessage: 'Unable to connect. Please try again or use the contact form.',
      }))
    }
  }, [state.messages, state.showPrivacyBanner])

  const handleSuggestionClick = (suggestion: string) => {
    if (state.showPrivacyBanner) return
    sendMessage(suggestion)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (state.showPrivacyBanner) return
    if (inputValue.trim() && state.status === 'idle') {
      sendMessage(inputValue.trim())
      setInputValue('')
    }
  }

  // Retry last message
  const handleRetry = () => {
    const lastUserMsg = [...state.messages].reverse().find((m) => m.role === 'user')
    if (lastUserMsg) {
      // Remove the failed assistant message if exists
      setState((prev) => ({
        ...prev,
        messages: prev.messages.filter((m) => !(m.role === 'assistant' && m.timestamp > lastUserMsg.timestamp)),
      }))
      sendMessage(lastUserMsg.content)
    }
  }

  // Navigate to contact form with prefilled data
  const goToContact = () => {
    if (state.handoffData) {
      saveChatHandoff({
        need: state.handoffData.need,
        summary: state.handoffData.summary,
      })
    }
    window.location.href = '/contact?from=chat'
  }

  // Close chat
  const closeChat = () => {
    setOpen(false)
  }

  // Toggle chat
  const toggleChat = () => {
    setOpen((prev) => !prev)
  }

  // Handle key down for Escape
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && open) {
      closeChat()
    }
  }

  if (!open && state.messages.length === 0) {
    // Show only launcher when closed and no history
    return (
      <div className="fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7" onKeyDown={handleKeyDown}>
        <button
          type="button"
          onClick={toggleChat}
          className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-background px-4 py-3 text-sm font-medium text-accent shadow-lg shadow-black/25 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none"
          aria-label="Ask Peyote Labs"
          aria-expanded="false"
        >
          <MessageCircle className="h-4 w-4" />
          Ask Peyote Labs
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7" onKeyDown={handleKeyDown}>
      {open && (
        <section
          ref={panelRef}
          aria-label="Peyote Labs chat"
          className="mb-3 flex max-h-[min(32rem,70vh)] w-[min(23rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-black/30 animate-in slide-in-from-bottom-2 duration-200"
        >
          <header className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
            <p className="font-display text-base font-medium">Ask Peyote Labs</p>
            <button
              type="button"
              onClick={closeChat}
              className="rounded-sm p-1 text-muted-foreground hover:bg-surface-2 hover:text-foreground focus-visible:outline-none"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div
            ref={messagesScrollRef}
            className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain p-4"
          >
            {/* Privacy banner */}
            {state.showPrivacyBanner && (
              <div className="mb-4 rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-xs leading-relaxed text-accent-foreground">
                This chat is for Peyote Labs services only. We store messages under an anonymous ID.
                Do not share passwords, API keys, payment cards, or other secrets here.
                <a href="/privacy" className="underline hover:no-underline ml-1">
                  Privacy policy
                </a>
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={acceptPrivacy}
                    className="text-xs px-2 py-1 rounded border border-accent/40 hover:bg-accent/20 transition-colors"
                  >
                    I agree
                  </button>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex flex-col gap-3">
              {state.messages.length === 0 && !state.showPrivacyBanner && (
                <>
                  <p className="rounded-lg border border-border bg-background px-3 py-3 text-sm leading-relaxed text-foreground">
                    Tell us what you are trying to improve — your website, SEO, lead flow, creative, or paid campaigns.
                  </p>
                  <div className="flex flex-wrap gap-2" aria-label="Suggested questions">
                    {SUGGESTIONS.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        disabled={state.status !== 'idle' || state.showPrivacyBanner}
                        className="rounded-full border border-accent/40 px-3 py-2 text-left text-xs text-accent transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {state.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  data-chat-message={message.role}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-accent text-accent-foreground rounded-tr-sm'
                        : 'bg-background border border-border text-foreground rounded-tl-sm'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {state.status === 'sending' && (
                <div className="flex gap-2 justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl bg-background border border-border px-3 py-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin text-accent" />
                    <span>Thinking…</span>
                  </div>
                </div>
              )}

              {/* Error states */}
              {state.status === 'error' && (
                <div className="flex gap-2 justify-start">
                  <div className="flex items-center gap-2 rounded-2xl border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{state.errorMessage}</span>
                  </div>
                </div>
              )}

              {state.status === 'rate_limited' && (
                <div className="flex gap-2 justify-start">
                  <div className="flex items-center gap-2 rounded-2xl border border-warning/50 bg-warning/10 px-3 py-2 text-sm text-warning">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{state.errorMessage}</span>
                  </div>
                </div>
              )}

              {state.status === 'budget_exhausted' && (
                <div className="flex gap-2 justify-start">
                  <div className="flex items-center gap-2 rounded-2xl border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{state.errorMessage}</span>
                  </div>
                </div>
              )}

              {/* Handoff CTA */}
              {state.status === 'handoff' && (
                <div className="flex flex-col gap-2 pt-2 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Ready to start a project conversation? I'll pass your details to the studio.
                  </p>
                  <button
                    type="button"
                    onClick={goToContact}
                    className="w-full rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors focus-visible:outline-none"
                  >
                    Continue on contact form
                    <Send className="ml-2 h-4 w-4 inline-block" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setState((prev) => ({ ...prev, status: 'idle', handoffData: undefined }))}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Keep chatting instead
                  </button>
                </div>
              )}

              {/* Budget alert banner */}
              {state.budgetAlert && state.status !== 'budget_exhausted' && (
                <div className="rounded-lg border border-warning/50 bg-warning/10 px-3 py-2 text-xs text-warning">
                  Our AI budget is running low this month. The chat may become unavailable soon — use the contact form for guaranteed response.
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="shrink-0 border-t border-border p-4 pt-3">
            {/* Input area */}
            {state.status !== 'handoff' && state.status !== 'budget_exhausted' && (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message…"
                  disabled={state.status !== 'idle' || state.showPrivacyBanner}
                  maxLength={1000}
                  className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Chat message"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || state.status !== 'idle' || state.showPrivacyBanner}
                  className="rounded-lg bg-accent px-3 py-2 text-accent-foreground hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none"
                  aria-label="Send message"
                >
                  {state.status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </form>
            )}

            {/* Disclaimer */}
            <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
              AI assistant for Peyote Labs services only. Never share secrets here.
            </p>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={toggleChat}
        className={`inline-flex items-center gap-2 rounded-full border border-accent/50 px-4 py-3 text-sm font-medium shadow-lg shadow-black/25 transition-colors focus-visible:outline-none ${
          open
            ? 'bg-accent text-accent-foreground'
            : 'bg-background text-accent hover:bg-accent hover:text-accent-foreground'
        }`}
        aria-label="Ask Peyote Labs"
        aria-expanded={open}
      >
        <MessageCircle className="h-4 w-4" />
        Ask Peyote Labs
      </button>
    </div>
  )
}