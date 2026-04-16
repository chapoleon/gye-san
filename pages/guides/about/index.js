import Head from 'next/head'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'

const url = 'https://gye-san.com/guides/about/'
const title = '가이드: 계산닷컴 소개 | 계산닷컴'
const desc =
  '계산닷컴(gye-san.com)은 2026년 기준에 맞춘 생활·급여·세금·부동산·금융 계산기를 제공하며, 입력값은 브라우저에서 처리됩니다.'

export default function AboutGuidePage() {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={url} />
        <meta property="og:locale" content="ko_KR" />
      </Head>
      <main className="w">
        <header className="ani">
          <div className="badge">
            <span className="dot" />
            gye-san.com · 무료 온라인 계산기
          </div>
          <h1>
            <span className="ac">계산닷컴</span> 소개
          </h1>
          <p className="sub">사이트 목적·데이터 처리·문의 안내</p>
        </header>

        <div className="card">
          <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>무엇을 제공하나요?</h2>
          <p style={{ color: 'var(--t2)' }}>
            계산닷컴은 급여/세금/부동산/금융/생활 영역의 계산기를 제공합니다. 각 계산기는 설명과 FAQ를 포함하며, 기준은
            해마다 업데이트합니다.
          </p>

          <h2 style={{ fontSize: '1.05rem', margin: '18px 0 10px' }}>입력값은 어떻게 처리되나요?</h2>
          <p style={{ color: 'var(--t2)' }}>
            입력값은 브라우저에서 계산되도록 설계되어 있으며, 계산을 위해 별도의 회원가입이 필요하지 않습니다.
          </p>

          <h2 style={{ fontSize: '1.05rem', margin: '18px 0 10px' }}>문의</h2>
          <p style={{ color: 'var(--t2)' }}>
            기능 오류/기준 업데이트/정책 관련 문의는 아래 페이지에서 안내드립니다.
          </p>

          <div className="btn-row" style={{ marginTop: 18 }}>
            <Link className="btn" href="/about/">
              상세 소개(/about)
            </Link>
            <Link className="btn btn-ghost" href="/contact/">
              문의하기
            </Link>
            <Link className="btn btn-ghost" href="/guides/">
              가이드 목록
            </Link>
          </div>
        </div>

        <SiteFooter />
      </main>
    </>
  )
}

