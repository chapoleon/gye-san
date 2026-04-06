export function parseDigits(v) {
  return parseInt(String(v ?? '').replace(/[^\d]/g, ''), 10) || 0
}

export function fmtInt(n) {
  return Math.round(n).toLocaleString('ko-KR')
}

export function formatInputComma(setter) {
  return (e) => {
    const raw = String(e.target.value).replace(/[^\d]/g, '')
    setter(raw ? parseInt(raw, 10).toLocaleString('ko-KR') : '')
  }
}
