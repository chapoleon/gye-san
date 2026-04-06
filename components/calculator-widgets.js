'use client'

import { useCallback, useState } from 'react'
import { FOODS } from '@/lib/calorieFoods'
import { fmtInt, formatInputComma, parseDigits } from '@/lib/money'

const MS = 86400000
const TOTAL_PREG = 280

/* ——— military ——— */
export function MilitaryWidget() {
  const [enlist, setEnlist] = useState('')
  const [branch, setBranch] = useState('18')
  const [show, setShow] = useState(false)
  const [r, setR] = useState({ d: '-', rem: '0', pct: '0%', served: '0' })
  const [pw, setPw] = useState('0%')

  const calc = useCallback(() => {
    const d = new Date(enlist)
    if (Number.isNaN(d.getTime())) return
    const months = branch === 'marine' ? 18 : parseInt(branch, 10)
    const discharge = new Date(d)
    discharge.setMonth(discharge.getMonth() + months)
    discharge.setDate(discharge.getDate() - 1)
    const now = new Date()
    const total = Math.round((discharge - d) / MS)
    const served = Math.round((now - d) / MS)
    const remain = Math.max(0, Math.round((discharge - now) / MS))
    const pct = Math.min(100, Math.max(0, (served / total) * 100)).toFixed(1)
    setShow(true)
    setR({
      d: discharge.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }),
      rem: `${remain}일`,
      pct: `${pct}%`,
      served: `${Math.max(0, served)}일`
    })
    setPw(`${pct}%`)
  }, [enlist, branch])

  return (
    <main className="card ani d2">
      <div className="fg">
        <div className="fg fg2">
          <div>
            <label>입대일</label>
            <input type="date" value={enlist} onChange={(e) => setEnlist(e.target.value)} />
          </div>
          <div>
            <label>군종</label>
            <select value={branch} onChange={(e) => setBranch(e.target.value)}>
              <option value="18">육군 (18개월)</option>
              <option value="20">해군 (20개월)</option>
              <option value="21">공군 (21개월)</option>
              <option value="marine">해병대 (18개월)</option>
            </select>
          </div>
        </div>
        <button type="button" className="btn" onClick={calc}>
          🎖️ 전역일 계산
        </button>
      </div>
      {show && (
        <>
          <div className="sg" style={{ marginTop: 18 }}>
            <div className="si">
              <div className="sv ac">{r.d}</div>
              <div className="sl">전역일</div>
            </div>
            <div className="si">
              <div className="sv">{r.rem}</div>
              <div className="sl">남은 일수</div>
            </div>
            <div className="si">
              <div className="sv">{r.pct}</div>
              <div className="sl">복무 진행률</div>
            </div>
            <div className="si">
              <div className="sv">{r.served}</div>
              <div className="sl">복무한 일수</div>
            </div>
          </div>
          <div style={{ marginTop: 14, background: 'var(--bg3)', borderRadius: 8, overflow: 'hidden', height: 10, border: '1px solid var(--bd)' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg,var(--ac),var(--grn))', borderRadius: 8, transition: 'width .6s', width: pw }} />
          </div>
        </>
      )}
    </main>
  )
}

/* ——— pregnancy ——— */
function parseLocal(s) {
  if (!s) return null
  const p = s.split('-').map(Number)
  if (p.length !== 3) return null
  return new Date(p[0], p[1] - 1, p[2])
}
function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}
function trimester(w) {
  if (w <= 12) return '1분기 (1~12주)'
  if (w <= 27) return '2분기 (13~27주)'
  return '3분기 (28~40주)'
}

export function PregnancyWidget() {
  const [mode, setMode] = useState('lmp')
  const [refDate, setRefDate] = useState('')
  const [show, setShow] = useState(false)
  const [vals, setVals] = useState({})

  const hint =
    mode === 'lmp' ? '생리가 시작된 첫날을 선택하세요.' : '배란일(또는 수정 추정일)을 선택하세요. IVF 등은 담당의 지시일을 사용하세요.'

  const calc = () => {
    const base = parseLocal(refDate)
    const today = startOfDay(new Date())
    if (!base || Number.isNaN(base.getTime())) return
    let lmp
    let edd
    if (mode === 'lmp') {
      lmp = startOfDay(base)
      edd = new Date(lmp)
      edd.setDate(edd.getDate() + 280)
    } else {
      const ov = startOfDay(base)
      lmp = new Date(ov)
      lmp.setDate(lmp.getDate() - 14)
      edd = new Date(ov)
      edd.setDate(edd.getDate() + 266)
    }
    const diff = Math.floor((today - lmp) / MS)
    if (diff < 0) {
      alert('기준일이 오늘 이후입니다. 날짜를 확인해 주세요.')
      return
    }
    const w = Math.floor(diff / 7)
    const days = diff % 7
    const elapsed = diff
    const remain = Math.floor((edd - today) / MS)
    const pct = Math.min(100, Math.max(0, (elapsed / TOTAL_PREG) * 100))
    setShow(true)
    setVals({
      w: `${w}주 ${days}일`,
      edd: edd.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' }),
      elapsed: String(elapsed),
      remain: String(remain),
      tri: trimester(w),
      pct: `${pct.toFixed(1)}%`,
      pw: `${pct.toFixed(1)}%`
    })
  }

  return (
    <main className="card ani d2">
      <div className="fg">
        <div>
          <label>계산 기준</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="lmp">마지막 생리 시작일 기준</option>
            <option value="ovu">배란일(수정일) 기준</option>
          </select>
        </div>
        <div>
          <label>날짜</label>
          <input type="date" value={refDate} onChange={(e) => setRefDate(e.target.value)} />
        </div>
        <p className="hint">{hint}</p>
        <button type="button" className="btn" onClick={calc}>
          🤰 임신주수 계산
        </button>
      </div>
      {show && (
        <>
          <div className="sg" style={{ marginTop: 18, display: 'grid' }}>
            <div className="si">
              <div className="sv ac">{vals.w}</div>
              <div className="sl">현재 임신주수</div>
            </div>
            <div className="si">
              <div className="sv ac">{vals.edd}</div>
              <div className="sl">출산예정일</div>
            </div>
            <div className="si">
              <div className="sv">{vals.elapsed}</div>
              <div className="sl">임신 경과일수 (일)</div>
            </div>
            <div className="si">
              <div className="sv">{vals.remain}</div>
              <div className="sl">남은 일수 (일)</div>
            </div>
            <div className="si">
              <div className="sv">{vals.tri}</div>
              <div className="sl">현재 삼분기</div>
            </div>
            <div className="si">
              <div className="sv">{vals.pct}</div>
              <div className="sl">진행률 (%)</div>
            </div>
          </div>
          <p className="hint" style={{ marginTop: 8, textAlign: 'center' }}>
            임신 진행률 (280일 기준)
          </p>
          <div style={{ marginTop: 8, background: 'var(--bg3)', borderRadius: 8, overflow: 'hidden', height: 10, border: '1px solid var(--bd)' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg,var(--ac),var(--grn))', width: vals.pw, transition: 'width .6s' }} />
          </div>
        </>
      )}
    </main>
  )
}

/* ——— unemployment ——— */
export function UnemploymentWidget() {
  const [sal, setSal] = useState('')
  const [age, setAge] = useState('u50')
  const [period, setPeriod] = useState('3')
  const [show, setShow] = useState(false)
  const [out, setOut] = useState({})

  const onSal = formatInputComma(setSal)

  const calc = () => {
    const s = parseDigits(sal)
    if (!s) return
    let days = 120
    const pv = parseInt(period, 10) || 0
    if (age === 'u50') {
      if (pv >= 10) days = 210
      else if (pv >= 5) days = 180
      else if (pv >= 3) days = 150
      else if (pv >= 1) days = 120
    } else {
      if (pv >= 10) days = 270
      else if (pv >= 5) days = 240
      else if (pv >= 3) days = 180
      else if (pv >= 1) days = 150
    }
    const dailyWage = Math.round(s / 30)
    const dailyBenefit = Math.min(Math.max(Math.round(dailyWage * 0.6), 63104), 77000)
    const total = dailyBenefit * days
    setShow(true)
    setOut({
      r1: fmtInt(dailyBenefit),
      r2: `${days}일 (${Math.round(days / 30)}개월)`,
      r3: fmtInt(total),
      r4: fmtInt(dailyBenefit * 30)
    })
  }

  return (
    <main className="card ani d2">
      <div className="fg">
        <div>
          <label>퇴직 전 월 평균 급여 (세전, 원)</label>
          <input value={sal} onChange={onSal} placeholder="3,000,000" inputMode="numeric" />
        </div>
        <div className="fg fg2">
          <div>
            <label>나이</label>
            <select value={age} onChange={(e) => setAge(e.target.value)}>
              <option value="u50">50세 미만</option>
              <option value="o50">50세 이상</option>
            </select>
          </div>
          <div>
            <label>고용보험 가입기간</label>
            <select value={period} onChange={(e) => setPeriod(e.target.value)}>
              <option value="1">1년 미만</option>
              <option value="3">1~3년</option>
              <option value="5">3~5년</option>
              <option value="10">5~10년</option>
              <option value="99">10년 이상</option>
            </select>
          </div>
        </div>
        <button type="button" className="btn" onClick={calc}>
          💼 실업급여 계산
        </button>
      </div>
      {show && (
        <div className="sg" style={{ marginTop: 18 }}>
          <div className="si">
            <div className="sv ac">{out.r1}</div>
            <div className="sl">1일 구직급여액 (원)</div>
          </div>
          <div className="si">
            <div className="sv">{out.r2}</div>
            <div className="sl">수급 기간 (일)</div>
          </div>
          <div className="si">
            <div className="sv ac">{out.r3}</div>
            <div className="sl">총 예상 수령액 (원)</div>
          </div>
          <div className="si">
            <div className="sv">{out.r4}</div>
            <div className="sl">월 환산액 (원)</div>
          </div>
        </div>
      )}
    </main>
  )
}

/* ——— salary ——— */
export function SalaryWidget() {
  const [annual, setAnnual] = useState('')
  const [family, setFamily] = useState('3')
  const [show, setShow] = useState(false)
  const [o, setO] = useState({})

  const onAnn = formatInputComma(setAnnual)

  const calc = () => {
    const a = parseDigits(annual) * 10000
    if (!a) return
    const m = a / 12
    const fam = parseInt(family, 10)
    const pen = Math.min(m, 6170000) * 0.045
    const hp = m * 0.03545
    const lt = hp * 0.1295
    const emp = m * 0.009
    const taxBase = a - a * 0.15
    const taxRates = [
      [14000000, 0.06],
      [50000000, 0.15],
      [88000000, 0.24],
      [150000000, 0.35],
      [300000000, 0.38],
      [500000000, 0.4],
      [1000000000, 0.42],
      [1e15, 0.45]
    ]
    let tax = 0
    let prev = 0
    for (const [lim, rate] of taxRates) {
      if (taxBase <= lim) {
        tax += (taxBase - prev) * rate
        break
      }
      tax += (lim - prev) * rate
      prev = lim
    }
    tax = Math.max(0, tax / 12 - Math.max(0, (fam - 1) * 150000) / 12)
    const localTax = tax * 0.1
    const total = pen + hp + lt + emp + tax + localTax
    const net = m - total
    setShow(true)
    setO({
      r1: fmtInt(net),
      r2: Math.round((net * 12) / 10000).toLocaleString('ko-KR'),
      r3: fmtInt(pen),
      r4: fmtInt(hp + lt),
      r5: fmtInt(emp),
      r6: fmtInt(tax + localTax)
    })
  }

  return (
    <main className="card ani d2">
      <div className="fg">
        <div className="fg fg2">
          <div>
            <label>연봉 (만원)</label>
            <input value={annual} onChange={onAnn} placeholder="4,000" inputMode="numeric" />
          </div>
          <div>
            <label>부양가족 수 (본인 포함)</label>
            <select value={family} onChange={(e) => setFamily(e.target.value)}>
              <option value="1">1명</option>
              <option value="2">2명</option>
              <option value="3">3명</option>
              <option value="4">4명</option>
            </select>
          </div>
        </div>
        <button type="button" className="btn" onClick={calc}>
          💰 실수령액 계산
        </button>
      </div>
      {show && (
        <div className="sg" style={{ marginTop: 18 }}>
          <div className="si">
            <div className="sv ac">{o.r1}</div>
            <div className="sl">월 실수령액 (원)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r2}</div>
            <div className="sl">연 실수령액 (만원)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r3}</div>
            <div className="sl">국민연금</div>
          </div>
          <div className="si">
            <div className="sv">{o.r4}</div>
            <div className="sl">건강+장기요양</div>
          </div>
          <div className="si">
            <div className="sv">{o.r5}</div>
            <div className="sl">고용보험</div>
          </div>
          <div className="si">
            <div className="sv">{o.r6}</div>
            <div className="sl">소득세+지방세</div>
          </div>
        </div>
      )}
    </main>
  )
}

