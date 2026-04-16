/**
 * 계산기 페이지 하단 SEO 본문(3개의 H2 섹션).
 * description·FAQ·pillar 등을 반영하며, 각 본문은 최소 글자 수를 충족하도록 보강합니다.
 */

/** 설명+FAQ 합계가 이미 충분히 긴 경우 하단 SEO 블록을 생략합니다. */
export function shouldAppendSeoArticle(calc) {
  const faqJoined = (calc.faq || []).map((x) => `${x.q}${x.a}`).join('')
  return String(calc.description || '').length + faqJoined.length < 1500
}

function joinParts(parts) {
  return parts
    .filter(Boolean)
    .map((p) => String(p).replace(/\s+/g, ' ').trim())
    .join(' ')
}

function ensureMinLength(text, minLen) {
  let s = text.replace(/\s+/g, ' ').trim()
  const tail = [
    ' 계산닷컴은 이용자 편의를 위해 문의 페이지를 통해 오류 제보와 기준 업데이트 요청을 받고 있습니다.',
    ' 동일 조건을 여러 번 바꾸어 입력하여 시나리오를 비교하실 때에도 모든 연산은 브라우저에서만 이루어집니다.',
    ' 인쇄·캡처로 공유하실 때에는 개인 식별 정보가 포함되지 않도록 주의하여 주시기 바랍니다.',
    ' 본 안내는 서비스 품질 향상을 위해 수시로 다듬을 수 있습니다.',
    ' 중요한 법률 행위·금융 거래·세무 신고 전에는 반드시 공신력 있는 자료와 전문가 자문을 병행하시기 바랍니다.'
  ]
  let i = 0
  while (s.length < minLen && i < tail.length) {
    s += tail[i]
    i += 1
  }
  while (s.length < minLen) {
    s += ' 결과는 참고용 추정치이며 법적 확정력을 갖지 않습니다.'
  }
  return s
}

export function getCalculatorSeoSections(calc) {
  const name = String(calc.name || '').trim()
  const desc = String(calc.description || '').replace(/\s+/g, ' ').trim()
  const pillar = String(calc.pillar || '일반')
  const kw = (calc.related_keywords || []).filter(Boolean).join('·')
  const faqJoined = (calc.faq || []).map((x) => `${x.q} ${x.a}`).join(' ')

  const h2Concept = `${name}의 기본 개념과 본 페이지에서 확인하실 수 있는 내용`
  const pConcept = ensureMinLength(
    joinParts([
      `${name}은(는) 계산닷컴(gye-san.com)에서 무료로 제공하는 웹 기반 계산 도구입니다.`,
      desc,
      `본 도구는「${pillar}」주제에 속하는 상황을 가정하여 입력값을 바탕으로 결과를 산출합니다.`,
      kw ? `이용자분들께서는 ${kw} 등의 키워드로 본 페이지를 찾아오시는 경우가 많습니다.` : '',
      `회원 가입이나 별도 앱 설치 없이 브라우저만으로 이용하실 수 있으며, 입력하신 값은 서버로 전송하지 않고 기기 내에서만 처리합니다.`,
      `따라서 공공장소에서 이용하실 때에도 네트워크를 통한 개인 금액 정보 유출 위험을 낮출 수 있습니다.`,
      `다만 화면에 표시되는 수치는 참고용 추정치이며, 법원·국세청·금융기관 등이 인정하는 공식 산출 결과와 다를 수 있습니다.`
    ]),
    500
  )

  const h2Year = `2026년 기준 최신 제도·요율과 본 계산기의 반영 한계`
  const pYear = ensureMinLength(
    joinParts([
      `2026년에도 급여·세금·부동산·금융·보험 분야의 법령과 고시는 개정될 수 있으며, 지자체 조례와 금융권 내부 심사 기준은 기관별로 달라질 수 있습니다.`,
      `계산닷컴은 대표적인 요율·한도·세율을 반영하기 위해 정기적으로 로직과 설명 문구를 점검하고 있습니다.`,
      `${name}의 산출식은 일반적인 해석과 공개된 기준을 따르지만, 포괄임금제·탄력근로·세액공제 한도·분리과세·비과세 특례 등 예외 규정은 단순화되어 있을 수 있습니다.`,
      `동일한 명칭의 수당이라도 사용자의 회사 취업규칙·단체협약에 따라 실제 급여명세서와 차이가 발생할 수 있으니 반드시 회사 안내를 우선하시기 바랍니다.`,
      `세무·법률·의료·군 복무 일정 등 행정 확정이 필요한 사항은 본 도구만으로 판단하지 마시고, 관계 기관의 공지와 자격을 갖춘 전문가의 확인을 거치시기 바랍니다.`
    ]),
    500
  )

  const h2Faq = `자주 묻는 질문과 실제 업무·생활에서의 활용 방법`
  const pFaq = ensureMinLength(
    joinParts([
      faqJoined ||
        `${name} 상단의 안내 문구를 먼저 읽으신 뒤, 대표적인 입력 예시를 바탕으로 값을 바꾸어 가며 여러 번 시뮬레이션해 보시기 바랍니다.`,
      `자주 묻는 질문 섹션에서는 준비 단계에서 혼동되기 쉬운 요점을 질문과 답 형식으로 정리하였습니다.`,
      `출력된 금액·일수·비율을 메모하여 급여 담당자·세무사·은행 대출 상담 창구 등에 질의하실 때 참고 자료로 활용하실 수 있습니다.`,
      `조건이 복잡한 경우에는 입력 항목을 나누어 단계별로 검증하시고, 이전에 산출된 값과 비교하여 이상 여부를 확인하시기 바랍니다.`,
      `기능 오류나 최신 기준 반영 요청은 문의 페이지를 통해 알려 주시면 내부 검토 후 반영 여부를 판단하겠습니다.`
    ]),
    500
  )

  return [
    { h2: h2Concept, body: pConcept },
    { h2: h2Year, body: pYear },
    { h2: h2Faq, body: pFaq }
  ]
}
