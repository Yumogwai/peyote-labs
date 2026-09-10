import type { Metadata } from 'next'
import { PageHeader, PrimaryCta, Eyebrow } from '@/components/primitives'
import { StudioPhoto } from '@/components/studio-photo'
import { SITE } from '@/lib/site-data'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata(
  '/about',
  'Two-person AI studio in Warsaw',
  'Peyote Labs is a two-person software studio in Warsaw led by Andrii Kuratov. We design, build, and run our own AI products — and apply the same craft to client work.',
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
        <figure>
          <div className="overflow-hidden rounded-sm border border-border">
            <StudioPhoto priority />
          </div>
          <figcaption className="mt-3 font-display text-sm italic text-muted-foreground">
            Warsaw. The two of us — Peyote Labs.
          </figcaption>
        </figure>

        <div className="mt-14 max-w-2xl lg:mt-20">
          <Eyebrow as="h2">What Peyote Labs is</Eyebrow>
          <div className="mt-6 flex flex-col gap-5 text-pretty leading-relaxed text-foreground/90">
            <p>
              Peyote Labs is a two-person software studio in {SITE.location}. We build
              practical AI products — JobCommand and WellFitCV are live SaaS with real users —
              and we help companies grow with websites, SEO, marketing audits, creatives, and
              ads. The same people who ship the products do the client work.
            </p>
            <p>
              The public face of the studio is{' '}
              <a
                href="https://www.linkedin.com/in/andriikuratov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-4 hover:underline"
              >
                Andrii Kuratov
              </a>
              — a PM who vibe-codes products and automations alongside the day job. The studio
              stays small on purpose: two people, no account layer, no diluted hand-offs.
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

        <div className="mt-16 lg:mt-24">
          <Eyebrow as="h2">How we think</Eyebrow>
          <div className="mt-6 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="bg-background p-7">
                <h3 className="font-display text-lg font-medium">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start gap-5 rounded-xl border border-border bg-surface/40 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 lg:mt-24">
          <div className="max-w-lg">
            <h2 className="font-display text-xl font-medium">
              If that sounds like the kind of team you want, let&apos;s talk.
            </h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Write to the studio inbox. Replies come from the people doing the work.
            </p>
          </div>
          <PrimaryCta href="/contact">Write to us</PrimaryCta>
        </div>
      </section>
    </>
  )
}
