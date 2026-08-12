import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHeader, PrimaryCta } from '@/components/primitives'
import { SERVICES } from '@/lib/site-data'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  path: '/services',
  title: 'Services',
  description:
    'Websites, SEO and SEO automation, marketing audits, creative generation, and advertising — run as systems, not one-off deliverables.',
})

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="We build and grow digital systems for businesses."
        intro="Five services, run with the same craft we put into our own products. Pick one, or let us diagnose where the leverage is."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="border-t border-border">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group grid grid-cols-[auto_1fr_auto] items-start gap-4 border-b border-border py-8 transition-colors hover:bg-surface/40 sm:gap-8 sm:py-10"
            >
              <span className="font-display text-sm text-accent sm:text-lg">{s.index}</span>
              <div className="min-w-0">
                <h2 className="font-display text-xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
                  {s.name}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {s.short}
                </p>
                <p className="mt-2 text-sm text-accent">{s.outcome}</p>
              </div>
              <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start gap-5 rounded-xl border border-border bg-surface/40 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="max-w-lg">
            <h3 className="font-display text-xl font-semibold tracking-tight">
              Not sure where to start?
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              A marketing audit is usually the honest first step — it tells us what to cut,
              fix, and double down on.
            </p>
          </div>
          <PrimaryCta href="/contact">Talk to the studio</PrimaryCta>
        </div>
      </section>
    </>
  )
}
