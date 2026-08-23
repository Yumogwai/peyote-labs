import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check } from 'lucide-react'
import { MineralBackdrop } from '@/components/mineral-backdrop'
import { PrimaryCta, TextLink, Eyebrow } from '@/components/primitives'
import { SERVICES, getService } from '@/lib/site-data'
import { pageMetadata } from '@/lib/seo'

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  return pageMetadata(`/services/${slug}`, service.name, service.short)
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const idx = SERVICES.findIndex((s) => s.slug === slug)
  const next = SERVICES[(idx + 1) % SERVICES.length]

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <MineralBackdrop density="quiet" />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"
        />
        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All services
          </Link>
          <div className="mt-8 flex items-baseline gap-4">
            <span className="font-display text-lg text-accent">{service.index}</span>
            <h1 className="max-w-3xl font-display text-4xl font-medium leading-[1.12] text-balance sm:text-5xl">
              {service.name}
            </h1>
          </div>
          <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {service.short}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>The problem</Eyebrow>
            <p className="mt-5 text-pretty text-xl leading-relaxed text-foreground/90">
              {service.problem}
            </p>
            <p className="mt-8 rounded-lg border border-accent/25 bg-accent/5 p-5 text-sm leading-relaxed text-accent">
              {service.outcome}
            </p>
          </div>

          <div className="flex flex-col gap-14">
            <div>
              <Eyebrow>What we deliver</Eyebrow>
              <ul className="mt-6 flex flex-col gap-4">
                {service.deliver.map((d) => (
                  <li key={d} className="flex gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="leading-relaxed text-foreground/90">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Eyebrow>Process</Eyebrow>
              <ol className="mt-6 border-t border-border">
                {service.process.map((p, i) => (
                  <li
                    key={p}
                    className="flex gap-5 border-b border-border py-4"
                  >
                    <span className="font-display text-sm text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="leading-relaxed text-foreground/90">{p}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <Eyebrow>Outcomes</Eyebrow>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {service.outcomes.map((o) => (
                  <div
                    key={o}
                    className="rounded-lg border border-border bg-surface/40 p-5 text-sm leading-relaxed text-foreground/90"
                  >
                    {o}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start gap-5 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-medium">
              Want this for your business?
            </h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Tell us where you are and we&apos;ll tell you honestly if we can help.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <TextLink href={`/services/${next.slug}`}>Next: {next.name}</TextLink>
            <PrimaryCta href="/contact">Talk to the studio</PrimaryCta>
          </div>
        </div>
      </div>
    </>
  )
}