/* ——— insurance ——— */
export function InsuranceWidget() {
  const [sal, setSal] = useState('')
  const [show, setShow] = useState(false)
  const [o, setO] = useState({})
  const onSal = formatInputComma(setSal)

  const calc = () => {
    const s = parseDigits(sal)
    if (!s) return
    const p = Math.min(s, 6170000) * 0.045
    const h = s * 0.03545
    const l = h * 0.1295
    const e = s * 0.009
    const t = p + h + l + e
    setShow(true)
    setO({ r1: fmtInt(p), r2: fmtInt(h), r3: fmtInt(l), r4: fmtInt(e), r5: fmtInt(t), r6: fmtInt(s - t) })
  }

  return (
    <main className="card ani d2">
      <div className="fg">
        <div>
          <label>월급여 (세전, 원)</label>
          <input value={sal} onChange={onSal} placeholder="3,000,000" inputMode="numeric" />
        </div>
        <button type="button" className="btn" onClick={calc}>
          🧮 계산하기
        </button>
      </div>
      {show && (
        <div className="sg" style={{ marginTop: 18 }}>
          <div className="si">
            <div className="sv ac">{o.r1}</div>
            <div className="sl">국민연금 (4.5%)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r2}</div>
            <div className="sl">건강보험 (3.545%)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r3}</div>
            <div className="sl">장기요양 (건보의 12.95%)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r4}</div>
            <div className="sl">고용보험 (0.9%)</div>
          </div>
          <div className="si">
            <div className="sv ac">{o.r5}</div>
            <div className="sl">근로자 부담 합계</div>
          </div>
          <div className="si">
            <div className="sv">{o.r6}</div>
            <div className="sl">예상 실수령액</div>
          </div>
        </div>
      )}
    </main>
  )
}

/* ——— vat ——— */
export function VatWidget() {
  const [amount, setAmount] = useState('')
  const [show, setShow] = useState(false)
  const [o, setO] = useState({})
  const onAmt = formatInputComma(setAmount)
  const f = fmtInt

  const calcExcl = () => {
    const a = parseDigits(amount)
    if (!a) return
    setShow(true)
    setO({ r1: f(a), r2: f(a * 0.1), r3: f(a * 1.1) })
  }
  const calcIncl = () => {
    const a = parseDigits(amount)
    if (!a) return
    const supply = Math.round(a / 1.1)
    setShow(true)
    setO({ r1: f(supply), r2: f(a - supply), r3: f(a) })
  }

  return (
    <main className="card ani d2">
      <div className="fg">
        <div>
          <label>금액 입력 (원)</label>
          <input value={amount} onChange={onAmt} placeholder="1,000,000" inputMode="numeric" />
        </div>
        <div className="fg fg2">
          <button type="button" className="btn" style={{ background: '#059669' }} onClick={calcExcl}>
            🧾 부가세 별도 (→ 합계)
          </button>
          <button type="button" className="btn" style={{ background: '#D97706' }} onClick={calcIncl}>
            🧾 부가세 포함 (→ 분리)
          </button>
        </div>
      </div>
      {show && (
        <div className="sg" style={{ marginTop: 18 }}>
          <div className="si">
            <div className="sv">{o.r1}</div>
            <div className="sl">공급가액</div>
          </div>
          <div className="si">
            <div className="sv ac">{o.r2}</div>
            <div className="sl">부가세 (10%)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r3}</div>
            <div className="sl">합계금액</div>
          </div>
        </div>
      )}
    </main>
  )
}

/* ——— acquisition tax ——— */
export function AcquisitionTaxWidget() {
  const [price, setPrice] = useState('')
  const [type, setType] = useState('house')
  const [count, setCount] = useState('1')
  const [show, setShow] = useState(false)
  const [o, setO] = useState({})
  const onP = formatInputComma(setPrice)

  const calc = () => {
    const p = parseDigits(price)
    if (!p) return
    let rate = 0.04
    if (type === 'house') {
      if (count === '1') rate = p <= 600000000 ? 0.01 : p <= 900000000 ? 0.02 : 0.03
      else if (count === '2') rate = 0.08
      else rate = 0.12
    }
    const acq = p * rate
    const edu = acq * 0.1
    const farm = p > 600000000 && type === 'house' ? acq * 0.2 : 0
    const tot = acq + edu + farm
    setShow(true)
    setO({
      r1: fmtInt(acq),
      r2: fmtInt(edu),
      r3: fmtInt(farm),
      r4: fmtInt(tot),
      r5: `${((tot / p) * 100).toFixed(2)}%`
    })
  }

  return (
    <main className="card ani d2">
      <div className="fg">
        <div>
          <label>매매가 (원)</label>
          <input value={price} onChange={onP} placeholder="500,000,000" inputMode="numeric" />
        </div>
        <div className="fg fg2">
          <div>
            <label>부동산 유형</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="house">주택</option>
              <option value="land">토지</option>
              <option value="commercial">상가/오피스텔</option>
            </select>
          </div>
          <div>
            <label>주택 수</label>
            <select value={count} onChange={(e) => setCount(e.target.value)}>
              <option value="1">1주택</option>
              <option value="2">2주택</option>
              <option value="3">3주택 이상</option>
            </select>
          </div>
        </div>
        <button type="button" className="btn" onClick={calc}>
          🏠 취득세 계산
        </button>
      </div>
      {show && (
        <div className="sg" style={{ marginTop: 18 }}>
          <div className="si">
            <div className="sv ac">{o.r1}</div>
            <div className="sl">취득세</div>
          </div>
          <div className="si">
            <div className="sv">{o.r2}</div>
            <div className="sl">지방교육세</div>
          </div>
          <div className="si">
            <div className="sv">{o.r3}</div>
            <div className="sl">농어촌특별세</div>
          </div>
          <div className="si">
            <div className="sv ac">{o.r4}</div>
            <div className="sl">총 납부세액</div>
          </div>
          <div className="si">
            <div className="sv">{o.r5}</div>
            <div className="sl">실효세율</div>
          </div>
        </div>
      )}
    </main>
  )
}

