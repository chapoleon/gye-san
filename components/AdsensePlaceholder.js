'use client'

import { useEffect } from 'react'

export default function AdsensePlaceholder({ slot, format = 'auto', responsive = true }) {
  useEffect(() => {
    try {
      const w = window
      w.adsbygoogle = w.adsbygoogle || []
      w.adsbygoogle.push({})
    } catch {
      /* ignore */
    }
  }, [slot])

  return (
    <div className="ad">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5440243063519453"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}
