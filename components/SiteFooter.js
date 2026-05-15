import Link from 'next/link'
import { CONTACT_EMAIL, SITE_NAME } from '@/lib/site'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <p className="site-footer-brand">
        <strong>{SITE_NAME}</strong>은 급여·세금·금융·생활에 필요한 계산기를 브라우저에서 바로 이용할 수 있도록 제공합니다. 입력값은
        서버로 전송하지 않고 기기에서만 처리됩니다.
      </p>
      <p className="site-footer-email">
        문의: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <p className="site-footer-links">
        <Link href="/about/">소개</Link>
        {' · '}
        <Link href="/contact/">문의</Link>
        {' · '}
        <Link href="/privacy/">개인정보처리방침</Link>
        {' · '}
        <Link href="/terms/">이용약관</Link>
        {' · '}
        <Link href="/disclaimer/">면책 안내</Link>
        {' · '}
        <Link href="/guides/">가이드</Link>
      </p>
      <p className="site-footer-copy">&copy; {new Date().getFullYear()} gye-san.com</p>
    </footer>
  )
}