/* ——— jeonse loan ——— */
export function JeonseLoanWidget() {
  const [loan, setLoan] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('2')
  const [repay, setRepay] = useState('annuity')
  const [show, setShow] = useState(false)
  const [o, setO] = useState({})
  const onLoan = formatInputComma(setLoan)

  const repayHint =
    repay === 'bullet'
      ? '만기일시상환은 매월 이자만 납부하고, 만기에 원금을 일시 상환하는 방식입니다.'
      : repay === 'annuity'
        ? '원리금균등상환은 매월 동일한 금액(원리금)을 납부합니다.'
        : '원금균등상환은 월 납입액이 첫 달 기준이며, 이후 매월 줄어듭니다.'

  const calc = () => {
    const P = parseDigits(loan)
    const annual = parseFloat(String(rate).replace(/,/g, '').trim()) || 0
    const y = parseInt(years, 10) || 1
    const n = y * 12
    const r = annual / 100 / 12
    const monthIntBullet = P * r
    if (P <= 0) {
      alert('대출금액을 입력해 주세요.')
      return
    }
    if (annual < 0 || annual > 100) {
      alert('금리를 올바르게 입력해 주세요.')
      return
    }
    let monthlyPay = 0
    let totalInt = 0
    let totalRepay = 0
    if (repay === 'bullet') {
      monthlyPay = monthIntBullet
      totalInt = monthIntBullet * n
      totalRepay = P + totalInt
    } else if (repay === 'annuity') {
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
    setShow(true)
    setO({
      r1: fmtInt(monthlyPay),
      r2: fmtInt(totalInt),
      r3: fmtInt(totalRepay),
      r4: fmtInt(yearlyInt),
      r5: fmtInt(monthIntBullet),
      r6: (Math.round(intRatio * 100) / 100).toLocaleString('ko-KR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
    })
  }

  return (
    <main className="card ani d2">
      <div className="fg">
        <div>
          <label>대출금액 (원)</label>
          <input value={loan} onChange={onLoan} placeholder="200,000,000" inputMode="numeric" />
        </div>
        <div className="fg fg2">
          <div>
            <label>연이율 (%)</label>
            <input
              value={rate}
              onChange={(e) => setRate(e.target.value.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1'))}
              placeholder="4.5"
            />
          </div>
          <div>
            <label>대출기간 (년)</label>
            <select value={years} onChange={(e) => setYears(e.target.value)}>
              {[1, 2, 3, 4, 5, 10, 15, 20, 30].map((x) => (
                <option key={x} value={String(x)}>
                  {x}년
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label>상환 방식</label>
          <select value={repay} onChange={(e) => setRepay(e.target.value)}>
            <option value="bullet">만기일시상환</option>
            <option value="annuity">원리금균등상환</option>
            <option value="principal">원금균등상환</option>
          </select>
        </div>
        <p className="hint" dangerouslySetInnerHTML={{ __html: repayHint }} />
        <button type="button" className="btn" onClick={calc}>
          🏠 이자 계산
        </button>
      </div>
      {show && (
        <div className="sg" style={{ marginTop: 18, display: 'grid' }}>
          <div className="si">
            <div className="sv ac">{o.r1}</div>
            <div className="sl">월 납입액 (원)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r2}</div>
            <div className="sl">총 이자 (원)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r3}</div>
            <div className="sl">총 상환액 (원)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r4}</div>
            <div className="sl">연평균 이자 (원)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r5}</div>
            <div className="sl">만기일시 시 월 이자 (원)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r6}</div>
            <div className="sl">총이자/원금 (%)</div>
          </div>
        </div>
      )}
    </main>
  )
}

const L12 = 1200000000
const BASE_DED = 2500000

function lt1home(y) {
  if (y < 3) return 0
  if (y === 3) return 0.24
  if (y === 4) return 0.32
  if (y === 5) return 0.4
  if (y === 6) return 0.48
  if (y === 7) return 0.56
  if (y === 8) return 0.64
  if (y === 9) return 0.72
  return 0.8
}
function ltGeneral(y) {
  if (y < 3) return 0
  if (y === 3) return 0.06
  if (y === 4) return 0.08
  if (y === 5) return 0.1
  if (y >= 15) return 0.3
  return Math.min(0.3, 0.1 + (y - 5) * 0.02)
}
function longTermPct(homes, hold, bandVal) {
  if (homes === 'h2' || homes === 'h3') return 0
  if (hold !== '2p') return 0
  const yi = parseInt(bandVal, 10) || 2
  if (homes === 'ex1' || homes === 't1') return lt1home(yi)
  return ltGeneral(yi)
}
function progressiveTax(base, extra) {
  if (base <= 0) return 0
  const lims = [14e6, 50e6, 88e6, 150e6, 300e6, 500e6, 1e9, Infinity]
  const rates = [0.06, 0.15, 0.24, 0.35, 0.38, 0.4, 0.42, 0.45]
  let left = base
  let prev = 0
  let t = 0
  for (let i = 0; i < lims.length && left > 0; i++) {
    const top = lims[i]
    const slice = Math.min(left, top - prev)
    t += slice * (rates[i] + extra)
    left -= slice
    prev = top
  }
  return Math.round(t)
}

/* ——— capital gains ——— */
export function CapitalGainsWidget() {
  const [sale, setSale] = useState('')
  const [purchase, setPurchase] = useState('')
  const [expense, setExpense] = useState('')
  const [hold, setHold] = useState('2p')
  const [homes, setHomes] = useState('ex1')
  const [band, setBand] = useState('5')
  const [show, setShow] = useState(false)
  const [o, setO] = useState({})

  const bind = (setter) => formatInputComma(setter)

  const calc = () => {
    const saleN = parseDigits(sale)
    const purN = parseDigits(purchase)
    const expN = parseDigits(expense)
    const gain = Math.max(0, saleN - purN - expN)
    let extra = 0
    if (homes === 'h2') extra = 0.2
    else if (homes === 'h3') extra = 0.3
    const ltRate = longTermPct(homes, hold, band)
    if (homes === 'ex1' && saleN <= L12) {
      setShow(true)
      setO({ rGain: fmtInt(gain), rLt: '0', rBase: '0', rTax: '0', rLocal: '0', rTot: '0' })
      return
    }
    let gainForStd = gain
    if (homes === 'ex1' && saleN > L12) gainForStd = gain * ((saleN - L12) / saleN)
    const rawLt = gainForStd * ltRate
    const ltAmt = Math.min(rawLt, gainForStd)
    const std = Math.max(0, gainForStd - ltAmt - BASE_DED)
    let cgTax = 0
    if (hold === 'u1') cgTax = Math.round(std * 0.7)
    else if (hold === '12') cgTax = Math.round(std * 0.6)
    else cgTax = progressiveTax(std, extra)
    const loc = Math.round(cgTax * 0.1)
    const tot = cgTax + loc
    setShow(true)
    setO({
      rGain: fmtInt(gain),
      rLt: fmtInt(ltAmt),
      rBase: fmtInt(std),
      rTax: fmtInt(cgTax),
      rLocal: fmtInt(loc),
      rTot: fmtInt(tot)
    })
  }

  return (
    <main className="card ani d2">
      <div className="fg">
        <div>
          <label>매도가 (원)</label>
          <input value={sale} onChange={bind(setSale)} placeholder="800,000,000" inputMode="numeric" />
        </div>
        <div>
          <label>매수가 (원)</label>
          <input value={purchase} onChange={bind(setPurchase)} placeholder="500,000,000" inputMode="numeric" />
        </div>
        <div>
          <label>필요경비 (원)</label>
          <input value={expense} onChange={bind(setExpense)} placeholder="10,000,000" inputMode="numeric" />
        </div>
        <p className="hint">취득세·중개수수료·인테리어 등 양도와 직접 관련된 비용을 포함해 보세요.</p>
        <div className="fg fg2">
          <div>
            <label>보유기간</label>
            <select value={hold} onChange={(e) => setHold(e.target.value)}>
              <option value="u1">1년 미만</option>
              <option value="12">1~2년</option>
              <option value="2p">2년 이상</option>
            </select>
          </div>
          <div>
            <label>주택 구분</label>
            <select value={homes} onChange={(e) => setHomes(e.target.value)}>
              <option value="ex1">1주택 비과세</option>
              <option value="t1">1주택 조정</option>
              <option value="h2">2주택</option>
              <option value="h3">3주택 이상</option>
            </select>
          </div>
        </div>
        <div id="holdBandWrap" className={hold === '2p' ? 'show' : ''}>
          <label>장기보유 특별공제 (2년 이상)</label>
          <select value={band} onChange={(e) => setBand(e.target.value)}>
            <option value="2">2년 이상 3년 미만</option>
            <option value="3">3년 이상 4년 미만</option>
            <option value="4">4년 이상 5년 미만</option>
            <option value="5">5년 이상 6년 미만</option>
            <option value="6">6년 이상 7년 미만</option>
            <option value="7">7년 이상 8년 미만</option>
            <option value="8">8년 이상 9년 미만</option>
            <option value="9">9년 이상 10년 미만</option>
            <option value="10">10년 이상</option>
          </select>
        </div>
        <button type="button" className="btn" onClick={calc}>
          🏛️ 양도세 계산
        </button>
      </div>
      {show && (
        <div className="sg" style={{ marginTop: 18 }}>
          <div className="si">
            <div className="sv">{o.rGain}</div>
            <div className="sl">양도차익 (원)</div>
          </div>
          <div className="si">
            <div className="sv">{o.rLt}</div>
            <div className="sl">장기보유특별공제 (원)</div>
          </div>
          <div className="si">
            <div className="sv">{o.rBase}</div>
            <div className="sl">과세표준 (원)</div>
          </div>
          <div className="si">
            <div className="sv ac">{o.rTax}</div>
            <div className="sl">양도소득세 (원)</div>
          </div>
          <div className="si">
            <div className="sv">{o.rLocal}</div>
            <div className="sl">지방소득세 (원)</div>
          </div>
          <div className="si">
            <div className="sv ac">{o.rTot}</div>
            <div className="sl">총 납부액 (원)</div>
          </div>
        </div>
      )}
    </main>
  )
}

const GIFT_LIM = { spouse: 600000000, pad: 50000000, pam: 20000000, des: 50000000, kin: 10000000, oth: 0 }
function progGift(b) {
  if (b <= 0) return 0
  if (b <= 100000000) return Math.round(b * 0.1)
  if (b <= 500000000) return Math.round(b * 0.2 - 10000000)
  if (b <= 1000000000) return Math.round(b * 0.3 - 60000000)
  if (b <= 3000000000) return Math.round(b * 0.4 - 160000000)
  return Math.round(b * 0.5 - 460000000)
}

/* ——— gift tax ——— */
export function GiftTaxWidget() {
  const [amt, setAmt] = useState('')
  const [prior, setPrior] = useState('')
  const [rel, setRel] = useState('spouse')
  const [show, setShow] = useState(false)
  const [o, setO] = useState({})
  const onA = formatInputComma(setAmt)
  const onP = formatInputComma(setPrior)

  const calc = () => {
    const a = parseDigits(amt)
    const p = parseDigits(prior)
    const cap = GIFT_LIM[rel] ?? 0
    const sum = a + p
    const applied = Math.min(cap, sum)
    const base = Math.max(0, sum - cap)
    const gross = progGift(base)
    const disc = Math.round(gross * 0.03)
    const pay = Math.max(0, gross - disc)
    setShow(true)
    setO({
      r1: fmtInt(a),
      r2: fmtInt(applied),
      r3: fmtInt(base),
      r4: fmtInt(gross),
      r5: fmtInt(disc),
      r6: fmtInt(pay)
    })
  }

  return (
    <main className="card ani d2">
      <div className="fg">
        <div>
          <label>이번 증여액 (원)</label>
          <input value={amt} onChange={onA} inputMode="numeric" />
        </div>
        <div>
          <label>기증여 누적 (원)</label>
          <input value={prior} onChange={onP} inputMode="numeric" />
        </div>
        <div>
          <label>관계</label>
          <select value={rel} onChange={(e) => setRel(e.target.value)}>
            <option value="spouse">배우자</option>
            <option value="pad">직계비속</option>
            <option value="pam">직계존속</option>
            <option value="des">손자녀 등</option>
            <option value="kin">기타 친족</option>
            <option value="oth">기타</option>
          </select>
        </div>
        <button type="button" className="btn" onClick={calc}>
          🎁 증여세 계산
        </button>
      </div>
      {show && (
        <div className="sg" style={{ marginTop: 18 }}>
          <div className="si">
            <div className="sv">{o.r1}</div>
            <div className="sl">증여액</div>
          </div>
          <div className="si">
            <div className="sv">{o.r2}</div>
            <div className="sl">공제 적용액</div>
          </div>
          <div className="si">
            <div className="sv">{o.r3}</div>
            <div className="sl">과세 표준</div>
          </div>
          <div className="si">
            <div className="sv ac">{o.r4}</div>
            <div className="sl">산출 세액</div>
          </div>
          <div className="si">
            <div className="sv">{o.r5}</div>
            <div className="sl">신고 세액공제(3%)</div>
          </div>
          <div className="si">
            <div className="sv ac">{o.r6}</div>
            <div className="sl">납부 예상액</div>
          </div>
        </div>
      )}
    </main>
  )
}

const DAILY_CAL = 2000
const FOOD_MAP = Object.fromEntries(FOODS.map((f) => [f.key, f]))

/* ——— calorie ——— */
export function CalorieWidget() {
  const [rows, setRows] = useState(() =>
    [0, 1, 2].map((i) => ({ id: i, key: FOODS[0].key, qty: '' }))
  )
  const [show, setShow] = useState(false)
  const [tot, setTot] = useState({ t: 0, pct: '0', rice: '0', walk: '0', details: [] })

  const addRow = () => setRows((r) => [...r, { id: Date.now(), key: FOODS[0].key, qty: '' }])
  const removeRow = (id) => setRows((r) => r.filter((x) => x.id !== id))

  const calc = () => {
    let total = 0
    const details = []
    for (const row of rows) {
      const q = parseDigits(row.qty)
      if (!q) continue
      const f = FOOD_MAP[row.key]
      if (!f) continue
      const kcal = (q / 100) * f.kcal
      total += kcal
      details.push({ name: f.name, qty: q, unit: f.unit, kcal })
    }
    const pct = total ? (total / DAILY_CAL) * 100 : 0
    setShow(true)
    setTot({
      t: total,
      pct: `${(Math.round(pct * 10) / 10).toFixed(1)}%`,
      rice: `${(Math.round((total / 300) * 10) / 10).toFixed(1)}공기`,
      walk: `${Math.round(total / 5).toLocaleString('ko-KR')}분`,
      details
    })
  }

  return (
    <main className="card ani d2">
      <div className="fg">
        {rows.map((row) => {
          const f = FOOD_MAP[row.key]
          return (
            <div key={row.id} className="food-row">
              <div>
                <label>음식</label>
                <select value={row.key} onChange={(e) => setRows((rs) => rs.map((x) => (x.id === row.id ? { ...x, key: e.target.value } : x)))}>
                  {FOODS.map((fd) => (
                    <option key={fd.key} value={fd.key}>
                      {fd.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>
                  양 ({f?.unit})
                </label>
                <input
                  value={row.qty}
                  onChange={(e) => {
                    const v = String(e.target.value).replace(/[^\d]/g, '')
                    setRows((rs) =>
                      rs.map((x) => (x.id === row.id ? { ...x, qty: v ? parseInt(v, 10).toLocaleString('ko-KR') : '' } : x))
                    )
                  }}
                  inputMode="numeric"
                  placeholder={f?.unit === 'ml' ? '250' : '200'}
                />
              </div>
              <div>
                <button type="button" className="del-btn" aria-label="삭제" onClick={() => removeRow(row.id)}>
                  ×
                </button>
              </div>
            </div>
          )
        })}
        <p className="hint">음식과 양을 입력하면 총 칼로리와 하루 권장량 대비 비율을 계산합니다.</p>
        <button type="button" className="btn" style={{ background: '#059669' }} onClick={addRow}>
          ➕ 음식 추가
        </button>
        <button type="button" className="btn" onClick={calc}>
          🍽️ 칼로리 계산
        </button>
      </div>
      {show && (
        <>
          <div className="sg" style={{ marginTop: 18 }}>
            <div className="si">
              <div className="sv ac">{Math.round(tot.t).toLocaleString('ko-KR')}</div>
              <div className="sl">총 섭취 칼로리 (kcal)</div>
            </div>
            <div className="si">
              <div className="sv">{tot.pct}</div>
              <div className="sl">일일 권장량 대비 (%)</div>
            </div>
            <div className="si">
              <div className="sv">{tot.rice}</div>
              <div className="sl">밥 환산 (공기)</div>
            </div>
            <div className="si">
              <div className="sv">{tot.walk}</div>
              <div className="sl">걷기 소모 시간 (분)</div>
            </div>
          </div>
          {tot.details.length > 0 && (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 18, background: 'var(--bg)', border: '1px solid var(--bd)', borderRadius: 'var(--r)' }}>
              <thead>
                <tr style={{ background: 'var(--bg2)' }}>
                  <th style={{ padding: '12px 10px', textAlign: 'left', fontSize: '0.82rem', color: 'var(--t3)' }}>음식</th>
                  <th style={{ padding: '12px 10px', textAlign: 'right', fontSize: '0.82rem', color: 'var(--t3)' }}>양</th>
                  <th style={{ padding: '12px 10px', textAlign: 'right', fontSize: '0.82rem', color: 'var(--t3)' }}>kcal</th>
                </tr>
              </thead>
              <tbody>
                {tot.details.map((d, i) => (
                  <tr key={i}>
                    <td style={{ padding: '12px 10px', borderBottom: '1px solid var(--bd)' }}>{d.name}</td>
                    <td style={{ padding: '12px 10px', borderBottom: '1px solid var(--bd)', textAlign: 'right' }}>
                      {d.qty.toLocaleString('ko-KR')} {d.unit}
                    </td>
                    <td style={{ padding: '12px 10px', borderBottom: '1px solid var(--bd)', textAlign: 'right' }}>
                      {Math.round(d.kcal).toLocaleString('ko-KR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </main>
  )
}

/* ——— severance ——— */
export function SeveranceWidget() {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [avgSal, setAvgSal] = useState('')
  const [show, setShow] = useState(false)
  const [o, setO] = useState({})
  const onSal = formatInputComma(setAvgSal)

  const calc = () => {
    const s = new Date(start)
    const e = new Date(end)
    const avg = parseDigits(avgSal)
    if (!avg || Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return
    const days = Math.round((e - s) / MS)
    if (days < 365) {
      alert('퇴직금은 1년 이상 근무 시 발생합니다.')
      return
    }
    const dailyWage = avg / 30
    const severance = dailyWage * 30 * (days / 365)
    setShow(true)
    setO({
      r1: fmtInt(severance),
      r2: `${days.toLocaleString('ko-KR')}일`,
      r3: fmtInt(dailyWage),
      r4: `${(days / 365).toFixed(1)}년`
    })
  }

  return (
    <main className="card ani d2">
      <div className="fg">
        <div className="fg fg2">
          <div>
            <label>입사일</label>
            <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
          </div>
          <div>
            <label>퇴사일</label>
            <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
          </div>
        </div>
        <div>
          <label>최근 3개월 평균 월급 (세전, 원)</label>
          <input value={avgSal} onChange={onSal} placeholder="3,500,000" inputMode="numeric" />
        </div>
        <button type="button" className="btn" onClick={calc}>
          📦 퇴직금 계산
        </button>
      </div>
      {show && (
        <div className="sg" style={{ marginTop: 18 }}>
          <div className="si">
            <div className="sv ac">{o.r1}</div>
            <div className="sl">예상 퇴직금 (원)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r2}</div>
            <div className="sl">근속 일수</div>
          </div>
          <div className="si">
            <div className="sv">{o.r3}</div>
            <div className="sl">1일 평균임금</div>
          </div>
          <div className="si">
            <div className="sv">{o.r4}</div>
            <div className="sl">근속 년수</div>
          </div>
        </div>
      )}
    </main>
  )
}

/* ——— hourly ——— */
export function HourlyWidget() {
  const [hourly, setHourly] = useState('10,320')
  const [days, setDays] = useState('5')
  const [hours, setHours] = useState('8')
  const [show, setShow] = useState(false)
  const [o, setO] = useState({})
  const onH = formatInputComma(setHourly)

  const calc = () => {
    const h = parseDigits(hourly)
    if (!h) return
    const d = parseInt(days, 10)
    const hrs = parseInt(hours, 10)
    const weekHrs = d * hrs
    const daily = h * hrs
    const weeklyBase = daily * d
    const hasJ = weekHrs >= 15
    const juHyu = hasJ ? Math.min(weekHrs / 40, 1) * 8 * h : 0
    const weekly = weeklyBase + juHyu
    const monthly = Math.round((weekly * 52) / 12)
    setShow(true)
    setO({
      r1: fmtInt(daily),
      r2: fmtInt(weekly),
      r3: fmtInt(monthly),
      r4: hasJ ? fmtInt(juHyu) : '미해당',
      r5: Math.round((monthly * 12) / 10000).toLocaleString('ko-KR'),
      ok: h >= 10320
    })
  }

  return (
    <main className="card ani d2">
      <div className="fg">
        <div>
          <label>시급 (원)</label>
          <input value={hourly} onChange={onH} inputMode="numeric" />
        </div>
        <div className="fg fg2">
          <div>
            <label>주간 근무일수</label>
            <select value={days} onChange={(e) => setDays(e.target.value)}>
              <option value="3">3일</option>
              <option value="4">4일</option>
              <option value="5">5일</option>
              <option value="6">6일</option>
            </select>
          </div>
          <div>
            <label>일 근무시간</label>
            <select value={hours} onChange={(e) => setHours(e.target.value)}>
              <option value="4">4시간</option>
              <option value="6">6시간</option>
              <option value="8">8시간</option>
            </select>
          </div>
        </div>
        <button type="button" className="btn" onClick={calc}>
          ⏰ 계산하기
        </button>
      </div>
      {show && (
        <div className="sg" style={{ marginTop: 18 }}>
          <div className="si">
            <div className="sv">{o.r1}</div>
            <div className="sl">일급</div>
          </div>
          <div className="si">
            <div className="sv">{o.r2}</div>
            <div className="sl">주급 (주휴 포함)</div>
          </div>
          <div className="si">
            <div className="sv ac">{o.r3}</div>
            <div className="sl">월급 (주휴 포함)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r4}</div>
            <div className="sl">주휴수당 (주)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r5}</div>
            <div className="sl">연봉 환산 (만원)</div>
          </div>
          <div className="si">
            <div className="sv" style={{ color: o.ok ? 'var(--grn)' : 'var(--red)' }}>
              {o.ok ? '✅ 준수' : '❌ 미달'}
            </div>
            <div className="sl">최저시급 준수</div>
          </div>
        </div>
      )}
    </main>
  )
}

function calcCommissionFee(deal, base) {
  let rate = 0
  let cap = null
  const v = base
  if (deal === 'sale') {
    if (v < 50000000) {
      rate = 0.6
      cap = 250000
    } else if (v < 200000000) {
      rate = 0.5
      cap = 800000
    } else if (v < 900000000) rate = 0.4
    else if (v < 1200000000) rate = 0.5
    else if (v < 1500000000) rate = 0.6
    else rate = 0.7
  } else {
    if (v < 50000000) {
      rate = 0.5
      cap = 200000
    } else if (v < 100000000) {
      rate = 0.4
      cap = 300000
    } else if (v < 600000000) rate = 0.3
    else if (v < 1200000000) rate = 0.4
    else if (v < 1500000000) rate = 0.5
    else rate = 0.6
  }
  const feeRaw = (v * rate) / 100
  const fee = cap != null ? Math.min(feeRaw, cap) : feeRaw
  return { ratePct: rate, feeCap: Math.round(fee) }
}

/* ——— commission ——— */
export function CommissionWidget() {
  const [dealType, setDealType] = useState('sale')
  const [dealAmount, setDealAmount] = useState('')
  const [deposit, setDeposit] = useState('')
  const [rent, setRent] = useState('')
  const [show, setShow] = useState(false)
  const [o, setO] = useState({})

  const fmtDeal = (v) => {
    const x = String(v).replace(/[^\d]/g, '')
    if (!x) return ''
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const calc = () => {
    let base = 0
    if (dealType === 'sale' || dealType === 'jeonse') base = parseDigits(dealAmount)
    else base = parseDigits(deposit) + parseDigits(rent) * 100
    if (!base) {
      setShow(false)
      return
    }
    const { ratePct, feeCap } = calcCommissionFee(dealType, base)
    const feeVatInc = Math.round(feeCap * 1.1)
    const ratio = base > 0 ? (feeCap / base) * 100 : 0
    setShow(true)
    setO({
      r1: ratePct.toFixed(1).replace(/\.0$/, ''),
      r2: feeCap.toLocaleString('ko-KR'),
      r3: feeVatInc.toLocaleString('ko-KR'),
      r4: `${ratio.toFixed(2)}%`
    })
  }

  return (
    <main className="card ani d2">
      <div className="fg">
        <div className="fg fg2">
          <div>
            <label>거래 유형</label>
            <select value={dealType} onChange={(e) => setDealType(e.target.value)}>
              <option value="sale">매매</option>
              <option value="jeonse">전세</option>
              <option value="monthly">월세</option>
            </select>
          </div>
          {(dealType === 'sale' || dealType === 'jeonse') && (
            <div>
              <label>거래금액 (원)</label>
              <input
                value={dealAmount}
                onChange={(e) => setDealAmount(fmtDeal(e.target.value))}
                inputMode="numeric"
                placeholder="500,000,000"
              />
            </div>
          )}
        </div>
        {dealType === 'monthly' && (
          <div className="fg fg2">
            <div>
              <label>보증금 (원)</label>
              <input value={deposit} onChange={(e) => setDeposit(fmtDeal(e.target.value))} inputMode="numeric" />
            </div>
            <div>
              <label>월세 (원)</label>
              <input value={rent} onChange={(e) => setRent(fmtDeal(e.target.value))} inputMode="numeric" />
            </div>
          </div>
        )}
        <button type="button" className="btn" onClick={calc}>
          🏘️ 중개수수료 계산
        </button>
      </div>
      {show && (
        <div className="sg" style={{ marginTop: 18 }}>
          <div className="si">
            <div className="sv ac">{o.r1}</div>
            <div className="sl">적용 요율 (%)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r2}</div>
            <div className="sl">중개수수료 (원)</div>
          </div>
          <div className="si">
            <div className="sv ac">{o.r3}</div>
            <div className="sl">부가세 포함 (원)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r4}</div>
            <div className="sl">거래대금 대비 (%)</div>
          </div>
        </div>
      )}
    </main>
  )
}

/* ——— compound ——— */
export function CompoundWidget() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('')
  const [monthly, setMonthly] = useState('')
  const [show, setShow] = useState(false)
  const [o, setO] = useState({})
  const toNum = (v) => parseInt(String(v || '').replace(/[^0-9]/g, ''), 10) || 0
  const fmt = (n) => (isFinite(n) ? Math.round(n).toLocaleString('ko-KR') : '0')
  const onC = (setter) => (e) => {
    const raw = String(e.target.value).replace(/[^0-9]/g, '')
    setter(raw ? parseInt(raw, 10).toLocaleString('ko-KR') : '')
  }

  const calc = () => {
    const P = toNum(principal)
    const r = toNum(rate)
    const y = toNum(years)
    const A = toNum(monthly)
    if (!P || !r || !y) {
      setShow(false)
      return
    }
    const i = r / 100
    const n = Math.max(0, Math.round(y * 12))
    const m = i / 12
    let compoundFinal = 0
    let simpleFinal = 0
    if (A > 0) {
      if (m !== 0) {
        const pow = Math.pow(1 + m, n)
        compoundFinal = P * pow + A * ((pow - 1) / m)
      } else compoundFinal = P + A * n
      simpleFinal = P * (1 + i * y) + A * n
    } else {
      compoundFinal = P * Math.pow(1 + i, y)
      simpleFinal = P * (1 + i * y)
    }
    const totalPrincipal = P + A * n
    const compoundInterest = compoundFinal - totalPrincipal
    const simpleInterest = simpleFinal - totalPrincipal
    setShow(true)
    setO({
      r1: fmt(compoundFinal),
      r2: fmt(compoundInterest),
      r3: fmt(simpleFinal),
      r4: fmt(simpleInterest),
      r5: fmt(compoundFinal - simpleFinal),
      r6: fmt(totalPrincipal)
    })
  }

  return (
    <main className="card ani d2">
      <div className="fg">
        <div>
          <label>원금 (원)</label>
          <input value={principal} onChange={onC(setPrincipal)} inputMode="numeric" />
        </div>
        <div className="fg fg2">
          <div>
            <label>연이율 (%)</label>
            <input value={rate} onChange={onC(setRate)} inputMode="numeric" />
          </div>
          <div>
            <label>기간 (년)</label>
            <input value={years} onChange={onC(setYears)} inputMode="numeric" />
          </div>
        </div>
        <div>
          <label>월 적립 (원, 없으면 0)</label>
          <input value={monthly} onChange={onC(setMonthly)} inputMode="numeric" />
        </div>
        <button type="button" className="btn" onClick={calc}>
          📈 복리 계산
        </button>
      </div>
      {show && (
        <div className="sg" style={{ marginTop: 18 }}>
          <div className="si">
            <div className="sv ac">{o.r1}</div>
            <div className="sl">복리 최종 (원)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r2}</div>
            <div className="sl">복리 이자 (원)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r3}</div>
            <div className="sl">단리 최종 (원)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r4}</div>
            <div className="sl">단리 이자 (원)</div>
          </div>
          <div className="si">
            <div className="sv ac">{o.r5}</div>
            <div className="sl">복리−단리 차이 (원)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r6}</div>
            <div className="sl">납입 원금 합계 (원)</div>
          </div>
        </div>
      )}
    </main>
  )
}

/* ——— bmr ——— */
export function BmrWidget() {
  const [sex, setSex] = useState('m')
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [activity, setActivity] = useState('1.2')
  const [show, setShow] = useState(false)
  const [o, setO] = useState({})
  const toInt = (v) => parseInt(String(v || '').replace(/[^0-9]/g, ''), 10) || 0
  const onC = (setter) => (e) => {
    const raw = String(e.target.value).replace(/[^0-9]/g, '')
    setter(raw ? parseInt(raw, 10).toLocaleString('ko-KR') : '')
  }

  const calc = () => {
    const ag = toInt(age)
    const h = toInt(height)
    const w = toInt(weight)
    const act = parseFloat(activity) || 1.2
    if (!ag || !h || !w) {
      setShow(false)
      return
    }
    const bmr = 10 * w + 6.25 * h - 5 * ag + (sex === 'm' ? 5 : -161)
    const tdee = bmr * act
    const cut = tdee * 0.8
    const bulk = tdee * 1.2
    const bmi = w / Math.pow(h / 100, 2)
    setShow(true)
    setO({
      r1: fmtInt(bmr),
      r2: fmtInt(tdee),
      r3: fmtInt(cut),
      r4: fmtInt(tdee),
      r5: fmtInt(bulk),
      r6: (Math.round(bmi * 10) / 10).toFixed(1)
    })
  }

  return (
    <main className="card ani d2">
      <div className="fg">
        <div>
          <label>성별</label>
          <select value={sex} onChange={(e) => setSex(e.target.value)}>
            <option value="m">남성</option>
            <option value="f">여성</option>
          </select>
        </div>
        <div className="fg fg2">
          <div>
            <label>나이 (세)</label>
            <input value={age} onChange={onC(setAge)} inputMode="numeric" />
          </div>
          <div>
            <label>키 (cm)</label>
            <input value={height} onChange={onC(setHeight)} inputMode="numeric" />
          </div>
        </div>
        <div>
          <label>체중 (kg)</label>
          <input value={weight} onChange={onC(setWeight)} inputMode="numeric" />
        </div>
        <div>
          <label>활동량</label>
          <select value={activity} onChange={(e) => setActivity(e.target.value)}>
            <option value="1.2">거의 운동 안 함</option>
            <option value="1.375">가벼운 활동</option>
            <option value="1.55">보통</option>
            <option value="1.725">적극적</option>
            <option value="1.9">매우 높음</option>
          </select>
        </div>
        <button type="button" className="btn" onClick={calc}>
          🔥 기초대사량 계산
        </button>
      </div>
      {show && (
        <div className="sg" style={{ marginTop: 18 }}>
          <div className="si">
            <div className="sv ac">{o.r1}</div>
            <div className="sl">기초대사량 (kcal)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r2}</div>
            <div className="sl">TDEE (kcal)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r3}</div>
            <div className="sl">감량 목표 (80%)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r4}</div>
            <div className="sl">유지 칼로리</div>
          </div>
          <div className="si">
            <div className="sv">{o.r5}</div>
            <div className="sl">벌크 목표 (120%)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r6}</div>
            <div className="sl">BMI</div>
          </div>
        </div>
      )}
    </main>
  )
}

/* ——— freelance 3.3% ——— */
export function FreelanceWidget() {
  const [dir, setDir] = useState('gross2net')
  const [amount, setAmount] = useState('')
  const [show, setShow] = useState(false)
  const [o, setO] = useState({})
  const onA = formatInputComma(setAmount)

  const calc = () => {
    const v = parseDigits(amount)
    if (!v) {
      setShow(false)
      return
    }
    let gross = 0
    let net = 0
    if (dir === 'gross2net') {
      gross = v
      net = gross * 0.967
    } else {
      net = v
      gross = net / 0.967
    }
    const incomeTax = gross * 0.03
    const localTax = incomeTax * 0.1
    const totalW = gross * 0.033
    const effRate = (totalW / gross) * 100
    setShow(true)
    setO({
      r1: fmtInt(gross),
      r2: fmtInt(incomeTax),
      r3: fmtInt(localTax),
      r4: fmtInt(totalW),
      r5: fmtInt(net),
      r6: `${(Math.round(effRate * 100) / 100).toFixed(2)}%`
    })
  }

  return (
    <main className="card ani d2">
      <div className="fg">
        <div>
          <label>변환 방향</label>
          <select value={dir} onChange={(e) => setDir(e.target.value)}>
            <option value="gross2net">총액 → 실수령</option>
            <option value="net2gross">실수령 → 총액</option>
          </select>
        </div>
        <div>
          <label>금액 (원)</label>
          <input value={amount} onChange={onA} inputMode="numeric" />
        </div>
        <button type="button" className="btn" onClick={calc}>
          💸 3.3% 계산
        </button>
      </div>
      {show && (
        <div className="sg" style={{ marginTop: 18 }}>
          <div className="si">
            <div className="sv">{o.r1}</div>
            <div className="sl">총 사업소득 (원)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r2}</div>
            <div className="sl">소득세 3% (원)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r3}</div>
            <div className="sl">지방소득세 (원)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r4}</div>
            <div className="sl">원천징수 합계 (원)</div>
          </div>
          <div className="si">
            <div className="sv ac">{o.r5}</div>
            <div className="sl">실수령액 (원)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r6}</div>
            <div className="sl">유효 원천율</div>
          </div>
        </div>
      )}
    </main>
  )
}

