import type { Metadata } from 'next'

export const SITE_URL = 'https://www.peyote-labs.com'
export const SITE_NAME = 'Peyote Labs'

const DEFAULT_TITLE = 'Peyote Labs — Practical AI products & growth systems'
const DEFAULT_DESCRIPTION =
  'Peyote Labs is a two-person software studio in Warsaw. We build our own AI products — and help companies grow with websites, SEO, creatives, and ads.'

export function absoluteUrl(path: string): string {
  if (!path || path === '/') return SITE_URL
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

type PageMetaInput = {
  /** Path without domain, e.g. `/about` or `/` */
  path: string
  /** Short title for the `%s — Peyote Labs` template, or full title if `absoluteTitle` */
  title: string
  description: string
  /** Use full title as-is (homepage) instead of the layout template */
  absoluteTitle?: boolean
}

/**
 * Per-page metadata with canonical + Open Graph that does NOT inherit
 * the homepage OG title/description from the root layout.
 */
export function pageMeta({
  path,
  title,
  description,
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path)
  const ogTitle = absoluteTitle ? title : `${title} — ${SITE_NAME}`

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_GB',
      // Explicit — Next file-based OG images can drop when a page sets openGraph.
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: ['/twitter-image'],
    },
  }
}

export const rootDefaults = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
} as const
