import type { Metadata } from 'next'
import { PageHeader, Eyebrow } from '@/components/primitives'
import { ContactForm } from '@/components/contact-form'
import { SITE } from '@/lib/site-data'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata(
  '/contact',
  'Contact',
  'Tell Peyote Labs what you need — website, SEO, audit, creatives, ads, or a product partnership. We reply from the studio inbox.',
)

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Writing as Peyote Labs — not as a freelancer."
        intro="Suitable for outbound, partnerships, and client work. Tell us what you need and we'll reply from the studio inbox."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>The studio</Eyebrow>
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
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface/30 p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="font-display text-sm italic text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  )
}
