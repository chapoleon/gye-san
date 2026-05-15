import Link from 'next/link'

export default function CalculatorGuide({ calc, content }) {
  if (!content) return null

  const faqMerged = [...(calc.faq || []), ...(content.extraFaq || [])]

  return (
    <article className="seo-article card" lang="ko" style={{ marginTop: 28 }}>
      <p style={{ fontSize: '0.82rem', color: 'var(--t3)', marginBottom: 16 }}>
        마지막 업데이트: {content.lastUpdated} · 계산 결과는 참고용이며 실제 금액·세액과 다를 수 있습니다.
      </p>

      <section style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>이 계산기가 필요한 상황</h2>
        <p style={{ color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85 }}>{content.intro}</p>
      </section>

      <section style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>입력값 안내</h2>
        <p style={{ color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85 }}>{content.inputs}</p>
      </section>

      <section style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>계산 방식 (요약)</h2>
        <p style={{ color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85 }}>{content.method}</p>
      </section>

      {content.examples?.length > 0 ? (
        <section style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>계산 예시</h2>
          <ul style={{ paddingLeft: 18, color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85 }}>
            {content.examples.map((ex) => (
              <li key={ex.label} style={{ marginBottom: 8 }}>
                <strong>{ex.label}:</strong> {ex.text}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>결과 해석</h2>
        <p style={{ color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85 }}>{content.interpret}</p>
      </section>

      {content.pitfalls?.length > 0 ? (
        <section style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>자주 틀리는 입력</h2>
          <ul style={{ paddingLeft: 18, color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85 }}>
            {content.pitfalls.map((p) => (
              <li key={p} style={{ marginBottom: 6 }}>
                {p}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>주의사항</h2>
        <p style={{ color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85 }}>{content.cautions}</p>
      </section>

      {faqMerged.length >= 5 ? (
        <section style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>자주 묻는 질문</h2>
          {faqMerged.map((item) => (
            <details key={item.q} className="fi" style={{ borderBottom: '1px solid var(--bd)', padding: '12px 0' }}>
              <summary className="fq" style={{ listStyle: 'none', cursor: 'pointer', fontWeight: 700 }}>
                {item.q}
              </summary>
              <p style={{ paddingTop: 8, color: 'var(--t2)', fontSize: '0.88rem', lineHeight: 1.7 }}>{item.a}</p>
            </details>
          ))}
        </section>
      ) : null}

      <p style={{ fontSize: '0.88rem', color: 'var(--t3)', lineHeight: 1.7 }}>
        <Link href="/disclaimer/">면책 안내</Link> · <Link href="/contact/">오류 제보</Link>
      </p>
    </article>
  )
}
