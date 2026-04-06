'use client'

import { useState } from 'react'

export default function FaqSection({ items }) {
  const [open, setOpen] = useState(() => ({}))
  if (!items?.length) return null
  return (
    <div className="faq">
      <h2>자주 묻는 질문</h2>
      {items.map((item, i) => {
        const k = `${i}`
        const isOpen = open[k]
        return (
          <div key={k} className={`fi${isOpen ? ' open' : ''}`}>
            <button
              type="button"
              className="fq"
              style={{ width: '100%', background: 'none', border: 'none', font: 'inherit', textAlign: 'left' }}
              onClick={() => setOpen((s) => ({ ...s, [k]: !s[k] }))}
            >
              {item.q}
            </button>
            <div className="fa">{item.a}</div>
          </div>
        )
      })}
    </div>
  )
}
