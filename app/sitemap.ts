import type { MetadataRoute } from 'next'
import { PRODUCTS, SERVICES, SITE } from '@/lib/site-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const paths: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] =
    [
      { path: '', priority: 1, changeFrequency: 'weekly' },
      { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
      { path: '/products', priority: 0.9, changeFrequency: 'monthly' },
      { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
      { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
      ...SERVICES.map((s) => ({
        path: `/services/${s.slug}`,
        priority: 0.7,
        changeFrequency: 'monthly' as const,
      })),
      ...PRODUCTS.map((p) => ({
        path: `/products/${p.slug}`,
        priority: 0.7,
        changeFrequency: 'monthly' as const,
      })),
    ]

  return paths.map(({ path, priority, changeFrequency }) => ({
    url: path ? `${SITE.url}${path}` : SITE.url,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
