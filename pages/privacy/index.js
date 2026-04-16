import Head from 'next/head'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'

const url = 'https://gye-san.com/privacy/'
const title = '개인정보처리방침 | 계산닷컴'
const desc =
  '계산닷컴(gye-san.com)의 개인정보 처리방침, 쿠키·Google Analytics·Google AdSense 관련 안내, 개인정보 보호책임자(주식회사 아이앤디디) 정보를 제공합니다.'

export default function Privacy() {
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
          <h1 style={{ fontSize: '1.5rem' }}>개인정보처리방침</h1>
          <p className="sub" style={{ textAlign: 'left', marginTop: 8 }}>
            시행일: 2026년 4월 16일
          </p>
        </header>

        <article className="card" style={{ marginBottom: 24 }}>
          <section style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>제1조 (목적)</h2>
            <p style={{ color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85 }}>
              주식회사 아이앤디디(이하 ‘회사’)가 운영하는 계산닷컴(gye-san.com, 이하 ‘사이트’)은 이용자의 개인정보를 중요시하며,
              「개인정보 보호법」 등 관련 법령을 준수합니다. 본 방침은 이용자께서 사이트를 이용하실 때 회사가 개인정보를 어떠한 목적과 방식으로
              처리하는지, 그리고 이용자께서 어떠한 권리를 가지시는지를 알려 드리기 위하여 마련되었습니다.
            </p>
          </section>

          <section style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>제2조 (처리하는 개인정보 항목 및 방법)</h2>
            <p style={{ color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85 }}>
              사이트의 핵심 계산 기능은 이용자의 웹 브라우저에서 입력값을 연산하도록 설계되어 있으며, 금액·날짜 등 계산에 사용된 값이 회사의 서버에
              저장되거나 회사가 이를 열람하는 구조가 아닙니다. 다만, 서비스 운영·통계·보안·광고 게재를 위해 접속 로그, 기기·브라우저 정보, IP 주소
              등이 자동으로 생성·수집될 수 있으며, 문의 메일을 보내실 경우 이메일 주소와 문의 내용이 전달될 수 있습니다. 회원가입을 요구하지 않는
              서비스 특성상, 이용자께서 직접 입력하지 않는 한 별도의 식별 정보를 적극적으로 수집하지 않습니다.
            </p>
          </section>

          <section style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>제3조 (쿠키, Google Analytics, Google AdSense)</h2>
            <p style={{ color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85 }}>
              회사는 사이트 이용 현황을 파악하고 서비스 품질을 개선하기 위해 Google LLC가 제공하는 Google Analytics를 사용할 수 있습니다. Google
              Analytics는 쿠키를 통해 비식별 형태의 접속 정보(예: 페이지 조회, 체류 시간, 유입 경로 등)를 수집할 수 있으며, 그 처리에 관한 사항은
              Google의 개인정보처리방침을 따릅니다. 또한 사이트에는 Google AdSense 등 표시 광고가 게재될 수 있으며, 맞춤형 광고 제공을 위해 광고
              사업자가 쿠키 또는 모바일 광고 식별자 등을 사용할 수 있습니다. 이용자께서는 브라우저 설정에서 쿠키 저장을 거부하거나 삭제하실 수
              있으나, 이 경우 일부 기능이나 광고 표시 방식에 제한이 생길 수 있습니다. 쿠키에 대한 자세한 거부 방법은 브라우저 제조사의 안내를 참고하여
              주시기 바랍니다.
            </p>
          </section>

          <section style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>제4조 (개인정보의 처리 목적)</h2>
            <p style={{ color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85 }}>
              회사는 수집된 정보를 다음의 목적 범위 내에서만 처리합니다. 서비스 제공 및 품질 개선, 이용 통계 분석, 부정 이용 방지, 법령상 의무 이행,
              분쟁 대응, 광고 수익화를 통한 서비스 지속 운영 등입니다. 목적 외의 용도로는 사용하지 않으며, 목적이 변경되는 경우에는 사전에 고지하고
              필요한 동의 절차를 거치겠습니다.
            </p>
          </section>

          <section style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>제5조 (보유 및 이용 기간, 파기)</h2>
            <p style={{ color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85 }}>
              법령에 특별한 규정이 있는 경우를 제외하고, 수집 목적이 달성된 후에는 지체 없이 파기합니다. 다만 분쟁 해결·법령 준수를 위해 일정 기간 보관이
              필요한 경우에는 해당 기간 동안만 보관합니다. 전자적 파일 형태는 복구가 불가능한 방법으로 삭제하며, 출력물 등은 분쇄 또는 소각 등의
              방법으로 파기합니다.
            </p>
          </section>

          <section style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>제6조 (이용자의 권리)</h2>
            <p style={{ color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85 }}>
              이용자께서는 개인정보 열람·정정·삭제·처리 정지 등을 요구하실 수 있으며, 회사는 지체 없이 필요한 조치를 하겠습니다. 권리 행사는 개인정보
              보호책임자에게 서면·전자우편 등으로 요청하실 수 있으며, 회사는 본인 확인 절차를 거친 뒤에 조치합니다. 이용자의 법정대리인이나 위임을 받은
              자 등 대리인을 통하여 요청하실 수도 있습니다.
            </p>
          </section>

          <section style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>제7조 (개인정보 보호책임자)</h2>
            <p style={{ color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85 }}>
              회사는 개인정보 처리에 관한 업무를 총괄하여 책임지고, 이용자의 불만 처리 및 피해 구제를 위하여 아래와 같이 개인정보 보호책임자를
              지정합니다. 책임자: 주식회사 아이앤디디. 문의는 사이트의{' '}
              <Link href="/contact/">문의 페이지</Link> 또는 운영 이메일을 이용하여 주시기 바랍니다.
            </p>
          </section>

          <section style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>제8조 (개인정보의 안전성 확보 조치)</h2>
            <p style={{ color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85 }}>
              회사는 개인정보의 분실·도난·유출·변조 또는 훼손을 방지하기 위하여 관리적·기술적·물리적 보호조치를 취합니다. 내부 관리계획 수립, 접근
              권한 최소화, 보안 점검 등을 통해 안전성을 유지하도록 노력합니다.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>제9조 (고지의 의무)</h2>
            <p style={{ color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85 }}>
              본 개인정보처리방침의 내용이 추가·삭제 또는 수정되는 경우 개정 최소 7일 전에 사이트 공지 등을 통해 고지하겠습니다. 중요한 변경이 있는
              경우에는 그 기간을 연장하여 안내할 수 있습니다.
            </p>
          </section>
        </article>

        <SiteFooter />
      </main>
    </>
  )
}
