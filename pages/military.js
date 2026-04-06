import Head from 'next/head'
import Link from 'next/link'

/** 레거시 URL /military/ → 계산기 페이지 (정적 export·next dev 공통) */
export default function MilitaryLegacyRedirect() {
  const dest = '/calculators/military/'
  return (
    <>
      <Head>
        <title>군 복무 기간 계산기 · 계산</title>
        <meta httpEquiv="refresh" content={`0;url=${dest}`} />
        <link rel="canonical" href={`https://gye-san.com${dest}`} />
      </Head>
      <p style={{ padding: 24, textAlign: 'center' }}>
        <Link href={dest}>군 복무 기간 계산기</Link>로 이동합니다.
      </p>
    </>
  )
}
