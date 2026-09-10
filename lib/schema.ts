import { PRODUCTS, SERVICES, SITE } from '@/lib/site-data'

export function organizationGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE.url}/#org`,
        name: SITE.name,
        url: SITE.url,
        email: SITE.email,
        logo: `${SITE.url}/icon`,
        image: `${SITE.url}/opengraph-image`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: SITE.location,
          addressCountry: 'PL',
        },
        sameAs: [SITE.linkedin, 'https://www.linkedin.com/in/andriikuratov'],
        founder: {
          '@type': 'Person',
          name: 'Andrii Kuratov',
          url: 'https://www.linkedin.com/in/andriikuratov',
          sameAs: ['https://x.com/AndriiKuratov', 'https://github.com/Yumogwai'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        publisher: { '@id': `${SITE.url}/#org` },
        inLanguage: 'en',
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE.url}/#studio`,
        name: SITE.name,
        url: SITE.url,
        email: SITE.email,
        image: `${SITE.url}/opengraph-image`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: SITE.location,
          addressCountry: 'PL',
        },
        areaServed: 'Worldwide',
        sameAs: [SITE.linkedin],
        parentOrganization: { '@id': `${SITE.url}/#org` },
      },
    ],
  }
}

export function serviceJsonLd(service: (typeof SERVICES)[number]) {
  const url = `${SITE.url}/services/${service.slug}`
  const data: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.name,
      description: service.short,
      url,
      provider: { '@id': `${SITE.url}/#org` },
      areaServed: 'Worldwide',
      serviceType: service.name,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: `${SITE.url}/services`,
        },
        { '@type': 'ListItem', position: 3, name: service.name, item: url },
      ],
    },
  ]

  if (service.faqs?.length) {
    data.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }

  return data
}

export function productJsonLd(product: (typeof PRODUCTS)[number]) {
  const url = `${SITE.url}/products/${product.slug}`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: product.name,
      description: product.tagline,
      url: product.url,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        url: product.url,
        availability: 'https://schema.org/InStock',
      },
      creator: { '@id': `${SITE.url}/#org` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Products',
          item: `${SITE.url}/products`,
        },
        { '@type': 'ListItem', position: 3, name: product.name, item: url },
      ],
    },
  ]
}
