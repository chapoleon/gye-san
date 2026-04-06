'use client'

import { useEffect, useRef } from 'react'

const AD_CLIENT = 'ca-pub-5440243063519453'

export default function AdSense({ slot, format = 'auto', responsive = 'true', style }) {
  const adRef = useRef(null)
  const pushed = useRef(false)

  useEffect(() => {
    pushed.current = false
    const el = adRef.current
    if (!el) return

    const tryPush = () => {
      if (pushed.current) return
      if (el.getAttribute('data-adsbygoogle-status')) return
      const width = el.offsetWidth || el.getBoundingClientRect().width
      if (width <= 0) return
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        pushed.current = true
      } catch {
        /* 이미 광고가 있거나 중복 push */
      }
    }

    const ro = new ResizeObserver(() => tryPush())
    ro.observe(el)
    let rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(tryPush)
    })
    const t = setTimeout(tryPush, 400)

    return () => {
      ro.disconnect()
      if (rafId != null) cancelAnimationFrame(rafId)
      clearTimeout(t)
    }
  }, [slot, format, responsive])

  const fullWidthResponsive =
    responsive === true || responsive === 'true' ? 'true' : 'false'

  return (
    <div className="ad" style={{ minWidth: 0, width: '100%' }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={style || { display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive}
      />
    </div>
  )
}