const GRADE_DEFS = {
  4.5: [
    { k: 'A+', p: 4.5 },
    { k: 'A0', p: 4.0 },
    { k: 'B+', p: 3.5 },
    { k: 'B0', p: 3.0 },
    { k: 'C+', p: 2.5 },
    { k: 'C0', p: 2.0 },
    { k: 'D+', p: 1.5 },
    { k: 'D0', p: 1.0 },
    { k: 'F', p: 0 }
  ],
  4.3: [
    { k: 'A+', p: 4.3 },
    { k: 'A0', p: 4.0 },
    { k: 'A-', p: 3.7 },
    { k: 'B+', p: 3.3 },
    { k: 'B0', p: 3.0 },
    { k: 'B-', p: 2.7 },
    { k: 'C+', p: 2.3 },
    { k: 'C0', p: 2.0 },
    { k: 'C-', p: 1.7 },
    { k: 'D+', p: 1.3 },
    { k: 'D0', p: 1.0 },
    { k: 'F', p: 0 }
  ]
}

/* ——— gpa ——— */
export function GpaWidget() {
  const [maxScore, setMaxScore] = useState('4.5')
  const [rows, setRows] = useState(() =>
    [0, 1, 2, 3, 4].map((i) => ({ id: i, credit: '3', grade: '4.5', gradeKey: 'A+' }))
  )
  const [show, setShow] = useState(false)
  const [o, setO] = useState({})

  const defs = GRADE_DEFS[maxScore] || GRADE_DEFS['4.5']

  const calc = () => {
    let weighted = 0
    let totalCredits = 0
    let earnedCredits = 0
    for (const row of rows) {
      const credit = parseFloat(row.credit) || 0
      const gradePoint = parseFloat(row.grade) || 0
      if (!credit || !isFinite(gradePoint)) continue
      weighted += credit * gradePoint
      totalCredits += credit
      if (gradePoint > 0) earnedCredits += credit
    }
    if (totalCredits <= 0) {
      setShow(false)
      return
    }
    const gpa = weighted / totalCredits
    const max = parseFloat(maxScore)
    const percent = (gpa / max) * 100
    setShow(true)
    setO({
      r1: gpa.toFixed(2),
      r2: String(Math.round(totalCredits)),
      r3: String(Math.round(earnedCredits)),
      r4: `${percent.toFixed(2)}%`
    })
  }

  return (
    <main className="card ani d2">
      <div className="fg">
        <div className="fg fg2">
          <div>
            <label>만점 기준</label>
            <select
              value={maxScore}
              onChange={(e) => {
                const m = e.target.value
                setMaxScore(m)
                const d = GRADE_DEFS[m]
                setRows((rs) =>
                  rs.map((row) => {
                    const match = d.find((x) => x.k === row.gradeKey) || d[0]
                    return { ...row, grade: String(match.p), gradeKey: match.k }
                  })
                )
              }}
            >
              <option value="4.5">4.5만점</option>
              <option value="4.3">4.3만점</option>
            </select>
          </div>
        </div>
        {rows.map((row) => (
          <div key={row.id} className="gpa-row">
            <input type="text" placeholder="과목명" readOnly style={{ cursor: 'default' }} />
            <select
              value={row.credit}
              onChange={(e) => setRows((rs) => rs.map((x) => (x.id === row.id ? { ...x, credit: e.target.value } : x)))}
            >
              {[1, 2, 3].map((c) => (
                <option key={c} value={String(c)}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={row.grade}
              onChange={(e) => {
                const p = e.target.value
                const opt = defs.find((d) => String(d.p) === p)
                setRows((rs) =>
                  rs.map((x) => (x.id === row.id ? { ...x, grade: p, gradeKey: opt?.k || 'F' } : x))
                )
              }}
            >
              {defs.map((d) => (
                <option key={d.k} value={String(d.p)}>
                  {d.k}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="del-btn"
              aria-label="삭제"
              onClick={() => setRows((rs) => rs.filter((x) => x.id !== row.id))}
            >
              ×
            </button>
          </div>
        ))}
        <div className="fg fg2">
          <button type="button" className="btn" style={{ background: '#059669' }} onClick={() => setRows((r) => [...r, { id: Date.now(), credit: '3', grade: '4.5', gradeKey: 'A+' }])}>
            과목 추가
          </button>
          <button type="button" className="btn" onClick={calc}>
            🎓 학점 계산
          </button>
        </div>
      </div>
      {show && (
        <div className="sg" style={{ marginTop: 18 }}>
          <div className="si">
            <div className="sv ac">{o.r1}</div>
            <div className="sl">평균 학점 (GPA)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r2}</div>
            <div className="sl">총 이수 학점</div>
          </div>
          <div className="si">
            <div className="sv">{o.r3}</div>
            <div className="sl">취득 학점 (F 제외)</div>
          </div>
          <div className="si">
            <div className="sv">{o.r4}</div>
            <div className="sl">백분율 환산</div>
          </div>
        </div>
      )}
    </main>
  )
}

/* ——— placeholder (신규 계산기 — 산식 연결 전) ——— */
function PlaceholderCalcWidget({ emoji, title, hint, fields }) {
  return (
    <main className="card ani d2">
      <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 10 }}>{title}</h2>
      <p className="hint" style={{ color: 'var(--t2)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 14 }}>
        {hint}
      </p>
      <div className="fg">
        {fields.map((f) => (
          <div key={f.label}>
            <label>{f.label}</label>
            <input type="text" placeholder={f.placeholder} autoComplete="off" />
          </div>
        ))}
        <button type="button" className="btn" disabled style={{ opacity: 0.72, cursor: 'not-allowed' }}>
          {emoji} 자동 계산 (곧 제공)
        </button>
      </div>
      <p style={{ marginTop: 14, fontSize: '0.78rem', color: 'var(--t3)' }}>
        입력 항목과 산식은 순차적으로 반영됩니다.
      </p>
    </main>
  )
}

export function WeeklyHolidayWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="📅"
      title="주휴수당 계산기"
      hint="2026년 통상임금·소정근로시간 기준 주휴수당 산정 로직을 준비 중입니다."
      fields={[
        { label: '1주 소정근로시간 (시간)', placeholder: '예: 40' },
        { label: '시급 또는 통상시급 (원)', placeholder: '예: 10320' },
        { label: '상시 근로 주 수', placeholder: '예: 4.345 (한 달 평균)' }
      ]}
    />
  )
}

export function OvertimeWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="⏱️"
      title="연장근로수당 계산기"
      hint="연장·야간·휴일 가산을 구분 반영한 금액 산출을 준비 중입니다."
      fields={[
        { label: '통상시급 (원)', placeholder: '예: 15000' },
        { label: '연장근로 시간 (시간)', placeholder: '예: 10' },
        { label: '월 소정근로시간 (시간)', placeholder: '예: 209' }
      ]}
    />
  )
}

export function NightPayWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="🌙"
      title="야간수당 계산기"
      hint="22시~06시 야간 가산 50% 등 법정 가산을 반영한 추정치를 준비 중입니다."
      fields={[
        { label: '통상시급 (원)', placeholder: '예: 12000' },
        { label: '야간 근로 시간 (시간)', placeholder: '예: 20' }
      ]}
    />
  )
}

