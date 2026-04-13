import Head from 'next/head'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'

const url = 'https://gye-san.com/guides/ads-txt/'
const title = 'ads.txt 문제 해결 가이드 | 계산닷컴'
const desc = '애드센스에서 ads.txt를 찾을 수 없다고 표시될 때 확인해야 할 체크리스트를 정리했습니다.'

export default function AdsTxtGuidePage() {
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
      <div className="w">
        <header className="ani">
          <div className="badge">
            <span className="dot" />
            gye-san.com · 무료 온라인 계산기
          </div>
          <h1>
            <span className="ac">ads.txt</span> 문제 해결
          </h1>
          <p className="sub">“찾을 수 없음” 경고가 지속될 때의 점검 목록</p>
        </header>

        <div className="card">
          <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>1) URL이 정확히 루트인지 확인</h2>
          <p style={{ color: 'var(--t2)' }}>
            ads.txt는 반드시 루트에 있어야 합니다. 예: <strong>https://gye-san.com/ads.txt</strong>
          </p>

          <h2 style={{ fontSize: '1.05rem', margin: '18px 0 10px' }}>2) 내용에 게시자 ID(pub-...)가 포함돼 있는지</h2>
          <p style={{ color: 'var(--t2)' }}>
            애드센스에서 제공한 한 줄을 그대로 넣으셔야 합니다. 대소문자/쉼표/공백이 바뀌면 검증이 실패할 수 있습니다.
          </p>

          <h2 style={{ fontSize: '1.05rem', margin: '18px 0 10px' }}>3) “도메인 정규화” 확인</h2>
          <p style={{ color: 'var(--t2)' }}>
            애드센스에 <code>gye-san.com</code>으로 등록했는데 실제 트래픽이 <code>www.gye-san.com</code>으로 들어오거나,
            반대로 등록 도메인과 실제 접속 도메인이 다르면 “찾을 수 없음”이 오래 지속되는 경우가 있습니다.
          </p>

          <h2 style={{ fontSize: '1.05rem', margin: '18px 0 10px' }}>4) 반영 시간</h2>
          <p style={{ color: 'var(--t2)' }}>
            애드센스가 ads.txt를 재크롤링하는 데는 보통 수일이 걸릴 수 있고, 트래픽이 적으면 더 오래 걸릴 수 있습니다.
          </p>

          <div className="btn-row" style={{ marginTop: 18 }}>
            <Link className="btn" href="/guides/">
              가이드 목록
            </Link>
            <Link className="btn btn-ghost" href="/contact/">
              문의
            </Link>
          </div>
        </div>

        <SiteFooter />
      </div>
    </>
  )
}

