/** 종합소득세 누진세율 추정 (참고용 단순 모델) */
export function progressiveIncomeTax(taxableBase) {
  const base = Math.max(0, taxableBase)
  if (base <= 0) return 0
  const lims = [14e6, 50e6, 88e6, 150e6, 300e6, 500e6, 1e9, Infinity]
  const rates = [0.06, 0.15, 0.24, 0.35, 0.38, 0.4, 0.42, 0.45]
  let left = base
  let prev = 0
  let t = 0
  for (let i = 0; i < lims.length && left > 0; i++) {
    const top = lims[i]
    const slice = Math.min(left, top - prev)
    t += slice * rates[i]
    left -= slice
    prev = top
  }
  return Math.round(t)
}
