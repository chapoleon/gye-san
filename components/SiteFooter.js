import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer>
      <p>&copy; 2026 gye-san.com · 모든 처리는 브라우저에서 이루어지며 서버로 데이터가 전송되지 않습니다.</p>
      <p style={{ marginTop: 4 }}>
        <Link href="/privacy/">개인정보처리방침</Link> · <Link href="/terms/">이용약관</Link>
      </p>
    </footer>
  )
}
