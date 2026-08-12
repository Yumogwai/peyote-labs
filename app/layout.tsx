import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Syne, Instrument_Sans } from 'next/font/google'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { GrainOverlay } from '@/components/grain-overlay'
import { JsonLd } from '@/components/json-ld'
import {
  organizationSchema,
  professionalServiceSchema,
  websiteSchema,
} from '@/lib/schema'
import { rootDefaults, SITE_NAME, SITE_URL } from '@/lib/seo'
import './globals.css'

const display = Syne({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display-family',
})

const body = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: rootDefaults.title,
    template: `%s — ${SITE_NAME}`,
  },
  description: rootDefaults.description,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_GB',
    // title/description intentionally omitted here so child pages do not
    // inherit the homepage OG copy. Homepage sets its own via pageMeta.
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#070b0c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} bg-background`}>
      <body className="min-h-screen antialiased font-sans">
        <JsonLd data={[organizationSchema(), websiteSchema(), professionalServiceSchema()]} />
        <GrainOverlay />
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
