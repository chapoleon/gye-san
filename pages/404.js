import Head from 'next/head'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'

export default function Custom404() {
  const title = '페이지를 찾을 수 없습니다 (404) | 계산닷컴'
  const url = 'https://gye-san.com/404/'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="요청하신 주소의 페이지를 찾을 수 없습니다. 계산닷컴 홈 또는 계산기 목록으로 이동해 주세요." />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href={url} />
      </Head>
      <main className="w">
        <header className="ani">
          <div className="badge">
            <span className="dot" />
            gye-san.com · 무료 온라인 계산기
          </div>
          <h1>
            <span className="ac">404</span>
          </h1>
          <p className="sub">요청하신 페이지를 찾을 수 없습니다.</p>
        </header>

        <div className="card">
          <p style={{ color: 'var(--t2)' }}>
            주소가 변경되었거나 삭제되었을 수 있습니다. 아래 메뉴에서 필요한 계산기 또는 안내 페이지로 이동해 주세요.
          </p>
          <div className="btn-row" style={{ marginTop: 14 }}>
            <Link className="btn" href="/">
              홈으로
            </Link>
            <Link className="btn btn-ghost" href="/calculators/">
              계산기 목록
            </Link>
            <Link className="btn btn-ghost" href="/guides/">
              가이드
            </Link>
          </div>
        </div>

        <SiteFooter />
      </main>
    </>
  )
}