export function IncomeTaxWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="🧾"
      title="종합소득세 계산기"
      hint="과세표준·세율 누진·세액공제를 반영한 확정신고 추정 모델을 준비 중입니다."
      fields={[
        { label: '종합소득금액 (만원)', placeholder: '예: 4500' },
        { label: '인적·연금·특별공제 합산 (만원)', placeholder: '예: 800' }
      ]}
    />
  )
}

export function InheritanceWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="🏛️"
      title="상속세 계산기"
      hint="공제·과세가액·누진세율을 반영한 상속세 추정을 준비 중입니다."
      fields={[
        { label: '순재산가액 (억 원)', placeholder: '예: 12' },
        { label: '상속인 수·공제 유형', placeholder: '예: 배우자 1, 자녀 2' }
      ]}
    />
  )
}

export function JeonwolseWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="🔑"
      title="전월세전환 계산기"
      hint="전환율·보증금·월세 상호 환산 시나리오를 준비 중입니다."
      fields={[
        { label: '전세 보증금 (만원)', placeholder: '예: 20000' },
        { label: '월세 (만원)', placeholder: '예: 80' },
        { label: '적용 전환율 (연 %)', placeholder: '예: 4.5' }
      ]}
    />
  )
}

export function DsrDtiWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="📊"
      title="DSR DTI 계산기"
      hint="연 소득·기존·신규 원리금 상환액으로 DSR·DTI를 추정하는 모델을 준비 중입니다."
      fields={[
        { label: '연 소득 (만원)', placeholder: '예: 6000' },
        { label: '기존 연 원리금 상환 (만원)', placeholder: '예: 600' },
        { label: '신규 월 원리금 추정 (만원)', placeholder: '예: 120' }
      ]}
    />
  )
}

