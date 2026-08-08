import Link from 'next/link'
import { LogoMark } from '@/components/logo'
import { SERVICES, PRODUCTS, SITE } from '@/lib/site-data'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <LogoMark className="h-9 w-9" />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A two-person software studio in {SITE.location}. We ship practical AI products —
            built honestly, used by real people.
          </p>
        </div>

        <FooterCol title="Services">
          {SERVICES.map((s) => (
            <FooterLink key={s.slug} href={`/services/${s.slug}`}>
              {s.name}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Products">
          {PRODUCTS.map((p) => (
            <FooterLink key={p.slug} href={`/products/${p.slug}`}>
              {p.name}
            </FooterLink>
          ))}
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterCol>

        <FooterCol title="Studio">
          <FooterLink href={SITE.linkedin} external>
            LinkedIn
          </FooterLink>
          <a
            href={`mailto:${SITE.email}`}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {SITE.email}
          </a>
          <FooterLink href="/privacy">Privacy</FooterLink>
          <FooterLink href="/terms">Terms</FooterLink>
        </FooterCol>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© {new Date().getFullYear()} Peyote Labs. All rights reserved.</span>
          <span className="font-display tracking-[0.2em]">PEYOTE LABS · WARSAW</span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/80">
        {title}
      </h3>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  )
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {children}
      </a>
    )
  }
  return (
    <Link
      href={href}
      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  )
}
