import raw from '@/data/calculators.json'

export const calculators = raw.calculators

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
