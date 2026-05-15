/** 사이트 공통 상수 (AdSense, 문의, SEO) */
export const SITE_URL = 'https://gye-san.com'
export const SITE_NAME = '계산닷컴'
export const ADSENSE_PUBLISHER = 'ca-pub-5440243063519453'
export const CONTACT_EMAIL = 'support@gye-san.com'

/** AdSense 승인용 핵심 계산기 (콘텐츠·sitemap 우선) */
export const CORE_CALCULATOR_SLUGS = [
  'salary',
  'insurance',
  'severance',
  'hourly',
  'weekly-holiday',
  'annual-leave',
  'vat',
  'income-tax',
  'loan-interest',
  'compound'
]

/** 실제 계산이 동작하는 계산기 (placeholder 제외) */
export const WORKING_CALCULATOR_SLUGS = [
  'military',
  'pregnancy',
  'unemployment',
  'salary',
  'insurance',
  'vat',
  'acquisition-tax',
  'jeonse-loan',
  'capital-gains',
  'gift-tax',
  'calorie',
  'severance',
  'hourly',
  'commission',
  'compound',
  'bmr',
  'freelance',
  'gpa',
  'weekly-holiday',
  'annual-leave',
  'income-tax',
  'loan-interest'
]

/** UI만 있고 계산이 비활성인 계산기 — noindex·sitemap 제외 */
export const PLACEHOLDER_CALCULATOR_SLUGS = [
  'overtime',
  'night-pay',
  'inheritance',
  'jeonwolse',
  'dsr-dti',
  'year-end-tax',
  'rental-tax',
  'car-tax',
  'savings',
  'stock-return',
  'maternity',
  'parental-leave',
  'health-insurance',
  'pension',
  'employment-insurance',
  'minimum-wage',
  'alimony',
  'child-allowance',
  'newborn-subsidy',
  'mortgage',
  'credit-loan',
  'lease-deposit',
  'property-tax',
  'comprehensive-property',
  'local-income-tax',
  'stamp-tax',
  'age-calculator',
  'date-calculator'
]

export const POPULAR_CALCULATOR_SLUGS = ['salary', 'severance', 'insurance', 'hourly', 'vat']

export function isPlaceholderSlug(slug) {
  return PLACEHOLDER_CALCULATOR_SLUGS.includes(slug)
}
