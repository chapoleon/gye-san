import Head from 'next/head'
import SiteFooter from '@/components/SiteFooter'

export default function Terms() {
  return (
    <>
      <Head>
        <title>이용약관 | 계산닷컴</title>
        <meta name="description" content="계산닷컴(gye-san.com) 이용약관입니다." />
        <link rel="canonical" href="https://gye-san.com/terms/" />
      </Head>
      <div className="w">
        <header style={{ padding: '40px 0 20px' }}>
          <h1 style={{ fontSize: '1.5rem' }}>이용약관</h1>
        </header>
        <div className="card" style={{ marginBottom: 24 }}>
          <p style={{ color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85 }}>
            본 사이트의 계산 결과는 참고용이며 법적·세무·의료적 효력이 없습니다. 실제 신고·계약·진단 전 반드시 전문가에게 확인하시기 바랍니다. 사이트
            이용 중 발생한 손해에 대해 운영자는 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다.
          </p>
        </div>
        <SiteFooter />
      </div>
    </>
  )
}
