'use client'

import { useState } from 'react'
import { fmtInt, formatInputComma, parseDigits } from '@/lib/money'
import { calcLoanRepayment } from '@/lib/loanCalc'
import { progressiveIncomeTax } from '@/lib/taxCalc'

export function WeeklyHolidayWidget() {
  const [weekHrs, setWeekHrs] = useState('20')
  const [hourly, setHourly] = useState('10,320')
  const [show, setShow] = useState(false)
  const [o, setO] = useState({})
  const onH = formatInputComma(setHourly)

  const calc = () => {
    const h = parseDigits(hourly)
    const wh = parseFloat(String(weekHrs).replace(/,/g, '')) || 0
    if (!h || wh <= 0) return
    const eligible = wh >= 15
    const ju = eligible ? (wh / 40) * 8 * h : 0
    setShow(true)
    setO({
      r1: eligible ? fmtInt(ju) : '미해당',
      r2: fmtInt(h * wh + ju),
      r3: eligible ? '15시간 이상' : '15시간 미만'
    })
  }

  return (
    <main className="card ani d2">
      <div className="fg">
        <div>
          <label htmlFor="wh-week-hrs">1주 소정근로시간 (시간)</label>
          <input id="wh-week-hrs" value={weekHrs} onChange={(e) => setWeekHrs(e.target.value)} inputMode="decimal" />
        </div>
        <div>
          <label htmlFor="wh-hourly">시급·통상시급 (원)</label>
          <input id="wh-hourly" value={hourly} onChange={onH} inputMode="numeric" />
        </div>
        <p className="hint">주 15시간 이상 소정근로 시 주휴수당을 단순 추정합니다.</p>
        <button type="button" className="btn" onClick={calc}>
          📅 주휴수당 계산
        </button>
      </div>
      {show && (
        <div className="sg" style={{ marginTop: 18 }}>
          <div className="si">
            <div className="sv ac">{o.r1}</div>
            <div className="sl">주휴수당 (주)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r2}</div>
            <div className="sl">주급+주휴 합계</div>
          </div>
          <div className="si">
            <div className="sv">{o.r3}</div>
            <div className="sl">주휴 발생 여부</div>
          </div>
        </div>
      )}
    </main>
  )
}

export function IncomeTaxWidget() {
  const [income, setIncome] = useState('4500')
  const [deduction, setDeduction] = useState('800')
  const [show, setShow] = useState(false)
  const [o, setO] = useState({})

  const calc = () => {
    const inc = parseFloat(String(income).replace(/,/g, '')) || 0
    const ded = parseFloat(String(deduction).replace(/,/g, '')) || 0
    const baseWon = Math.max(0, (inc - ded) * 10000)
    const national = progressiveIncomeTax(baseWon)
    const local = Math.round(national * 0.1)
    setShow(true)
    setO({ r1: fmtInt(baseWon), r2: fmtInt(national), r3: fmtInt(local), r4: fmtInt(national + local) })
  }

  return (
    <main className="card ani d2">
      <div className="fg">
        <div>
          <label htmlFor="it-income">종합소득금액 (만원)</label>
          <input id="it-income" value={income} onChange={(e) => setIncome(e.target.value.replace(/[^\d.]/g, ''))} />
        </div>
        <div>
          <label htmlFor="it-ded">공제 합산 (만원)</label>
          <input id="it-ded" value={deduction} onChange={(e) => setDeduction(e.target.value.replace(/[^\d.]/g, ''))} />
        </div>
        <p className="hint">분리과세·세액공제 한도는 단순화되었습니다. 확정신고 전 전문가 확인을 권장합니다.</p>
        <button type="button" className="btn" onClick={calc}>
          🧾 종합소득세 추정
        </button>
      </div>
      {show && (
        <div className="sg" style={{ marginTop: 18 }}>
          <div className="si">
            <div className="sv">{o.r1}</div>
            <div className="sl">과세표준 (원)</div>
          </div>
          <div className="si">
            <div className="sv ac">{o.r2}</div>
            <div className="sl">종합소득세 (원)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r3}</div>
            <div className="sl">지방소득세 (원)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r4}</div>
            <div className="sl">합계 (원)</div>
          </div>
        </div>
      )}
    </main>
  )
}

