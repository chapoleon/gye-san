import Head from 'next/head'
import SiteFooter from '@/components/SiteFooter'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>개인정보처리방침 | 계산닷컴</title>
        <meta name="description" content="계산닷컴(gye-san.com) 개인정보처리방침입니다." />
        <link rel="canonical" href="https://gye-san.com/privacy/" />
      </Head>
      <div className="w">
        <header style={{ padding: '40px 0 20px' }}>
          <h1 style={{ fontSize: '1.5rem' }}>개인정보처리방침</h1>
        </header>
        <div className="card" style={{ marginBottom: 24 }}>
          <p style={{ color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85 }}>
            본 사이트는 계산 기능을 브라우저에서만 처리하며, 입력하신 금액·날짜 등 개인 정보를 서버로 전송하지 않습니다. 광고·분석 목적으로 쿠키 또는
            제3자(구글 애널리틱스, 애드센스 등)가 제공하는 기술이 사용될 수 있으며, 해당 서비스의 정책은 각 사업자의 안내를 따릅니다.
          </p>
        </div>
        <SiteFooter />
      </div>
    </>
  )
}
