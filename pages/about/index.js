import Head from 'next/head'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'

const url = 'https://gye-san.com/about/'
const title = '계산닷컴 소개 | 계산닷컴 (gye-san.com)'
const desc =
  '계산닷컴(gye-san.com)은 주식회사 아이앤디디가 운영하는 무료 온라인 계산기 사이트입니다. 연봉 실수령액, 시급, 전역일 등 생활에 필요한 도구를 제공합니다.'

export default function AboutPage() {
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
          <p className="sub">사이트 목적과 운영 주체를 안내합니다.</p>
        </header>

        <article className="card" style={{ marginBottom: 24 }}>
          <p style={{ color: 'var(--t2)', fontSize: '0.95rem', lineHeight: 1.9, marginBottom: 18 }}>
            계산닷컴(gye-san.com)은 일상생활에 필요한 다양한 계산기를 무료로 제공하는 온라인 도구 사이트입니다. 연봉 실수령액, 시급 계산, 전역일 계산
            등 누구나 쉽게 사용할 수 있는 정확한 계산기를 만들고 있습니다. 방문자분께서 복잡한 세법이나 급여 규정을 일일이 찾아보지 않아도 대표적인
            가정과 공식을 바탕으로 빠르게 결과를 확인하실 수 있도록 화면을 구성하였습니다.
          </p>
          <p style={{ color: 'var(--t2)', fontSize: '0.95rem', lineHeight: 1.9, marginBottom: 18 }}>
            본 서비스는 급여·세금·부동산·금융·생활·출산육아·보험 등 폭넓은 주제의 계산기를 한곳에 모아, 검색과 이동의 번거로움을 줄이는 것을 목표로
            합니다. 각 계산기 페이지에는 해당 도구의 사용 방법과 자주 묻는 질문을 함께 수록하여, 처음 이용하시는 분들도 단계별로 따라오실 수 있도록
            돕습니다. 계산 결과는 참고용이며, 실제 신고·계약·진단 등 법적·전문적 효력이 필요한 경우에는 반드시 관계 법령과 전문가의 자문을 병행하시기
            바랍니다.
          </p>
          <p style={{ color: 'var(--t2)', fontSize: '0.95rem', lineHeight: 1.9, marginBottom: 18 }}>
            운영 주체는 주식회사 아이앤디디(INDD Inc.)입니다. 저희는 이용자의 입력 정보가 불필요하게 서버로 전송되지 않도록, 가능한 범위에서 브라우저
            기반 연산 구조를 채택하고 있습니다. 서비스 개선을 위해 접속 통계 등을 분석하는 과정에서 쿠키나 제3자 분석·광고 기술이 사용될 수 있으며,
            그에 대한 상세 내용은 개인정보처리방침에서 설명합니다. 오류 제보나 정책 관련 문의는 문의 페이지와 이메일을 통해 접수받습니다.
          </p>
          <p style={{ color: 'var(--t2)', fontSize: '0.95rem', lineHeight: 1.9, marginBottom: 18 }}>
            계산닷컴은 앞으로도 최신 세법·고용 기준의 변화를 반영하고, 이용자 경험을 개선하는 업데이트를 지속합니다. 많은 관심과 이용에 감사드리며, 더
            나은 도구가 되도록 노력하겠습니다.
          </p>
          <div className="btn-row" style={{ marginTop: 8 }}>
            <Link className="btn" href="/contact/">
              문의하기
            </Link>
            <Link className="btn btn-ghost" href="/privacy/">
              개인정보처리방침
            </Link>
            <Link className="btn btn-ghost" href="/">
              홈으로
            </Link>
          </div>
        </article>

        <SiteFooter />
      </main>
    </>
  )
}
