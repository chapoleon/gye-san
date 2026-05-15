import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'
import { calculators } from '@/lib/calculators'
import { isPlaceholderSlug } from '@/lib/site'

export default function Home() {
  const title = '계산닷컴 | 연봉·세금·급여 무료 계산기'
  const desc =
    '실수령액, 퇴직금, 4대보험, 부가세, 시급 등 생활에 필요한 계산기를 브라우저에서 바로 이용하세요. 입력값은 서버로 전송되지 않으며, 결과는 참고용입니다.'

  const tabs = ['전체', '급여', '세금', '부동산', '금융', '생활', '출산육아', '보험']
  const [active, setActive] = React.useState('전체')

  const featured = calculators.filter((c) => c.featured).slice(0, 3)
  const rest = calculators.filter((c) => !c.featured && !isPlaceholderSlug(c.slug))
  const filtered = (active === '전체' ? rest : rest.filter((c) => c.category === active)).sort((a, b) =>
    String(a.name).localeCompare(String(b.name), 'ko')
  )

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href="https://gye-san.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content="https://gye-san.com/" />
        <meta property="og:locale" content="ko_KR" />
      </Head>
      <main className="w">
        <header className="hero ani">
          <div className="badge">
            <span className="dot" />
            gye-san.com · 계산닷컴
          </div>
          <h1>
            <span className="ac">계산닷컴</span>
          </h1>
          <p className="sub">급여·세금·금융·생활 계산을 한곳에서</p>
          <p className="muted" style={{ marginTop: 10, fontSize: '.92rem' }}>
            퇴직금·실수령액·4대보험부터 세금·부동산·금융까지, 필요한 계산을 빠르게 찾아보세요.
          </p>
        </header>

        <div className="section-title">인기 계산기</div>
        <div className="featured-grid">
          {featured.map((c) => (
            <Link key={c.slug} href={`/calculators/${c.slug}/`} className="card-lg">
              <div className="card-lg-top">
                <div className="card-lg-ico">{c.icon ?? c.emoji}</div>
                <div className="card-lg-vol">{c.pillar}</div>
              </div>
              <h3>{c.name}</h3>
              <p>{c.short_description ?? c.description}</p>
              <div className="card-lg-cta">바로 계산하기 →</div>
            </Link>
          ))}
        </div>

        <div className="section-title">카테고리</div>
        <div className="tabs" role="tablist" aria-label="카테고리 탭">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              className={`tab ${active === t ? 'active' : ''}`}
              onClick={() => setActive(t)}
              role="tab"
              aria-selected={active === t}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="calc-grid" aria-label="계산기 목록">
          {filtered.map((c) => (
            <Link key={c.slug} href={`/calculators/${c.slug}/`} className="calc-card">
              <div className="row">
                <span className="ic">{c.icon ?? c.emoji}</span>
                <span className="nm">{c.short_name ?? c.name}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="info-section">
          <h2>계산닷컴이란?</h2>
          <p>
            계산닷컴은 일상에서 필요한 금액·일정·세금을 빠르게 추정할 수 있는 웹 계산 도구 모음입니다. 복잡한 규정을
            한눈에 정리하고, 브라우저에서만 연산해 개인정보 노출을 줄였습니다.
          </p>
          <p>
            <Link href="/about/">소개</Link> · <Link href="/contact/">문의</Link> · <Link href="/privacy/">개인정보처리방침</Link> ·{' '}
            <Link href="/disclaimer/">면책 안내</Link>
          </p>
        </div>

        <div className="cta-bottom">
          <Link href="/calculators/">전체 계산기 보기</Link>
        </div>
        <SiteFooter />
      </main>
    </>
  )
}
