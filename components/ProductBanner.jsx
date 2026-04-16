const PRODUCT = {
  ondasoop: {
    name: '온다숲',
    href: 'https://smartstore.naver.com/ondasoop',
    img: '/img/ondasoop.png',
    overlayTitle: '천연 고체 탈취제, 온다숲',
    overlaySubtitle: '화학성분 없이 자연 원료로 만든 프리미엄 고체 탈취제'
  },
  bugx: {
    name: '버그엑스',
    href: 'https://smartstore.naver.com/bugx',
    img: '/img/bugx.png',
    overlayTitle: '프리미엄 해충 방제, 버그엑스',
    overlaySubtitle: null
  }
}

/**
 * AdSense 승인 전: 외부 스토어(온다숲·버그엑스 등) 링크 배너를 표시하지 않습니다.
 * 승인 후 재활성화 시 아래 주석 블록의 JSX를 return에 되돌리시기 바랍니다.
 */
export default function ProductBanner({ banner }) {
  void banner
  void PRODUCT
  return null
}

/* ——— 이전 UI (보존): 승인 후 주석 해제하여 본문과 교체 ———
export default function ProductBanner({ banner }) {
  if (!banner) return null
  const p = PRODUCT[banner.product]
  if (!p) return null

  const subtitle = p.overlaySubtitle ?? banner.message

  return (
    <div className="product-banner">
      <a className="bn-img" href={p.href} target="_blank" rel="noopener noreferrer">
        <img
          src={p.img}
          alt={p.name}
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = '/img/ondasoop.png'
          }}
        />
        <div className="bn-tag">BEST</div>
        <div className="bn-ov">
          <h3>{p.overlayTitle}</h3>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </a>
    </div>
  )
}
*/