export function LoanInterestWidget() {
  const [loan, setLoan] = useState('')
  const [rate, setRate] = useState('4.5')
  const [months, setMonths] = useState('240')
  const [repay, setRepay] = useState('annuity')
  const [show, setShow] = useState(false)
  const [o, setO] = useState({})
  const onLoan = formatInputComma(setLoan)

  const calc = () => {
    const years = Math.max(1, Math.ceil((parseInt(months, 10) || 12) / 12))
    const res = calcLoanRepayment({
      principal: loan,
      annualRatePct: rate,
      years: String(years),
      repayType: repay
    })
    if (res.error) {
      alert(res.error)
      return
    }
    setShow(true)
    setO({
      r1: fmtInt(res.monthlyPay),
      r2: fmtInt(res.totalInt),
      r3: fmtInt(res.totalRepay)
    })
  }

  return (
    <main className="card ani d2">
      <div className="fg">
        <div>
          <label htmlFor="li-principal">대출 원금 (원)</label>
          <input id="li-principal" value={loan} onChange={onLoan} inputMode="numeric" placeholder="100,000,000" />
        </div>
        <div className="fg fg2">
          <div>
            <label htmlFor="li-rate">연이율 (%)</label>
            <input id="li-rate" value={rate} onChange={(e) => setRate(e.target.value.replace(/[^\d.]/g, ''))} />
          </div>
          <div>
            <label htmlFor="li-months">대출 기간 (개월)</label>
            <input id="li-months" value={months} onChange={(e) => setMonths(e.target.value.replace(/\D/g, ''))} />
          </div>
        </div>
        <div>
          <label htmlFor="li-repay">상환 방식</label>
          <select id="li-repay" value={repay} onChange={(e) => setRepay(e.target.value)}>
            <option value="annuity">원리금균등</option>
            <option value="principal">원금균등</option>
            <option value="bullet">만기일시</option>
          </select>
        </div>
        <button type="button" className="btn" onClick={calc}>
          🏦 대출이자 계산
        </button>
      </div>
      {show && (
        <div className="sg" style={{ marginTop: 18 }}>
          <div className="si">
            <div className="sv ac">{o.r1}</div>
            <div className="sl">월 상환액 (원)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r2}</div>
            <div className="sl">총 이자 (원)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r3}</div>
            <div className="sl">총 상환액 (원)</div>
          </div>
        </div>
      )}
    </main>
  )
}

export function AnnualLeaveWidget() {
  const [days, setDays] = useState('5')
  const [daily, setDaily] = useState('')
  const [monthly, setMonthly] = useState('3000000')
  const [show, setShow] = useState(false)
  const [o, setO] = useState({})
  const onDaily = formatInputComma(setDaily)
  const onMonthly = formatInputComma(setMonthly)

  const calc = () => {
    const d = parseFloat(String(days).replace(/,/g, '')) || 0
    let dayPay = parseDigits(daily)
    if (!dayPay && monthly) {
      dayPay = Math.round(parseDigits(monthly) / 209)
    }
    if (!d || !dayPay) return
    const total = Math.round(d * dayPay)
    setShow(true)
    setO({ r1: fmtInt(dayPay), r2: fmtInt(total), r3: `${d}일` })
  }

  return (
    <main className="card ani d2">
      <div className="fg">
        <div>
          <label htmlFor="al-days">미사용 연차 (일)</label>
          <input id="al-days" value={days} onChange={(e) => setDays(e.target.value.replace(/[^\d.]/g, ''))} />
        </div>
        <div>
          <label htmlFor="al-monthly">월 통상임금 (원, 선택)</label>
          <input id="al-monthly" value={monthly} onChange={onMonthly} inputMode="numeric" />
        </div>
        <div>
          <label htmlFor="al-daily">1일 통상임금 (원, 선택)</label>
          <input id="al-daily" value={daily} onChange={onDaily} inputMode="numeric" placeholder="비우면 월급÷209" />
        </div>
        <button type="button" className="btn" onClick={calc}>
          🏖️ 연차수당 계산
        </button>
      </div>
      {show && (
        <div className="sg" style={{ marginTop: 18 }}>
          <div className="si">
            <div className="sv">{o.r1}</div>
            <div className="sl">1일 통상임금</div>
          </div>
          <div className="si">
            <div className="sv ac">{o.r2}</div>
            <div className="sl">연차수당 합계</div>
          </div>
          <div className="si">
            <div className="sv">{o.r3}</div>
            <div className="sl">미사용 연차</div>
          </div>
        </div>
      )}
    </main>
  )
}
