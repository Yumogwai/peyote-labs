'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { SITE } from '@/lib/site-data'
import { buildMailto } from '@/lib/seo'

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
  const [sending, setSending] = useState(false)
  const [mailtoOpened, setMailtoOpened] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
      name: String(fd.get('name') || '').trim(),
      company: String(fd.get('company') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      need: String(fd.get('need') || '').trim(),
      message: String(fd.get('message') || '').trim(),
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
          <input id="company" name="company" className={inputCls} autoComplete="organization" />
        </Field>
      </div>

      <Field label="Email" htmlFor="email">
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputCls}
          autoComplete="email"
        />
      </Field>

      <Field label="What do you need?" htmlFor="need">
        <select id="need" name="need" required defaultValue="" className={inputCls}>
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
