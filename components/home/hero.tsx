import { PrimaryCta, TextLink } from '@/components/primitives'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* atmosphere */}
      <div aria-hidden className="lattice absolute inset-0 opacity-60" />

      {/*
        Motion on the OUTER wrapper only. Blur stays on the INNER child —
        animating transform on a blurred element often looks frozen in Chromium.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="aurora-travel aurora-travel-a absolute -left-[15%] -top-[25%] h-[70vmin] w-[70vmin]">
          <div
            className="size-full rounded-full opacity-70 blur-[100px]"
            style={{
              background:
                'radial-gradient(circle, rgba(47,230,200,0.75) 0%, rgba(26,184,158,0.3) 45%, transparent 70%)',
            }}
          />
        </div>
        <div className="aurora-travel aurora-travel-b absolute -right-[20%] top-[5%] h-[60vmin] w-[60vmin]">
          <div
            className="size-full rounded-full opacity-60 blur-[110px]"
            style={{
              background:
                'radial-gradient(circle, rgba(26,184,158,0.65) 0%, rgba(47,230,200,0.22) 48%, transparent 72%)',
            }}
          />
        </div>
        <div className="aurora-travel aurora-travel-c absolute -bottom-[30%] left-[5%] h-[55vmin] w-[55vmin]">
          <div
            className="size-full rounded-full opacity-45 blur-[110px]"
            style={{
              background:
                'radial-gradient(circle, rgba(47,230,200,0.5) 0%, rgba(26,184,158,0.15) 50%, transparent 72%)',
            }}
          />
        </div>
      </div>

      {/* soft fade into the next block — no hard border */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-background"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-24 sm:px-8 sm:pb-32 sm:pt-32">
        <div className="flex flex-col items-start">
          <h1
            className="animate-rise max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl"
            style={{ animationDelay: '0ms' }}
          >
            Practical AI products.
            <br />
            <span className="text-accent">Growth systems</span> that ship.
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
