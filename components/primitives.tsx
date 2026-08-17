import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MineralBackdrop } from '@/components/mineral-backdrop'

export function PrimaryCta({
  href,
  children,
  external,
  className,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
  className?: string
}) {
  const cls = cn(
    'group inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-2',
    className,
  )
  const inner = (
    <>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </>
  )
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  )
}

export function TextLink({
  href,
  children,
  external,
  className,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
  className?: string
}) {
  const cls = cn(
    'group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground',
    className,
  )
  const inner = (
    <>
      <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-accent">
        {children}
      </span>
      <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
    </>
  )
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  )
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-display text-[0.95rem] italic text-accent">{children}</span>
  )
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: string
  intro?: string
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <MineralBackdrop density="quiet" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.12] text-balance sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {intro}
          </p>
        )}
      </div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  className,
}: {
  eyebrow?: string
  title: string
  intro?: string
  className?: string
}) {
  return (
    <div className={cn('max-w-2xl', className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 font-display text-3xl font-medium leading-[1.15] text-balance sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{intro}</p>}
    </div>
  )
}
