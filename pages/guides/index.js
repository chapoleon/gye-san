import Head from 'next/head'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'
import AdSense from '@/components/AdSense'

const url = 'https://gye-san.com/guides/'
const title = '가이드 | 계산닷컴'
const desc = '계산기를 더 정확하게 쓰는 방법과 자주 묻는 질문을 정리했습니다.'

const guides = [
  {
    href: '/guides/ads-txt/',
    title: 'ads.txt 문제 해결 가이드',
    summary: '애드센스에서 ads.txt를 찾지 못할 때 점검 포인트와 정상 확인 방법을 정리했습니다.'
  },
  {
    href: '/about/',
    title: '계산닷컴 소개',
    summary: '사이트 목적, 데이터 처리 방식, 문의 방법을 안내합니다.'
  }
]

export default function GuidesIndexPage() {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
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
            <span className="ac">가이드</span>
          </h1>
          <p className="sub">정책/운영/사용법을 한 번에 정리했습니다.</p>
        </header>

        <div className="card">
          <div className="rg" style={{ marginTop: 6 }}>
            {guides.map((g) => (
              <Link key={g.href} href={g.href} className="rc">
                <span className="nm" style={{ fontWeight: 800 }}>
                  {g.title}
                </span>
                <span style={{ color: 'var(--t2)', fontSize: '.92rem' }}>{g.summary}</span>
              </Link>
            ))}
          </div>
        </div>

        <AdSense slot="1111111111" format="horizontal" />
        <SiteFooter />
      </main>
    </>
  )
}

