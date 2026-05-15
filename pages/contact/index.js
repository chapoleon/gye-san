import Head from 'next/head'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'
import ContactForm from '@/components/ContactForm'
import { CONTACT_EMAIL } from '@/lib/site'

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
      <main className="w">
        <header className="ani">
          <div className="badge">
            <span className="dot" />
            gye-san.com
          </div>
          <h1>
            <span className="ac">문의</span>
          </h1>
          <p className="sub">오류 제보·기준 업데이트 요청</p>
        </header>

        <article className="card">
          <p style={{ color: 'var(--t2)', lineHeight: 1.85 }}>
            <strong>운영:</strong> 주식회사 아이앤디디(INDD Inc.)
          </p>
          <p style={{ color: 'var(--t2)', marginTop: 10, lineHeight: 1.85 }}>
            <strong>이메일:</strong>{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
          <p style={{ color: 'var(--t2)', marginTop: 14, lineHeight: 1.85 }}>
            계산 오류, 표시 문제, 개인정보·광고 관련 문의를 보내 주세요. 아래 양식을 작성한 뒤 제출하시면 메일 앱이 열립니다. 문제가
            발생한 URL, 입력값, 기대한 결과와 실제 결과를 함께 적어 주시면 처리에 도움이 됩니다.
          </p>

          <ContactForm />

          <div className="btn-row" style={{ marginTop: 18 }}>
            <Link className="btn" href="/guides/">가이드</Link>
            <Link className="btn btn-ghost" href="/about/">소개</Link>
            <Link className="btn btn-ghost" href="/">홈</Link>
          </div>
        </article>

        <SiteFooter />
      </main>
    </>
  )
}