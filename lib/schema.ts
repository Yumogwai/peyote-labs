import { PRODUCTS, SERVICES, SITE } from '@/lib/site-data'
import { SITE_NAME, SITE_URL, absoluteUrl } from '@/lib/seo'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.location,
      addressCountry: 'PL',
    },
    sameAs: [SITE.linkedin],
    logo: `${SITE_URL}/icon`,
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en',
  }
}

export function professionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    url: SITE_URL,
    email: SITE.email,
    image: `${SITE_URL}/opengraph-image`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.location,
      addressCountry: 'PL',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    sameAs: [SITE.linkedin],
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Peyote Labs services',
      itemListElement: SERVICES.map((s, i) => ({
        '@type': 'OfferCatalog',
        name: s.name,
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: s.name,
              description: s.short,
              url: absoluteUrl(`/services/${s.slug}`),
            },
            position: i + 1,
          },
        ],
      })),
    },
  }
}

export function serviceSchema(service: (typeof SERVICES)[number]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.short,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: 'Worldwide',
    serviceType: service.name,
  }
}

export function softwareApplicationSchema(product: (typeof PRODUCTS)[number]) {
  return {
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
    creator: { '@id': `${SITE_URL}/#organization` },
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
