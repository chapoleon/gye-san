import Head from 'next/head'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'

const url = 'https://gye-san.com/contact/'
const title = '문의 | 계산닷컴'
const desc = '계산닷컴 이용 중 오류 제보, 기준 업데이트 요청, 정책 관련 문의를 접수합니다.'

export default function ContactPage() {
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
      <div className="w">
        <header className="ani">
          <div className="badge">
            <span className="dot" />
            gye-san.com · 무료 온라인 계산기
          </div>
          <h1>
            <span className="ac">문의</span>
          </h1>
          <p className="sub">오류 제보·기준 업데이트 요청</p>
        </header>

        <div className="card">
          <p style={{ color: 'var(--t2)' }}>
            아래 정보와 함께 연락 주시면 빠르게 반영하겠습니다.
          </p>
          <ul style={{ marginTop: 10, paddingLeft: 18, color: 'var(--t2)' }}>
            <li>문제가 발생한 URL</li>
            <li>어떤 값으로 입력했는지</li>
            <li>기대한 결과 vs 실제 결과</li>
            <li>기기/브라우저(가능하면)</li>
          </ul>

          <p style={{ marginTop: 14, color: 'var(--t2)' }}>
            현재는 간단한 운영 페이지로 제공되며, 연락처(이메일/폼)는 운영 환경에 맞춰 추가할 수 있습니다.
          </p>

          <div className="btn-row" style={{ marginTop: 18 }}>
            <Link className="btn" href="/guides/">
              가이드
            </Link>
            <Link className="btn btn-ghost" href="/">
              홈
            </Link>
          </div>
        </div>

        <SiteFooter />
      </div>
    </>
  )
}

