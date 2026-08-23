'use client'

import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import { SITE } from '@/lib/site-data'
import { buildMailto } from '@/lib/seo'
import { readChatHandoff, clearChatHandoff } from '@/lib/chat-handoff'
import { sanitizeHandoffText } from '@/lib/chat-security'

const NEEDS = [
  'Website',
  'SEO',
  'Audit',
  'Creatives',
  'Ads',
  'Product partnership',
  'Other',
]

type Payload = {
  name: string
  company: string
  email: string
  need: string
  message: string
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [need, setNeed] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [mailtoOpened, setMailtoOpened] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const stored = readChatHandoff()
    if (stored) {
      if (NEEDS.includes(stored.need)) {
        setNeed(stored.need)
      }
      const summary = sanitizeHandoffText(stored.summary)
      if (summary) {
        setMessage((prev) => `${prev}${prev ? '\n\n' : ''}Chat context:\n${summary}`)
      }
      clearChatHandoff()
      return
    }

    const params = new URLSearchParams(window.location.search)
    const handoffNeed = params.get('need')
    const handoffContext = params.get('context')
    if (handoffNeed && NEEDS.includes(handoffNeed)) {
      setNeed(handoffNeed)
    }
    if (handoffContext) {
      setMessage((prev) =>
        `${prev}${prev ? '\n\n' : ''}Chat context:\n${sanitizeHandoffText(handoffContext)}`,
      )
    }
    if (handoffNeed || handoffContext) {
      window.history.replaceState({}, '', '/contact')
    }
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (sending) return
    setError(null)
    setSending(true)

    const fd = new FormData(e.currentTarget)
    if (String(fd.get('website') || '').trim()) {
      setSubmitted(true)
      setSending(false)
      return
    }

    const payload: Payload = {
      name: String(fd.get('name') || name).trim(),
      company: String(fd.get('company') || company).trim(),
      email: String(fd.get('email') || email).trim(),
      need: String(fd.get('need') || need).trim(),
      message: String(fd.get('message') || message).trim(),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null
      if (res.ok && data?.ok) {
        setSubmitted(true)
        return
      }
      throw new Error(data?.error || 'send failed')
    } catch {
      window.location.href = buildMailto(payload)
      setMailtoOpened(true)
    } finally {
      setSending(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-xl border border-accent/30 bg-accent/5 p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
          <Check className="h-5 w-5 text-accent" />
        </span>
        <h2 className="font-display text-xl font-medium">
          Thanks{name ? `, ${name.split(' ')[0]}` : ''}. Message received.
        </h2>
        <p className="max-w-md leading-relaxed text-muted-foreground">
          We read everything that comes in and reply from the studio inbox, usually within a
          couple of working days. No autoresponders, no funnel.
        </p>
      </div>
    )
  }

  if (mailtoOpened) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-xl border border-border bg-surface/40 p-8">
        <h2 className="font-display text-xl font-medium">Finish sending from your email.</h2>
        <p className="max-w-md leading-relaxed text-muted-foreground">
          Your email app should have opened with the message ready. If it did not, write to{' '}
          <a href={`mailto:${SITE.email}`} className="text-foreground underline underline-offset-2">
            {SITE.email}
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <input
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputCls}
            autoComplete="name"
          />
        </Field>
        <Field label="Company" htmlFor="company">
          <input
            id="company"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputCls}
            autoComplete="organization"
          />
        </Field>
      </div>

      <Field label="Email" htmlFor="email">
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
          autoComplete="email"
        />
      </Field>

      <Field label="What do you need?" htmlFor="need">
        <select
          id="need"
          name="need"
          required
          value={need}
          onChange={(e) => setNeed(e.target.value)}
          className={inputCls}
        >
          <option value="" disabled>
            Select one
          </option>
          {NEEDS.map((n) => (
            <option key={n} value={n} className="bg-surface text-foreground">
              {n}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputCls} resize-none`}
        />
      </Field>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <button
        type="submit"
        disabled={sending}
        className="mt-1 inline-flex items-center justify-center rounded-sm bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-2 disabled:opacity-60"
      >
        {sending ? 'Sending…' : 'Send to Peyote Labs'}
      </button>

      <p className="text-xs leading-relaxed text-muted-foreground">
        Replies come from the company inbox ({SITE.email}) — the studio identity we use for both
        outbound and inbound.
      </p>
    </form>
  )
}

const inputCls =
  'w-full rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-accent/60 focus:outline-none'

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <span className="text-sm text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  )
}
