import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Newsreader, Source_Sans_3 } from 'next/font/google'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { GrainOverlay } from '@/components/grain-overlay'
import './globals.css'

const display = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display-family',
  display: 'swap',
})

const body = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Peyote Labs — a two-person studio in Warsaw',
    template: '%s — Peyote Labs',
  },
  description:
    'Peyote Labs is two people in Warsaw. We run our own products — JobCommand and WellFitCV — and we do websites, SEO, creatives and ads for other companies.',
  metadataBase: new URL('https://www.peyote-labs.com'),
  openGraph: {
    title: 'Peyote Labs — a two-person studio in Warsaw',
    description:
      'Two people. Two live products. Client work done the same way: websites, SEO, creatives and ads.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#120f0c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} bg-background`}>
      <body className="min-h-screen antialiased font-sans">
        <GrainOverlay />
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
