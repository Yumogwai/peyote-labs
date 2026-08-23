import { NextResponse } from 'next/server'
import { SITE } from '@/lib/site-data'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const company = String(body.company ?? '').trim()
  const need = String(body.need ?? '').trim()
  const message = String(body.message ?? '').trim()
  const honeypot = String(body.website ?? '').trim()

  if (honeypot) {
    return NextResponse.json({ ok: true })
  }

  if (!name || !email || !need || !message) {
    return NextResponse.json({ ok: false, error: 'Please fill in the required fields.' }, { status: 400 })
  }
  if (!EMAIL.test(email) || message.length > 5000 || name.length > 200) {
    return NextResponse.json({ ok: false, error: 'Please check your details and try again.' }, { status: 400 })
  }

  const payload = {
    name,
    email,
    company,
    need,
    message,
    _subject: `${SITE.name} — ${need} from ${name}`,
    _template: 'box',
    _replyto: email,
    _captcha: 'false',
  }

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })
    const data = (await res.json().catch(() => null)) as
      | { success?: string | boolean; message?: string }
      | null
    const sent = res.ok && (data?.success === true || data?.success === 'true')
    if (!sent) {
      console.error('[contact] FormSubmit rejected:', res.status, data?.message ?? data)
      return NextResponse.json(
        { ok: false, error: 'Could not send just now. Use the studio inbox instead.' },
        { status: 502 },
      )
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Could not send just now. Use the studio inbox instead.' },
      { status: 502 },
    )
  }
}
