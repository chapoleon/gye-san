import Head from 'next/head'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'
import { calculators } from '@/lib/calculators'
import { isPlaceholderSlug } from '@/lib/site'

const url = 'https://gye-san.com/calculators/'
const title = '전체 계산기 목록 | 계산닷컴'
const desc =
  '실수령액, 퇴직금, 4대보험, 부가세, 시급, 전역일 등 계산닷컴에서 제공하는 계산기를 카테고리별로 찾아보세요.'

export default function CalculatorsIndexPage() {
  const sorted = [...calculators].sort((a, b) => String(a.name).localeCompare(String(b.name), 'ko'))

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
            <span className="ac">전체 계산기</span>
          </h1>
          <p className="sub">카테고리별 무료 계산기를 선택하세요</p>
          <p className="muted" style={{ marginTop: 10, fontSize: '.92rem' }}>
            <Link href="/">홈으로</Link>
          </p>
        </header>

        <div className="calc-grid" aria-label="전체 계산기 목록">
          {sorted.map((c) => (
            <Link key={c.slug} href={`/calculators/${c.slug}/`} className="calc-card">
              <div className="row">
                <span className="ic">{c.icon ?? c.emoji}</span>
                <span className="nm">{c.short_name ?? c.name}</span>
              </div>
            </Link>
          ))}
        </div>

        <SiteFooter />
      </main>
    </>
  )
}
