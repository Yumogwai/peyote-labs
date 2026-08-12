import { PageHeader } from '@/components/primitives'
import { SITE } from '@/lib/site-data'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  path: '/terms',
  title: 'Terms',
  description: 'The terms that apply to this website and to working with Peyote Labs.',
})

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms" />
      <article className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-col gap-8 leading-relaxed text-foreground/90">
          <Section title="This website">
            The content on this site is provided for information about Peyote Labs and its
            products and services. We keep it accurate, but it does not constitute a contract.
          </Section>
          <Section title="Our products">
            JobCommand and WellFitCV are governed by their own terms, available on each product.
            Nothing here overrides those.
          </Section>
          <Section title="Engagements">
            Client work is governed by a separate agreement scoped to the specific project.
            Deliverables, timelines, and payment are defined there, not on this page.
          </Section>
          <Section title="Contact">
            Questions about these terms can be sent to {SITE.email}.
          </Section>
          <p className="text-sm text-muted-foreground">
            This is a minimal summary intended as a starting point. A full agreement is provided
            before any engagement begins.
          </p>
        </div>
      </article>
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <p className="mt-2 text-muted-foreground">{children}</p>
    </section>
  )
}
