import { PrimaryCta, TextLink } from '@/components/primitives'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* atmosphere */}
      <div aria-hidden className="lattice absolute inset-0 opacity-60" />

      {/* drifting gradient blobs — outer = position, inner = motion (no transform clash) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute left-[40%] top-[-16%] h-[620px] w-[620px] -translate-x-1/2">
          <div
            className="aurora-blob aurora-a size-full rounded-full opacity-[0.63] blur-[110px]"
            style={{
              background:
                'radial-gradient(circle, rgba(47,230,200,0.65) 0%, rgba(26,184,158,0.28) 42%, transparent 70%)',
            }}
          />
        </div>
        <div className="absolute right-[-10%] top-[10%] h-[520px] w-[520px]">
          <div
            className="aurora-blob aurora-b size-full rounded-full opacity-[0.53] blur-[120px]"
            style={{
              background:
                'radial-gradient(circle, rgba(26,184,158,0.55) 0%, rgba(47,230,200,0.18) 48%, transparent 72%)',
            }}
          />
        </div>
        <div className="absolute bottom-[-18%] left-[8%] h-[420px] w-[420px]">
          <div
            className="aurora-blob aurora-c size-full rounded-full opacity-[0.42] blur-[120px]"
            style={{
              background:
                'radial-gradient(circle, rgba(47,230,200,0.40) 0%, rgba(26,184,158,0.12) 50%, transparent 72%)',
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
