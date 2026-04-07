import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'
import AdSense from '@/components/AdSense'
import { calculators } from '@/lib/calculators'

export default function Home() {
  const title = '계산 — 한국인을 위한 계산기 | 계산닷컴'
  const desc =
    '한국인을 위한 무료 온라인 계산기. 퇴직금, 실수령액, 실업급여, 4대보험, 부가세, 취득세, 양도세, 증여세 등 2026년 최신 기준 반영. 무료 자동계산.'

  const tabs = ['전체', '급여', '세금', '부동산', '금융', '생활', '출산육아', '보험']
  const [active, setActive] = React.useState('전체')

  const featuredMeta = {
    salary: { vol: '월간 검색수 120만+' },
    severance: { vol: '월간 검색수 80만+' },
    insurance: { vol: '월간 검색수 60만+' }
  }

  const featured = calculators.filter((c) => c.featured).slice(0, 3)
  const rest = calculators.filter((c) => !c.featured)
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
      <div className="w">
        <header className="hero ani">
          <div className="badge">
            <span className="dot" />
            gye-san.com · 무료 온라인 계산기
          </div>
          <h1>
            <span className="ac">계산</span>
          </h1>
          <p className="sub">한국인을 위한 계산기 · 2026년 최신 기준 반영</p>
          <p className="muted" style={{ marginTop: 10, fontSize: '.92rem' }}>
            퇴직금·실수령액·4대보험부터 세금/부동산/금융까지, 필요한 계산을 빠르게 찾아보세요.
          </p>
        </header>

        <div className="section-title">베스트 3 계산기</div>
        <div className="featured-grid">
          {featured.map((c) => (
            <Link key={c.slug} href={`/calculators/${c.slug}/`} className="card-lg">
              <div className="card-lg-top">
                <div className="card-lg-ico">{c.icon ?? c.emoji}</div>
                <div className="card-lg-vol">{featuredMeta[c.slug]?.vol ?? '월간 검색수 —'}</div>
              </div>
              <h3>{c.name}</h3>
              <p>{c.short_description ?? c.description}</p>
              <div className="card-lg-cta">바로 계산하기 →</div>
            </Link>
          ))}
        </div>

        <a className="bn-img" href="https://smartstore.naver.com/ondasoop" target="_blank" rel="noopener noreferrer">
          <img src="/img/ondasoop.png" alt="온다숲" />
          <div className="bn-tag">BEST</div>
          <div className="bn-ov">
            <h3>천연 고체 탈취제, 온다숲</h3>
            <p>화학성분 없이 자연 원료로 만든 프리미엄 고체 탈취제</p>
          </div>
        </a>

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
                <span className="nm">{c.name}</span>
              </div>
              <div className="ds">{c.short_description ?? c.description}</div>
            </Link>
          ))}
        </div>

        <AdSense slot="1111111111" format="horizontal" />
        <div className="cta-bottom">
          <span>💡 더 많은 무료 계산기는 계산닷컴에서</span>
        </div>
        <SiteFooter />
      </div>
    </>
  )
}
