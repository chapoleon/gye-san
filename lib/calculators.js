import raw from '@/data/calculators.json'

const featuredSet = new Set(['salary', 'severance', 'insurance'])

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
  if (category === '부동산') return { product: 'ondasoop', message: '새 집에 어울리는 자연 향기, 온다숲' }
  if (category === '출산육아') return { product: 'ondasoop', message: '아이에게 안전한 천연 방향제, 온다숲' }
  if (category === '생활') return { product: 'ondasoop', message: '건강한 생활의 시작, 자연 그대로의 향기' }
  return { product: 'ondasoop', message: '열심히 일한 당신, 집에서 편안한 향기로 힐링하세요' }
}

export const calculators = raw.calculators.map((c) => ({
  ...c,
  featured: typeof c.featured === 'boolean' ? c.featured : featuredSet.has(c.slug),
  category: c.category ?? deriveCategory(c),
  icon: c.icon ?? c.emoji,
  banner: c.banner ?? deriveBanner(c)
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

export function metaDescription(description) {
  const t = String(description).replace(/\s+/g, ' ').trim()
  const head = t.length <= 150 ? t : t.slice(0, 150).trim()
  return `${head} 무료 자동계산.`
}

export function pageTitle(name) {
  return `${name} 2026 ✅ 자동계산 (최신반영) | 계산닷컴`
}
