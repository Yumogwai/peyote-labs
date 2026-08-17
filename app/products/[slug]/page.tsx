import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { MineralBackdrop } from '@/components/mineral-backdrop'
import { PrimaryCta, TextLink, Eyebrow } from '@/components/primitives'
import { PipelineMock, ResumeMock } from '@/components/product-mocks'
import { PRODUCTS, getProduct } from '@/lib/site-data'

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.tagline,
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  const Mock = slug === 'jobcommand' ? PipelineMock : ResumeMock

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
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All products
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow>Live product</Eyebrow>
              <h1 className="mt-4 font-display text-4xl font-medium leading-[1.12] sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">{product.domain}</p>
              <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-foreground/90">
                {product.tagline}
              </p>
              {product.differentiator && (
                <p className="mt-5 inline-flex items-center gap-2 rounded-md border border-accent/30 bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent">
                  {product.differentiator}
                </p>
              )}
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <PrimaryCta href={product.url} external>
                  Open {product.name}
                </PrimaryCta>
                <TextLink href="/contact">Work with Peyote Labs</TextLink>
              </div>
            </div>
            <Mock />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <Eyebrow>Inside {product.name}</Eyebrow>
        <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          {product.features.map((f) => (
            <div key={f.title} className="bg-background p-8">
              <h2 className="font-display text-lg font-medium">{f.title}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start gap-5 rounded-xl border border-border bg-surface/40 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="max-w-lg">
            <h2 className="font-display text-xl font-medium">
              Want something like this built?
            </h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              We build custom products and B2B tools with the same approach. Tell us what you
              have in mind.
            </p>
          </div>
          <PrimaryCta href="/contact">Work with Peyote Labs</PrimaryCta>
        </div>
      </section>
    </>
  )
}
