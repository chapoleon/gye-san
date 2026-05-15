/** 대출 상환 추정 (전세대출·대출이자 계산기 공통) */
import { parseDigits } from '@/lib/money'

export function calcLoanRepayment({ principal, annualRatePct, years, repayType }) {
  const P = parseDigits(String(principal))
  const annual = parseFloat(String(annualRatePct).replace(/,/g, '').trim()) || 0
  const y = parseInt(String(years), 10) || 1
  const n = y * 12
  const r = annual / 100 / 12
  const monthIntBullet = P * r

  if (P <= 0) return { error: '대출금액을 입력해 주세요.' }
  if (annual < 0 || annual > 100) return { error: '금리를 올바르게 입력해 주세요.' }

  let monthlyPay = 0
  let totalInt = 0
  let totalRepay = 0

  if (repayType === 'bullet') {
    monthlyPay = monthIntBullet
    totalInt = monthIntBullet * n
    totalRepay = P + totalInt
  } else if (repayType === 'annuity') {
    if (r === 0) monthlyPay = P / n
    else {
      const pow = Math.pow(1 + r, n)
      monthlyPay = (P * r * pow) / (pow - 1)
    }
    totalRepay = monthlyPay * n
    totalInt = totalRepay - P
  } else {
    const mp = P / n
    let sumI = 0
    for (let k = 1; k <= n; k++) {
      const bal = P - mp * (k - 1)
      sumI += bal * r
    }
    totalInt = sumI
    totalRepay = P + totalInt
    monthlyPay = mp + P * r
  }

  const yearlyInt = y > 0 ? totalInt / y : 0
  const intRatio = P > 0 ? (totalInt / P) * 100 : 0

  return {
    monthlyPay,
    totalInt,
    totalRepay,
    yearlyInt,
    monthIntBullet,
    intRatio
  }
}
