'use client'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { getCalculatorBySlug } from '@/lib/calculators'
import { POPULAR_CALCULATOR_SLUGS } from '@/lib/site'

const primaryLinks = [
  { href: '/', label: '홈' },
  { href: '/calculators/', label: '전체 계산기' },
  { href: '/guides/', label: '가이드' },
  { href: '/contact/', label: '문의' }
]

const legalLinks = [
  { href: '/privacy/', label: '개인정보처리방침' },
  { href: '/terms/', label: '이용약관' },
  { href: '/disclaimer/', label: '면책 안내' }
]

export default function Nav() {
  const { pathname } = useRouter()
  const [open, setOpen] = useState(false)
  const popular = POPULAR_CALCULATOR_SLUGS.map((slug) => getCalculatorBySlug(slug)).filter(Boolean)

  const norm = (p) => (p || '').replace(/\/$/, '') || '/'
  const isActive = (href) => norm(pathname) === norm(href)
  const close = () => setOpen(false)

  return (
    <nav className="nav" aria-label="주 메뉴">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          계산닷컴
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-panel"
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>
      <NavPanel open={open} popular={popular} isActive={isActive} close={close} />
    </nav>
  )
}

function NavPanel({ open, popular, isActive, close }) {
  return (
    <div id="nav-panel" className={`nav-panel${open ? ' open' : ''}`}>
      <div className="nav-links">
        {primaryLinks.map((l) => (
          <Link key={l.href} href={l.href} className={isActive(l.href) ? 'active' : ''} onClick={close}>
            {l.label}
          </Link>
        ))}
      </div>
      <div className="nav-popular">
        <span className="nav-popular-label">인기 계산기</span>
        {popular.map((c) => {
          const href = `/calculators/${c.slug}/`
          return (
            <Link key={c.slug} href={href} className={isActive(href) ? 'active' : ''} onClick={close}>
              {c.emoji} {c.short_name || c.name.replace(' 계산기', '')}
            </Link>
          )
        })}
      </div>
      <div className="nav-links nav-legal">
        {legalLinks.map((l) => (
          <Link key={l.href} href={l.href} className={isActive(l.href) ? 'active' : ''} onClick={close}>
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