export function YearEndTaxWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="🔖"
      title="연말정산 환급액 계산기"
      hint="근로소득·원천징수·세액공제를 반영한 환급·추가납부 추정을 준비 중입니다."
      fields={[
        { label: '연간 총 급여 (만원)', placeholder: '예: 4800' },
        { label: '원천징수 세액 (만원)', placeholder: '예: 180' },
        { label: '세액공제 합산 (만원)', placeholder: '예: 90' }
      ]}
    />
  )
}

export function RentalTaxWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="🏠"
      title="임대소득세 계산기"
      hint="필요경비·기준경비·과세 방식별 임대소득 추정을 준비 중입니다."
      fields={[
        { label: '연 임대 수입 (만원)', placeholder: '예: 2400' },
        { label: '실제 필요경비 (만원)', placeholder: '예: 400' }
      ]}
    />
  )
}

export function CarTaxWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="🚗"
      title="자동차세 계산기"
      hint="배기량·차종·감면 여부를 반영한 지방세 자동차세 추정을 준비 중입니다."
      fields={[
        { label: '배기량 (cc)', placeholder: '예: 1999' },
        { label: '차종 (승용·승합·화물 등)', placeholder: '예: 승용 비영업' }
      ]}
    />
  )
}

export function SavingsWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="💵"
      title="적금이자 계산기"
      hint="적립액·금리 방식(단리·복리)·만기에 따른 수령액 추정을 준비 중입니다."
      fields={[
        { label: '월 납입액 (만원)', placeholder: '예: 50' },
        { label: '연이율 (%)', placeholder: '예: 3.5' },
        { label: '적립 개월 수', placeholder: '예: 12' }
      ]}
    />
  )
}

