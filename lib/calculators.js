import raw from '@/data/calculators.json'
import { CORE_CALCULATOR_SLUGS, isPlaceholderSlug } from '@/lib/site'

const featuredSet = new Set(CORE_CALCULATOR_SLUGS.slice(0, 3))

const categoryBySlug = {
  salary: '급여',
  severance: '급여',
  insurance: '급여',
  unemployment: '급여',
  hourly: '급여',
  'weekly-holiday': '급여',
  overtime: '급여',
  'night-pay': '급여',
  freelance: '급여',
  'year-end-tax': '급여',
  'minimum-wage': '급여',
  'annual-leave': '급여',
  maternity: '출산육아',
  'parental-leave': '출산육아',
  'child-allowance': '출산육아',
  'newborn-subsidy': '출산육아',
  alimony: '출산육아',
  vat: '세금',
  'acquisition-tax': '세금',
  'capital-gains': '세금',
  'gift-tax': '세금',
  'income-tax': '세금',
  inheritance: '세금',
  'rental-tax': '세금',
  'car-tax': '세금',
  'property-tax': '세금',
  'comprehensive-property': '세금',
  'local-income-tax': '세금',
  'stamp-tax': '세금',
  'jeonse-loan': '부동산',
  commission: '부동산',
  jeonwolse: '부동산',
  'lease-deposit': '부동산',
  compound: '금융',
  savings: '금융',
  'stock-return': '금융',
  'loan-interest': '금융',
  mortgage: '금융',
  'credit-loan': '금융',
  'dsr-dti': '금융',
  'health-insurance': '보험',
  pension: '보험',
  'employment-insurance': '보험'
}

function deriveCategory(calc) {
  return categoryBySlug[calc.slug] ?? '생활'
}

function deriveBanner(calc) {
  const category = deriveCategory(calc)
  if (calc.slug === 'date-calculator' || calc.slug === 'military') {
    return { product: 'bugx', message: '쾌적한 일상을 위한 해충 관리, 버그엑스' }
  }
  if (category === '부동산') return { product: 'ondasoop', message: '새 집 냄새 제거, 천연 고체 탈취제 온다숲' }
  if (category === '출산육아') return { product: 'ondasoop', message: '아이에게 안전한 천연 고체 탈취제, 온다숲' }
  if (category === '생활') return { product: 'ondasoop', message: '건강한 공간의 시작, 화학성분 없는 고체 탈취제' }
  return { product: 'ondasoop', message: '열심히 일한 당신, 천연 고체 탈취제로 집안을 상쾌하게' }
}

function shortDescription(description) {
  const t = String(description ?? '')
    .replace(/\s+/g, ' ')
    .trim()
  if (!t) return ''
  // 너무 긴 설명은 카드용으로 약 50% 축약(대략 55자 기준)
  const max = 55
  if (t.length <= max) return t
  return `${t.slice(0, max).trim()}…`
}

function shortName(name) {
  const t = String(name ?? '').trim()
  if (!t) return ''
  return t.replace(/\s*계산기\s*$/, '')
}

export const calculators = raw.calculators.map((c) => ({
  ...c,
  featured: typeof c.featured === 'boolean' ? c.featured : featuredSet.has(c.slug),
  category: c.category ?? deriveCategory(c),
  icon: c.icon ?? c.emoji,
  banner: c.banner ?? deriveBanner(c),
  short_description: c.short_description ?? shortDescription(c.description),
  short_name: c.short_name ?? shortName(c.name)
}))

export function getCalculatorBySlug(slug) {
  return calculators.find((c) => c.slug === slug) ?? null
}

export function getAllSlugs() {
  return calculators.map((c) => c.slug)
}

/** 같은 pillar만, 자기 제외 최대 n개 */
export function getRelatedCalculators(slug, pillar, n = 3) {
  return calculators.filter((c) => c.pillar === pillar && c.slug !== slug).slice(0, n)
}

const TITLE_SUFFIX = ' - 계산닷컴'

const titleBySlug = {
  salary: '실수령액 계산기 | 연봉·월급 세후 금액 계산',
  insurance: '4대보험 계산기 | 국민연금·건강·고용보험료 추정',
  severance: '퇴직금 계산기 | 평균임금 기준 예상 퇴직금 계산',
  hourly: '시급 계산기 | 일급·주급·월급·연봉 환산',
  'weekly-holiday': '주휴수당 계산기 | 유급 주휴일 수당 추정',
  'annual-leave': '연차수당 계산기 | 미사용 연차 정산액 추정',
  vat: '부가세 계산기 | 공급가액·세액·합계금액 계산',
  'income-tax': '종합소득세 계산기 | 과세표준·예상 세액 추정',
  'loan-interest': '대출이자 계산기 | 월 상환액·총 이자 추정',
  compound: '복리 계산기 | 단리·복리 수익 비교'
}

export function metaDescription(description, slug) {
  const t = String(description).replace(/\s+/g, ' ').trim()
  const head = t.length <= 155 ? t : `${t.slice(0, 152).trim()}…`
  const tail = ' 계산 결과는 참고용이며 실제 금액과 차이가 있을 수 있습니다.'
  if (slug && titleBySlug[slug]) return `${head}${tail}`
  return `${head}${tail}`
}

export function pageTitle(name, slug) {
  if (slug && titleBySlug[slug]) return `${titleBySlug[slug]}${TITLE_SUFFIX}`
  const short = String(name || '').replace(/\s*계산기\s*$/, '').trim()
  return `${short} 계산기${TITLE_SUFFIX}`
}

export function shouldNoindexCalculator(slug) {
  return isPlaceholderSlug(slug)
}
