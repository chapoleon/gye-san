'use client'

import { useCallback, useEffect, useState } from 'react'

/** Chrome/Edge/Android: beforeinstallprompt · Safari: 공유 안내 */
export default function PwaInstallPrompt() {
  const [deferred, setDeferred] = useState(null)
  const [dismissed, setDismissed] = useState(false)
  const [iosHint, setIosHint] = useState(false)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      /** @type {Window & { navigator: Navigator & { standalone?: boolean } }} */ (window).navigator
        .standalone === true
    if (standalone) setInstalled(true)

    const ua = navigator.userAgent || ''
    const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    if (isIOS && !standalone) setIosHint(true)

    const onBip = (e) => {
      e.preventDefault()
      setDeferred(e)
    }
    window.addEventListener('beforeinstallprompt', onBip)
    return () => window.removeEventListener('beforeinstallprompt', onBip)
  }, [])

  const onInstall = useCallback(async () => {
    if (!deferred) return
    deferred.prompt()
    await deferred.userChoice
    setDeferred(null)
  }, [deferred])

  if (installed || dismissed) return null

  if (deferred) {
    return (
      <div className="pwa-install" role="region" aria-label="앱 설치 안내">
        <p className="pwa-install-text">계산닷컴을 앱처럼 설치하고 빠르게 열 수 있어요.</p>
        <div className="pwa-install-actions">
          <button type="button" className="pwa-install-btn" onClick={onInstall}>
            홈 화면에 추가
          </button>
          <button type="button" className="pwa-dismiss" onClick={() => setDismissed(true)} aria-label="닫기">
            닫기
          </button>
        </div>
      </div>
    )
  }

  if (iosHint) {
    return (
      <div className="pwa-install pwa-install-ios" role="region" aria-label="앱 설치 안내">
        <p className="pwa-install-text">
          Safari: <strong>공유</strong> → <strong>홈 화면에 추가</strong>로 앱처럼 설치할 수 있어요.
        </p>
        <button type="button" className="pwa-dismiss-only" onClick={() => setDismissed(true)}>
          닫기
        </button>
      </div>
    )
  }

  return null
}
