import Head from 'next/head'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'
import ContactForm from '@/components/ContactForm'

const url = 'https://gye-san.com/contact/'
const title = '문의 | 계산닷컴'
const desc = '계산닷컴 이용 중 오류 제보, 기준 업데이트 요청, 정책 관련 문의를 접수합니다. 운영: 주식회사 아이앤디디.'

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
            gye-san.com · 무료 온라인 계산기
          </div>
          <h1>
            <span className="ac">문의</span>
          </h1>
          <p className="sub">오류 제보·기준 업데이트 요청</p>
        </header>

        <article className="card">
          <p style={{ color: 'var(--t2)', lineHeight: 1.85 }}>
            <strong>운영사:</strong> 주식회사 아이앤디디(INDD Inc.)
          </p>
          <p style={{ color: 'var(--t2)', marginTop: 10, lineHeight: 1.85 }}>
            <strong>이메일:</strong>{' '}
            <a href="mailto:support@gye-san.com">support@gye-san.com</a>
          </p>
          <p style={{ color: 'var(--t2)', marginTop: 14, lineHeight: 1.85 }}>
            아래 양식은 UI 예시이며, 실제 전송은 연결되어 있지 않습니다. 문의는 위 이메일로 보내 주시거나, 아래 항목을 참고하여 메일 본문에 포함해
            주시면 원활히 처리됩니다.
          </p>
          <ul style={{ marginTop: 10, paddingLeft: 18, color: 'var(--t2)' }}>
            <li>문제가 발생한 URL</li>
            <li>어떤 값으로 입력했는지</li>
            <li>기대한 결과와 실제 결과</li>
            <li>기기 및 브라우저(가능하면)</li>
          </ul>

          <ContactForm />

          <div className="btn-row" style={{ marginTop: 18 }}>
            <Link className="btn" href="/guides/">
              가이드
            </Link>
            <Link className="btn btn-ghost" href="/about/">
              소개
            </Link>
            <Link className="btn btn-ghost" href="/">
              홈
            </Link>
          </div>
        </article>

        <SiteFooter />
      </main>
    </>
  )
}