export function StockReturnWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="📈"
      title="주식수익률 계산기"
      hint="매수·매도·수수료·세금을 반영한 실현 손익·수익률을 준비 중입니다."
      fields={[
        { label: '매수 단가 (원)', placeholder: '예: 50000' },
        { label: '수량 (주)', placeholder: '예: 100' },
        { label: '매도 단가 (원)', placeholder: '예: 55000' }
      ]}
    />
  )
}

export function MaternityWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="👶"
      title="출산휴가급여 계산기"
      hint="고용보험 출산전후휴가급여 일액·일수를 반영한 추정을 준비 중입니다."
      fields={[
        { label: '통상임금 기준 일 급여 (원)', placeholder: '고시 상한 적용 전' },
        { label: '출산전후휴가 일수', placeholder: '예: 90' }
      ]}
    />
  )
}

export function ParentalLeaveWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="🧸"
      title="육아휴직급여 계산기"
      hint="육아휴직 급여 구간별 비율·상한을 반영한 월별 추정을 준비 중입니다."
      fields={[
        { label: '휴직 전 월 평균임금 (원)', placeholder: '예: 3500000' },
        { label: '육아휴직 개월 수', placeholder: '예: 12' }
      ]}
    />
  )
}

export function LoanInterestWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="🏦"
      title="대출이자 계산기"
      hint="원리금균등·원금균등·만기일시 등 상환 방식별 상환표 추정을 준비 중입니다."
      fields={[
        { label: '대출 원금 (만원)', placeholder: '예: 10000' },
        { label: '연이율 (%)', placeholder: '예: 4.2' },
        { label: '대출 기간 (개월)', placeholder: '예: 240' }
      ]}
    />
  )
}

