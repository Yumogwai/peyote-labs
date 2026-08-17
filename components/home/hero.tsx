import { PrimaryCta, TextLink } from '@/components/primitives'
import { MineralBackdrop } from '@/components/mineral-backdrop'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <MineralBackdrop density="hero" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-background"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-24 sm:px-8 sm:pb-32 sm:pt-32">
        <div className="flex flex-col items-start">
          <h1
            className="animate-rise max-w-3xl font-display text-4xl font-medium leading-[1.12] text-balance sm:text-6xl"
            style={{ animationDelay: '0ms' }}
          >
            Practical AI products.
            <br />
            <span className="italic">Growth systems</span> that ship.
          </h1>

          <p
            className="animate-rise mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground sm:text-lg"
            style={{ animationDelay: '180ms' }}
          >
            Peyote Labs is a two-person studio. We build our own SaaS — and we help companies
            grow with websites, SEO, creatives, and ads.
          </p>

          <div
            className="animate-rise mt-9 flex flex-wrap items-center gap-6"
            style={{ animationDelay: '270ms' }}
          >
            <PrimaryCta href="/contact">Talk to the studio</PrimaryCta>
            <TextLink href="/products">See our products</TextLink>
          </div>
        </div>
      </div>
    </section>
  )
}
