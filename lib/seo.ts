import type { Metadata } from 'next'
import { SITE } from '@/lib/site-data'

const OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: SITE.name,
} as const

/**
 * Per-page metadata with canonical + Open Graph that does not inherit
 * the homepage OG title/description, and always includes social images.
 */
export function pageMetadata(
  path: string,
  title: string,
  description: string,
): Metadata {
  const url = path === '/' ? SITE.url : `${SITE.url}${path}`
  const ogTitle = path === '/' ? title : `${title} — ${SITE.name}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      url,
      type: 'website',
      siteName: SITE.name,
      locale: 'en_GB',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: ['/twitter-image'],
    },
  }
}

export function buildMailto(payload: {
  name: string
  company?: string
  email: string
  need: string
  message: string
}) {
  const subject = `${SITE.name} — ${payload.need || 'enquiry'} from ${payload.name}`
  const body = [
    payload.message,
    '',
    `— ${payload.name}`,
    payload.company ? payload.company : '',
    payload.email,
  ]
    .filter((line) => line !== '')
    .join('\n')
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
