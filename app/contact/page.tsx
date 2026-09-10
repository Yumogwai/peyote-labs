import type { Metadata } from 'next'
import { PageHeader, Eyebrow } from '@/components/primitives'
import { ContactForm } from '@/components/contact-form'
import { SITE } from '@/lib/site-data'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata(
  '/contact',
  'Contact the Warsaw studio',
  'Tell Peyote Labs what you need — website, SEO, audit, creatives, ads, or a product partnership. We usually reply within one business day from the studio inbox.',
)

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us what you need. We reply from the studio."
        intro="Website, SEO, audit, creatives, ads, or a product build — write once. We usually answer within one business day."
        compactMobile
      />

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow as="h2">The studio</Eyebrow>
            <div className="mt-6 flex flex-col gap-5 leading-relaxed text-foreground/90">
              <p>
                We are a two-person studio in {SITE.location}. When you write to us, you reach
                the people who actually do the work — not a sales layer.
              </p>
              <p>
                Good fits: companies that need a real web presence, teams whose growth has
                stalled, and founders who want a product built by people who ship their own.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4 border-t border-border pt-8">
              <ContactRow label="Email">
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-foreground transition-colors hover:text-accent"
                >
                  {SITE.email}
                </a>
              </ContactRow>
              <ContactRow label="LinkedIn">
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors hover:text-accent"
                >
                  Peyote Labs
                </a>
              </ContactRow>
              <ContactRow label="Based in">
                <span className="text-foreground">{SITE.location}</span>
              </ContactRow>
              <ContactRow label="Response">
                <span className="text-foreground">Usually within one business day</span>
              </ContactRow>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface/30 p-6 sm:p-8">
            <Eyebrow as="h2">Write to us</Eyebrow>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="font-display text-sm italic text-muted-foreground">{label}</span>
      {children}
    </div>
  )
}
