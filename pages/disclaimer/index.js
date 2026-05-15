import Head from 'next/head'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'

const url = 'https://gye-san.com/disclaimer/'
const title = '면책 안내 | 계산닷컴'
const desc =
  '계산닷컴의 모든 계산 결과는 참고용입니다. 세금·급여·보험·대출·투자 관련 중요한 결정 전 공식 기관·계약서를 확인하세요.'

export default function DisclaimerPage() {
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
        <header style={{ padding: '40px 0 20px' }}>
          <h1 style={{ fontSize: '1.5rem' }}>면책 안내</h1>
          <p className="sub" style={{ textAlign: 'left', marginTop: 8 }}>
            시행일: 2026년 5월 15일
          </p>
        </header>

        <article className="card" style={{ marginBottom: 24 }}>
          <section style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>1. 참고용 계산 결과</h2>
            <p style={{ color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85 }}>
              계산닷컴(gye-san.com)에 게시된 모든 계산기의 출력값은 이용자의 이해를 돕기 위한 추정치입니다. 법원·국세청·금융감독원·
              고용노동부·건강보험공단 등 공공기관이 확정한 금액·세액·일정과 일치한다고 보장하지 않습니다.
            </p>
          </section>

          <section style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>2. 세금·급여·보험 관련</h2>
            <p style={{ color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85 }}>
              소득세·부가세·취득세·양도세·4대보험·퇴직금·주휴수당·연차수당 등은 매년 법령·고시·회사 취업규칙·단체협약·개인 신고
              상황에 따라 달라집니다. 연말정산·확정신고·퇴직소득 신고·보험료 정산 전에는 반드시 급여 담당자, 세무사, 해당 기관 안내를
              확인하시기 바랍니다.
            </p>
          </section>

          <section style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>3. 대출·투자·금융 관련</h2>
            <p style={{ color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85 }}>
              대출 이자·상환액·DSR·복리 수익·주식 손익 등 금융 계산은 금융사 약관·금리·수수료·신용등급·규제 기준에 따라 실제와
              다를 수 있습니다. 대출 실행·투자 결정은 금융기관 상담과 계약서를 기준으로 하시기 바랍니다.
            </p>
          </section>

          <section style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>4. 의료·출산·건강 관련</h2>
            <p style={{ color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85 }}>
              임신주수·칼로리·기초대사량 등 건강·출산 관련 도구는 일반적인 참고 정보이며, 진단·치료·영양 처방을 대체하지 않습니다.
              건강 관련 판단은 의료 전문가와 상담하시기 바랍니다.
            </p>
          </section>

          <section style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>5. 운영자 책임의 한계</h2>
            <p style={{ color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85 }}>
              주식회사 아이앤디디(계산닷컴 운영)는 이용자가 본 사이트 계산 결과만을 근거로 내린 결정으로 발생한 손해에 대하여, 관련
              법령이 허용하는 범위 내에서 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다. 오류나 개선 요청은{' '}
              <Link href="/contact/">문의 페이지</Link>를 이용해 주시면 검토하겠습니다.
            </p>
          </section>

          <div className="btn-row" style={{ marginTop: 8 }}>
            <Link className="btn" href="/terms/">
              이용약관
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
