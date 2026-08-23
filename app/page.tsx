import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Hero } from '@/components/home/hero'
import { MineralBackdrop } from '@/components/mineral-backdrop'
import { PrimaryCta, TextLink, SectionHeading, Eyebrow } from '@/components/primitives'
import { PipelineMock, ResumeMock } from '@/components/product-mocks'
import { SERVICES, PRODUCTS } from '@/lib/site-data'
import { pageMetadata } from '@/lib/seo'

export const metadata = {
  ...pageMetadata(
    '/',
    'Peyote Labs — a two-person studio in Warsaw',
    'Peyote Labs is two people in Warsaw. We run our own products — JobCommand and WellFitCV — and we do websites, SEO, creatives and ads for other companies.',
  ),
  title: {
    absolute: 'Peyote Labs — a two-person studio in Warsaw',
  },
}

export default function Home() {
  return (
    <>
      <Hero />
      <SplitSection />
      <ServicesList />
      <ProductPanels />
      <HowWeWork />
      <ContactStrip />
    </>
  )
}

function SplitSection() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2">
        <div className="border-b border-border p-8 sm:p-12 md:border-b-0 md:border-r">
          <Eyebrow>Services</Eyebrow>
          <h3 className="mt-4 font-display text-2xl font-medium">
            We build and grow digital systems for businesses.
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Websites, SEO, audits, creative, and paid — the same craft we put into our own
            products, applied to your growth.
          </p>
          <div className="mt-6">
            <TextLink href="/services">Explore services</TextLink>
          </div>
        </div>
        <div className="p-8 sm:p-12">
          <Eyebrow>Products</Eyebrow>
          <h3 className="mt-4 font-display text-2xl font-medium">
            We ship products we use and maintain.
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            JobCommand and WellFitCV are live SaaS with real users — not demos or side
            projects.
          </p>
          <div className="mt-6">
            <TextLink href="/products">See the products</TextLink>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesList() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="What we do"
          title="Five services, run like systems."
          intro="Not a menu of deliverables — repeatable systems that keep working after we ship them."
        />
        <div className="mt-12 border-t border-border">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-border py-6 transition-colors hover:bg-surface/40 sm:gap-8 sm:py-8"
            >
              <span className="font-display text-sm text-accent sm:text-base">{s.index}</span>
              <div className="min-w-0">
                <h3 className="font-display text-xl font-medium transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
                  {s.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                <p className="grid grid-rows-[0fr] overflow-hidden text-sm text-accent transition-all duration-300 group-hover:mt-2 group-hover:grid-rows-[1fr]">
                  <span className="min-h-0 overflow-hidden">{s.outcome}</span>
                </p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductPanels() {
  const jobcommand = PRODUCTS[0]
  const wellfitcv = PRODUCTS[1]
  return (
    <section className="border-b border-border bg-surface/30">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="Our products"
          title="Two live products, built in-house."
        />

        <div className="mt-12 flex flex-col gap-6">
          <article className="grid gap-8 rounded-xl border border-border bg-background p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="font-display text-2xl font-medium">
                {jobcommand.name}
              </h3>
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

          <article className="grid gap-8 rounded-xl border border-border bg-background p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
            <div className="lg:order-2">
              <h3 className="font-display text-2xl font-medium">
                {wellfitcv.name}
              </h3>
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
        </div>
      </div>
    </section>
  )
}

function HowWeWork() {
  const steps = [
    {
      index: '01',
      title: 'Diagnose the system',
      body: 'We map the funnel, the site, and the data before touching anything.',
    },
    {
      index: '02',
      title: 'Ship the smallest useful version',
      body: 'A real, working version early — then iterate on evidence, not opinions.',
    },
    {
      index: '03',
      title: 'Automate what should repeat',
      body: 'SEO, creative production, and reporting run on systems, not memory.',
    },
  ]
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading eyebrow="How we work" title="Diagnose, ship, automate." />
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.index} className="bg-background p-8">
              <span className="font-display text-3xl italic text-accent/70">
                {step.index}
              </span>
              <h3 className="mt-5 font-display text-lg font-medium">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactStrip() {
  return (
    <section className="relative overflow-hidden">
      <MineralBackdrop density="quiet" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-20 sm:px-8 sm:py-24 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl font-medium text-balance sm:text-3xl">
            Writing as Peyote Labs — not as a freelancer.
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Suitable for outbound, partnerships, and client work. Tell us what you need and
            we&apos;ll reply from the studio inbox.
          </p>
        </div>
        <PrimaryCta href="/contact">Start a conversation</PrimaryCta>
      </div>
    </section>
  )
}