export function HealthInsuranceWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="🏥"
      title="건강보험료 계산기"
      hint="보수월액·요율·장기요양 연동 산정을 준비 중입니다."
      fields={[
        { label: '월 보수월액 (만원)', placeholder: '예: 350' },
        { label: '가입 유형', placeholder: '직장 / 지역' }
      ]}
    />
  )
}

export function PensionWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="🧓"
      title="국민연금 수령액 계산기"
      hint="가입기간·평균소득월액·수령 시기별 연금액 추정을 준비 중입니다."
      fields={[
        { label: '총 가입 기간 (월)', placeholder: '예: 360' },
        { label: '평균소득월액 추정 (만원)', placeholder: '예: 400' }
      ]}
    />
  )
}

export function EmploymentInsuranceWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="🛡️"
      title="고용보험료 계산기"
      hint="실업·고안·능개 요율을 반영한 보험료 추정을 준비 중입니다."
      fields={[
        { label: '월 보수월액 (만원)', placeholder: '예: 300' },
        { label: '사업장 유형', placeholder: '일반 / 우선지원 등' }
      ]}
    />
  )
}

export function MinimumWageWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="💵"
      title="최저시급 월급 계산기"
      hint="2026년 시급·월 환산근로시간·주휴 포함 시나리오를 준비 중입니다."
      fields={[
        { label: '주 근로시간 (시간)', placeholder: '예: 40' },
        { label: '시급 (원)', placeholder: '예: 10320' }
      ]}
    />
  )
}

export function AnnualLeaveWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="🏖️"
      title="연차수당 계산기"
      hint="미사용 연차 일수·통상임금 기반 수당 추정을 준비 중입니다."
      fields={[
        { label: '미사용 연차 (일)', placeholder: '예: 8' },
        { label: '1일 통상임금 (원)', placeholder: '예: 150000' }
      ]}
    />
  )
}

export function AlimonyWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="⚖️"
      title="양육비 계산기"
      hint="기준표·소득·자녀 연령을 반영한 참고액 산출을 준비 중입니다."
      fields={[
        { label: '부모 연 소득 합 (만원)', placeholder: '예: 8000' },
        { label: '자녀 연령', placeholder: '예: 7' }
      ]}
    />
  )
}

export function ChildAllowanceWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="👨‍👩‍👧"
      title="아동수당 계산기"
      hint="지급 조건·가산·소득 상한을 반영한 예상액 산출을 준비 중입니다."
      fields={[
        { label: '자녀 수', placeholder: '예: 2' },
        { label: '가구 소득 구간 (만원)', placeholder: '예: 5000' }
      ]}
    />
  )
}

export function NewbornSubsidyWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="🎁"
      title="출산지원금 계산기"
      hint="첫만남이용권·지역 출산지원 등 합산 추정을 준비 중입니다."
      fields={[
        { label: '출생 순위 (첫째/둘째…)', placeholder: '예: 첫째' },
        { label: '거주 지역 (시·도)', placeholder: '예: 서울' }
      ]}
    />
  )
}

export function MortgageWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="🏘️"
      title="주택담보대출 계산기"
      hint="LTV·금리·상환 방식·거치를 반영한 상환표 추정을 준비 중입니다."
      fields={[
        { label: '대출 원금 (만원)', placeholder: '예: 30000' },
        { label: '연이율 (%)', placeholder: '예: 4.5' },
        { label: '거치 (개월)', placeholder: '예: 0' }
      ]}
    />
  )
}

export function CreditLoanWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="💳"
      title="신용대출 이자 계산기"
      hint="한도·금리·인출액 기반 월 이자 추정을 준비 중입니다."
      fields={[
        { label: '평균 인출 잔액 (만원)', placeholder: '예: 1000' },
        { label: '약정 금리 (연 %)', placeholder: '예: 6.5' }
      ]}
    />
  )
}

export function LeaseDepositWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="🔐"
      title="전세보증금 반환 계산기"
      hint="만기일·지연이자·반환 순위를 반영한 추정을 준비 중입니다."
      fields={[
        { label: '전세 보증금 (만원)', placeholder: '예: 20000' },
        { label: '연 지연이자율 (%)', placeholder: '예: 6' }
      ]}
    />
  )
}

export function PropertyTaxWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="🏡"
      title="재산세 계산기"
      hint="과세표준·세율·감면을 반영한 지방 재산세 추정을 준비 중입니다."
      fields={[
        { label: '공시지가 합산 (만원)', placeholder: '예: 60000' },
        { label: '부동산 유형', placeholder: '주택 / 토지 / 건물' }
      ]}
    />
  )
}

export function ComprehensivePropertyWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="🏛️"
      title="종합부동산세 계산기"
      hint="공정시장가액·공제·누진·할증을 반영한 종부세 추정을 준비 중입니다."
      fields={[
        { label: '1세대 공제 전 과세 기준액 (억)', placeholder: '예: 12' },
        { label: '보유 주택 수', placeholder: '예: 2' }
      ]}
    />
  )
}

export function LocalIncomeTaxWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="🏢"
      title="지방소득세 계산기"
      hint="국세 산출세액 연동·분리과세 유형별 산출을 준비 중입니다."
      fields={[
        { label: '과세 대상 소득세 산출세액 (만원)', placeholder: '예: 500' },
        { label: '소득 유형', placeholder: '근로 / 사업 / 퇴직 등' }
      ]}
    />
  )
}

export function StampTaxWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="📜"
      title="인지세 계산기"
      hint="증서 종류·과세표준 구간별 세액 산출을 준비 중입니다."
      fields={[
        { label: '증서 유형', placeholder: '예: 매매·증여·금전소비대차' },
        { label: '과세표준 금액 (만원)', placeholder: '예: 50000' }
      ]}
    />
  )
}

export function AgeCalculatorWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="🎂"
      title="만나이 계산기"
      hint="출생일·기준일에 따른 만·세는·연 나이 표기를 준비 중입니다."
      fields={[
        { label: '생년월일', placeholder: 'YYYY-MM-DD' },
        { label: '기준일', placeholder: 'YYYY-MM-DD' }
      ]}
    />
  )
}

export function DateCalculatorWidget() {
  return (
    <PlaceholderCalcWidget
      emoji="📅"
      title="날짜 계산기 (D-Day)"
      hint="기간 차이·D-Day·영업일 옵션을 준비 중입니다."
      fields={[
        { label: '시작일', placeholder: 'YYYY-MM-DD' },
        { label: '종료일', placeholder: 'YYYY-MM-DD' }
      ]}
    />
  )
}

export const WIDGET_BY_FORMULA_TYPE = {
  military: MilitaryWidget,
  pregnancy: PregnancyWidget,
  unemployment: UnemploymentWidget,
  salary: SalaryWidget,
  insurance: InsuranceWidget,
  vat: VatWidget,
  acquisition_tax: AcquisitionTaxWidget,
  jeonse_loan: JeonseLoanWidget,
  capital_gains: CapitalGainsWidget,
  gift_tax: GiftTaxWidget,
  calorie: CalorieWidget,
  severance: SeveranceWidget,
  hourly: HourlyWidget,
  commission: CommissionWidget,
  compound: CompoundWidget,
  bmr: BmrWidget,
  freelance: FreelanceWidget,
  gpa: GpaWidget,
  'weekly-holiday': WeeklyHolidayWidget,
  overtime: OvertimeWidget,
  'night-pay': NightPayWidget,
  'income-tax': IncomeTaxWidget,
  inheritance: InheritanceWidget,
  jeonwolse: JeonwolseWidget,
  'dsr-dti': DsrDtiWidget,
  'year-end-tax': YearEndTaxWidget,
  'rental-tax': RentalTaxWidget,
  'car-tax': CarTaxWidget,
  savings: SavingsWidget,
  'stock-return': StockReturnWidget,
  maternity: MaternityWidget,
  'parental-leave': ParentalLeaveWidget,
  'loan-interest': LoanInterestWidget,
  'health-insurance': HealthInsuranceWidget,
  pension: PensionWidget,
  'employment-insurance': EmploymentInsuranceWidget,
  'minimum-wage': MinimumWageWidget,
  'annual-leave': AnnualLeaveWidget,
  alimony: AlimonyWidget,
  'child-allowance': ChildAllowanceWidget,
  'newborn-subsidy': NewbornSubsidyWidget,
  mortgage: MortgageWidget,
  'credit-loan': CreditLoanWidget,
  'lease-deposit': LeaseDepositWidget,
  'property-tax': PropertyTaxWidget,
  'comprehensive-property': ComprehensivePropertyWidget,
  'local-income-tax': LocalIncomeTaxWidget,
  'stamp-tax': StampTaxWidget,
  'age-calculator': AgeCalculatorWidget,
  'date-calculator': DateCalculatorWidget
}
