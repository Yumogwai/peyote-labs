import { organizationGraph } from '@/lib/schema'

type JsonLdProps = {
  data?: Record<string, unknown> | Record<string, unknown>[]
}

export function JsonLd({ data }: JsonLdProps) {
  const payload = data ?? organizationGraph()
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  )
}
