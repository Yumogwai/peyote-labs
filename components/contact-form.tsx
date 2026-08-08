'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { SITE } from '@/lib/site-data'

const NEEDS = [
  'Website',
  'SEO',
  'Audit',
  'Creatives',
  'Ads',
  'Product partnership',
  'Other',
]

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // No backend wired yet — capture intent and confirm calmly.
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-xl border border-accent/30 bg-accent/5 p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
          <Check className="h-5 w-5 text-accent" />
        </span>
        <h2 className="font-display text-xl font-semibold tracking-tight">
          Thanks{name ? `, ${name.split(' ')[0]}` : ''}. Message received.
        </h2>
        <p className="max-w-md leading-relaxed text-muted-foreground">
          We read everything that comes in and reply from the studio inbox, usually within a
          couple of working days. No autoresponders, no funnel.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

      <button
        type="submit"
        className="mt-1 inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-all hover:-translate-y-0.5 hover:bg-accent-2"
      >
        Send to Peyote Labs
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
      <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  )
}
