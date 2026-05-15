import Head from 'next/head'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'
import { CONTACT_EMAIL } from '@/lib/site'

const url = 'https://gye-san.com/terms/'
const title = '이용약관 | 계산닷컴'
const desc = '계산닷컴(gye-san.com) 서비스 이용약관입니다. 계산 결과의 참고용 성격, 이용자 책임, 금지 행위 등을 안내합니다.'

const sections = [
  {
    h: '제1조 (목적)',
    p: '본 약관은 주식회사 아이앤디디(이하 “회사”)가 운영하는 계산닷컴(gye-san.com, 이하 “사이트”)의 이용 조건과 절차, 회사와 이용자의 권리·의무를 정함을 목적으로 합니다.'
  },
  {
    h: '제2조 (서비스의 내용)',
    p: '사이트는 급여·세금·금융·생활 등 분야의 웹 기반 계산 도구와 관련 안내 콘텐츠를 제공합니다. 회사는 서비스의 전부 또는 일부를 변경·중단할 수 있으며, 중요한 변경 시 사이트를 통해 공지합니다.'
  },
  {
    h: '제3조 (계산 결과의 성격)',
    p: '모든 계산 결과는 참고용 추정치이며, 법적·세무·의료·금융적 확정 효력이 없습니다. 실제 신고·계약·지급·진단 등은 관계 법령, 기관 고시, 금융사 약관, 회사 규정에 따릅니다. 자세한 내용은 면책 안내 페이지를 참고하세요.'
  },
  {
    h: '제4조 (이용자의 책임)',
    p: '이용자는 본인의 입력값·해석·의사결정에 대한 책임을 집니다. 계산 결과만을 근거로 중요한 법률 행위·금융 거래·고용·세무 결정을 하지 않도록 유의해야 합니다.'
  },
  {
    h: '제5조 (금지 행위)',
    p: '이용자는 다음 행위를 해서는 안 됩니다. (1) 서비스의 정상 운영을 방해하는 행위 (2) 자동화 도구를 이용한 과도한 접속·스크래핑 (3) 타인의 권리를 침해하는 행위 (4) 허위·불법 정보의 게시·전송 (5) 악성 코드 유포 (6) 광고 클릭 유도 등 부정한 수익 행위.'
  },
  {
    h: '제6조 (지식재산권)',
    p: '사이트의 디자인, 문구, 소프트웨어, 로고 등에 대한 권리는 회사 또는 정당한 권리자에게 귀속됩니다. 이용자는 회사의 사전 동의 없이 이를 복제·배포·2차 저작물로 이용할 수 없습니다.'
  },
  {
    h: '제7조 (서비스 변경·중단)',
    p: '회사는 기술적·운영상 필요에 따라 서비스를 수정·일시 중단할 수 있습니다. 천재지변, 시스템 장애 등 불가항력으로 인한 손해에 대하여 회사는 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다.'
  },
  {
    h: '제8조 (면책)',
    p: '회사는 이용자가 사이트를 이용하여 기대하는 결과를 보장하지 않습니다. 무료로 제공되는 서비스의 특성상, 법령이 허용하는 범위에서 간접·특별 손해에 대한 책임을 제한할 수 있습니다.'
  },
  {
    h: '제9조 (문의)',
    p: `약관·서비스 관련 문의는 사이트 문의 페이지 또는 ${CONTACT_EMAIL}으로 접수할 수 있습니다.`
  },
  {
    h: '제10조 (약관의 변경)',
    p: '회사는 관련 법령을 위반하지 않는 범위에서 약관을 개정할 수 있습니다. 개정 시 시행일과 개정 사유를 사이트에 공지하며, 이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단할 수 있습니다.'
  }
]

export default function Terms() {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={url} />
      </Head>
      <main className="w">
        <header style={{ padding: '40px 0 20px' }}>
          <h1 style={{ fontSize: '1.5rem' }}>이용약관</h1>
          <p className="sub" style={{ textAlign: 'left', marginTop: 8 }}>
            시행일: 2026년 5월 15일
          </p>
        </header>
        <article className="card" style={{ marginBottom: 24 }}>
          {sections.map((s) => (
            <section key={s.h} style={{ marginBottom: 22 }}>
              <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>{s.h}</h2>
              <p style={{ color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.85 }}>{s.p}</p>
            </section>
          ))}
          <p style={{ fontSize: '0.9rem', color: 'var(--t2)' }}>
            <Link href="/disclaimer/">면책 안내</Link> · <Link href="/privacy/">개인정보처리방침</Link>
          </p>
        </article>
        <SiteFooter />
      </main>
    </>
  )
}
