import Head from 'next/head'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'
import AdSense from '@/components/AdSense'
import { calculators } from '@/lib/calculators'

export default function Home() {
  const title = '계산 — 한국인을 위한 계산기 | 계산닷컴'
  const desc =
    '한국인을 위한 무료 온라인 계산기. 퇴직금, 실수령액, 실업급여, 4대보험, 부가세, 취득세, 양도세, 증여세 등 2026년 최신 기준 반영. 무료 자동계산.'

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
        <header className="ani">
          <div className="badge">
            <span className="dot" />
            gye-san.com · 무료 온라인 계산기
          </div>
          <h1>
            <span className="ac">계산</span>
          </h1>
          <p className="sub">한국인을 위한 계산기 · 2026년 최신 기준 반영</p>
        </header>
        <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--t3)', marginBottom: 8, fontWeight: 600 }}>
          전체 계산기
        </p>
        <div className="rel" style={{ marginTop: 0 }}>
          <div className="rg">
            {calculators.map((c) => (
              <Link key={c.slug} href={`/calculators/${c.slug}/`} className="rc">
                <span className="ico">{c.emoji}</span>
                <span className="nm">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <a
          className="bn-img"
          href="https://www.ondasoop.com/product/detail.html?product_no=644&cate_no=76&display_group=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/img/ondasoop.png" alt="온다숲 고체 탈취제" />
          <div className="bn-tag">BEST</div>
          <div className="bn-ov">
            <h3>매일 120만 명이 찾는 사이트가 추천하는 생활용품</h3>
            <p>천연 성분 프리미엄 탈취제 · 방향제 — 온다숲</p>
          </div>
        </a>
        <AdSense slot="1111111111" format="horizontal" />
        <div className="cta-bottom">
          <span>💡 더 많은 무료 계산기는 계산닷컴에서</span>
        </div>
        <SiteFooter />
      </div>
    </>
  )
}
