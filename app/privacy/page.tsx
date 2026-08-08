import type { Metadata } from 'next'
import { PageHeader } from '@/components/primitives'
import { SITE } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How Peyote Labs handles the information you share with us.',
}

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy" />
      <article className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-col gap-8 leading-relaxed text-foreground/90">
          <Section title="What we collect">
            When you contact us, we collect the details you send — typically your name, company,
            email, and message. We do not sell or share this data.
          </Section>
          <Section title="How we use it">
            We use your information solely to respond to your enquiry and, where relevant, to
            carry out work you have asked us to do. Replies come from {SITE.email}.
          </Section>
          <Section title="Analytics">
            We use privacy-respecting analytics to understand aggregate site usage. This does
            not identify you individually.
          </Section>
          <Section title="Your rights">
            You can ask us what we hold about you, and request that we correct or delete it, by
            emailing {SITE.email}.
          </Section>
          <p className="text-sm text-muted-foreground">
            This is a minimal summary. For specific requirements, contact us and we will provide
            the detail you need.
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
