/**
 * 계산기 페이지 하단 SEO 본문(핵심 계산기는 CalculatorGuide 사용).
 */

export function shouldAppendSeoArticle(calc) {
  const faqJoined = (calc.faq || []).map((x) => `${x.q}${x.a}`).join('')
  return String(calc.description || '').length + faqJoined.length < 1200
}

function joinParts(parts) {
  return parts
    .filter(Boolean)
    .map((p) => String(p).replace(/\s+/g, ' ').trim())
    .join(' ')
}

export function getCalculatorSeoSections(calc) {
  const name = String(calc.name || '').trim()
  const desc = String(calc.description || '').replace(/\s+/g, ' ').trim()
  const pillar = String(calc.pillar || '일반')
  const faqJoined = (calc.faq || []).map((x) => `${x.q} ${x.a}`).join(' ')

  const h2Concept = `${name} — 사용 전에 알아두면 좋은 점`
  const pConcept = joinParts([
    desc,
    `본 페이지는「${pillar}」주제의 ${name}입니다.`,
    `입력값은 브라우저에서만 처리되며 서버로 전송되지 않습니다.`,
    `표시 수치는 참고용이며, 법령·고시·회사 규정과 다를 수 있습니다.`
  ])

  const h2Use = `입력·결과 확인 방법`
  const pUse = joinParts([
    faqJoined || `상단 계산기에 값을 입력한 뒤 계산 버튼을 눌러 결과를 확인하세요.`,
    `조건을 바꿔 여러 번 비교해 보시고, 중요한 결정 전에는 관계 기관·전문가 확인을 권장합니다.`,
    `오류 제보는 문의 페이지를 이용해 주세요.`
  ])

  const h2Note = `주의사항`
  const pNote = joinParts([
    `2026년 기준을 반영하려 노력하나, 개정·예외 규정은 반영되지 않았을 수 있습니다.`,
    `본 안내는 정보 제공 목적이며 법적 자문이 아닙니다.`
  ])

  return [
    { h2: h2Concept, body: pConcept },
    { h2: h2Use, body: pUse },
    { h2: h2Note, body: pNote }
  ]
}
