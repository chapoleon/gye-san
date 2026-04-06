'use client'

import { WIDGET_BY_FORMULA_TYPE } from '@/components/calculator-widgets'

export default function CalculatorBody({ formulaType }) {
  const W = WIDGET_BY_FORMULA_TYPE[formulaType]
  if (!W) {
    return (
      <main className="card ani d2">
        <p>이 계산기 위젯은 아직 연결되지 않았습니다. formula_type을 확인해 주세요.</p>
      </main>
    )
  }
  return <W />
}
