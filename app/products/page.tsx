import type { Metadata } from 'next'
import { PageHeader, PrimaryCta, TextLink } from '@/components/primitives'
import { PipelineMock, ResumeMock } from '@/components/product-mocks'
import { PRODUCTS } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Products',
  description:
    'JobCommand and WellFitCV — live SaaS built and maintained by Peyote Labs, used by real people.',
}

export default function ProductsPage() {
  const jobcommand = PRODUCTS[0]
  const wellfitcv = PRODUCTS[1]
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="We ship products we use and maintain."
        intro="Two live products with real users. The same engineering and design we bring to client work — applied to our own bets."
      />

      <section className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-16 sm:px-8 sm:py-24">
        <article className="grid gap-8 rounded-xl border border-border bg-surface/30 p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {jobcommand.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{jobcommand.domain}</p>
            <p className="mt-4 text-pretty leading-relaxed text-foreground/90">
              {jobcommand.tagline}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <PrimaryCta href={jobcommand.url} external>
                Open JobCommand
              </PrimaryCta>
              <TextLink href={`/products/${jobcommand.slug}`}>Details</TextLink>
            </div>
          </div>
          <PipelineMock />
        </article>

        <article className="grid gap-8 rounded-xl border border-border bg-surface/30 p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
          <div className="lg:order-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {wellfitcv.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{wellfitcv.domain}</p>
            <p className="mt-4 text-pretty leading-relaxed text-foreground/90">
              {wellfitcv.tagline}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-md border border-accent/30 bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent">
              {wellfitcv.differentiator}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <PrimaryCta href={wellfitcv.url} external>
                Open WellFitCV
              </PrimaryCta>
              <TextLink href={`/products/${wellfitcv.slug}`}>Details</TextLink>
            </div>
          </div>
          <div className="lg:order-1">
            <ResumeMock />
          </div>
        </article>
      </section>
    </>
  )
}
