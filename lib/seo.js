const SITE_URL = 'https://myhairloss.com'
const SITE_NAME = 'Brian Ivie Hair & Extensions'
const SITE_DESCRIPTION = 'Expert hair loss education, treatment guides, and research-backed information by Brian Ivie Hair & Extensions — St. Louis\'s trusted hair restoration specialist.'
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/about-brian.jpg`

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': SITE_URL,
    name: 'Brian Ivie Hair & Extensions',
    alternateName: 'MYHAIRLOSS.COM',
    description: 'Premier hair restoration specialist in St. Louis offering custom hair systems, laser therapy, extensions, and transplant consultations.',
    url: SITE_URL,
    telephone: '+1-314-583-4843',
    email: 'info@myhairloss.com',
    image: DEFAULT_OG_IMAGE,
    logo: `${SITE_URL}/images/logo.png`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Greater St. Louis Area',
      addressRegion: 'MO',
      addressCountry: 'US',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    sameAs: [],
    founder: {
      '@type': 'Person',
      name: 'Brian Ivie',
      url: `${SITE_URL}/about`,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'St. Louis',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'St. Charles',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'Greater St. Louis Area',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'Chesterfield',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'Bridgeton',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'Maryland Heights',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'Florissant',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'Creve Coeur',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'Olivette',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'Overland',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'Ballwin',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'Affton',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'Sappington',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'Sunset Hills',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'Town and Country',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'Des Peres',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'Black Jack',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'Ferguson',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: ' Jennings',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'North County',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'West County',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'Mid-County',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'Clayton',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'Kirkwood',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'St. Peters',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'O\'Fallon',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'Lake Saint Louis',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
      {
        '@type': 'City',
        name: 'Wildwood',
        containedInPlace: { '@type': 'State', name: 'Missouri' },
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Hair Restoration Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Hair System Fitting',
            description: 'Professional fitting, color matching, and styling for custom hair systems.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Laser Hair Therapy',
            description: 'Clinical-grade low-level laser therapy to stimulate hair growth and revitalize follicles.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Hair Extensions',
            description: 'Premium hair extensions expertly applied for natural volume and length.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Hair Transplant Consultations',
            description: 'Professional coordination with top St. Louis surgeons for hair transplant procedures.',
          },
        },
      ],
    },
  }
}

export function generateArticleSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: post.title,
    description: post.description,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
    author: {
      '@type': 'Person',
      name: 'Brian Ivie',
      url: `${SITE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      '@type': 'Article',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.dateModified || post.date,
      author: {
        '@type': 'Person',
        name: 'Brian Ivie',
      },
    },
    medicalAudience: {
      '@type': 'PatientAudience',
    },
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Brian Ivie Hair & Extensions',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-314-583-4843',
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
  }
}

export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateServiceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Brian Ivie Hair & Extensions',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'City',
      name: 'St. Louis',
    },
    serviceType: service.type || 'Hair Restoration',
  }
}

export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export { SITE_URL, SITE_NAME, SITE_DESCRIPTION, DEFAULT_OG_IMAGE }
