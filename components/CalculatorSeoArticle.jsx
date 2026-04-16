import { getCalculatorSeoSections } from '@/lib/getCalculatorSeoSections'

export default function CalculatorSeoArticle({ calc }) {
  const sections = getCalculatorSeoSections(calc)
  return (
    <article className="seo-article card" lang="ko" style={{ marginTop: 28 }}>
      {sections.map((sec, i) => (
        <section key={i} style={{ marginBottom: i < sections.length - 1 ? 22 : 0 }}>
          <h2 style={{ fontSize: '1.05rem', marginBottom: 10, color: 'var(--t1)' }}>{sec.h2}</h2>
          <p style={{ color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85, whiteSpace: 'pre-wrap' }}>{sec.body}</p>
        </section>
      ))}
    </article>
  )
}
