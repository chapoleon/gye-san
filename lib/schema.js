import { SITE_URL, SITE_NAME } from '@/lib/site'

const SITE = SITE_URL

export function websiteSchemaJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE,
    inLanguage: 'ko-KR',
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE }
  }
}

export function organizationSchemaJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '계산닷컴',
    url: SITE,
    sameAs: [
      'https://github.com/chapoleon',
      'https://blog.naver.com/gyesan_com',
      'https://www.wikidata.org/wiki/Q138931556'
    ],
    knowsAbout: ['퇴직금', '4대보험', '실수령액', '세금계산', '급여계산']
  }
}

export function webApplicationJsonLd({ name, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: `${SITE}${path}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' }
  }
}

export function faqPageJsonLd(faq) {
  if (!faq?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a }
    }))
  }
}

export function breadcrumbJsonLd({ name, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name, item: `${SITE}${path}` }
    ]
  }
}
