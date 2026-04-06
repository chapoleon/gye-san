'use client'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { calculators } from '@/lib/calculators'

const extra = [
  { href: '/', label: '🏠 홈', slug: null }
]

export default function Nav() {
  const { pathname } = useRouter()
  const calcLinks = calculators.map((c) => ({
    href: `/calculators/${c.slug}/`,
    label: `${c.emoji} ${c.name.replace(' 계산기', '')}`,
    slug: c.slug
  }))

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          계산닷컴
        </Link>
        <div className="nav-links">
          {extra.map((l) => (
            <Link key={l.href} href={l.href} className={pathname === '/' ? 'active' : ''}>
              {l.label}
            </Link>
          ))}
          {calcLinks.map((l) => {
            const norm = (p) => (p || '').replace(/\/$/, '') || '/'
            const active = norm(pathname) === norm(l.href)
            return (
              <Link key={l.href} href={l.href} className={active ? 'active' : ''}>
                {l.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
