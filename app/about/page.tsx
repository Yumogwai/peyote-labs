import type { Metadata } from 'next'
import { PageHeader, PrimaryCta, Eyebrow } from '@/components/primitives'
import { SITE } from '@/lib/site-data'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata(
  '/about',
  'About',
  'Peyote Labs is a two-person software studio in Warsaw. We design, build, and run our own AI products — and apply the same craft to client work.',
)

const PRINCIPLES = [
  {
    title: 'We ship, then we talk.',
    body: 'Our products are live with real users. We would rather show you something working than pitch you a roadmap.',
  },
  {
    title: 'Honest about AI.',
    body: 'AI is a tool, not a personality. We use it where it earns its place and say so where it does not. WellFitCV never fabricates experience — that is a rule, not a feature.',
  },
  {
    title: 'Small on purpose.',
    body: 'Two people means no account managers, no hand-offs, and no diluted work. You talk to the people building the thing.',
  },
  {
    title: 'Systems over heroics.',
    body: 'We automate what should repeat — SEO, creative, reporting — so results do not depend on someone remembering to do them.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A two-person studio that ships."
        intro="We design, build, and run our own AI products — shipped to real users, not demos. The same craft goes into everything we do for clients."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>The studio</Eyebrow>
            <div className="mt-6 flex flex-col gap-5 text-pretty leading-relaxed text-foreground/90">
              <p>
                Peyote Labs is two people based in {SITE.location}. We build software products
                and growth systems — and we run our own SaaS to keep ourselves honest about
                what actually ships.
              </p>
              <p>
                We do not carry a roster of fake enterprise logos or borrowed pedigree. What we
                have is working products, a clear way of working, and the willingness to tell
                you when something is not worth building.
              </p>
              <p>
                When we take on client work, you get the same two people who ship JobCommand and
                WellFitCV — not a junior team behind a polished deck.
              </p>
            </div>
          </div>

          <div>
            <Eyebrow>How we think</Eyebrow>
            <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
              {PRINCIPLES.map((p) => (
                <div key={p.title} className="bg-background p-7">
                  <h2 className="font-display text-lg font-medium">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start gap-5 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="max-w-lg font-display text-2xl font-medium text-balance">
            If that sounds like the kind of team you want, let&apos;s talk.
          </h2>
          <PrimaryCta href="/contact">Talk to the studio</PrimaryCta>
        </div>
      </section>
    </>
  )
}
