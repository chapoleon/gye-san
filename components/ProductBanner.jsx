import React from 'react'

const PRODUCT = {
  ondasoop: {
    name: '온다숲',
    href: 'https://smartstore.naver.com/ondasoop',
    img: '/img/ondasoop.png',
    theme: 'ondasoop'
  },
  bugx: {
    name: '버그엑스',
    href: 'https://smartstore.naver.com/bugx',
    img: '/img/bugx.png',
    theme: 'bugx'
  }
}

export default function ProductBanner({ banner }) {
  if (!banner) return null
  const p = PRODUCT[banner.product]
  if (!p) return null

  return (
    <div className={`product-banner ${p.theme}`}>
      <a href={p.href} target="_blank" rel="noopener noreferrer">
        <img className="pb-img" src={p.img} alt={p.name} />
        <div className="pb-copy">
          <h3>{p.name}</h3>
          <p>{banner.message}</p>
        </div>
        <span className="pb-btn">자세히 보기 →</span>
      </a>
    </div>
  )
}

