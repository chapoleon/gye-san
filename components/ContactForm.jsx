'use client'

import { useState } from 'react'
import { CONTACT_EMAIL } from '@/lib/site'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const subject = encodeURIComponent(`[계산닷컴 문의] ${name || '이름 없음'}`)
    const body = encodeURIComponent(
      `이름: ${name}\n이메일: ${email}\n\n문의 내용:\n${message}\n\n---\n문제 URL·입력값·기대 결과를 함께 적어 주시면 처리에 도움이 됩니다.`
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} style={{ marginTop: 18 }}>
      <label htmlFor="cf-name">이름</label>
      <input
        id="cf-name"
        name="name"
        type="text"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="성함 또는 닉네임"
      />
      <label htmlFor="cf-email" style={{ marginTop: 14 }}>
        이메일
      </label>
      <input
        id="cf-email"
        name="email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="회신받으실 주소"
      />
      <label htmlFor="cf-msg" style={{ marginTop: 14 }}>
        문의 내용
      </label>
      <textarea
        id="cf-msg"
        name="message"
        rows={6}
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="오류 재현 방법, 요청 사항, 문제가 발생한 URL 등을 적어 주세요."
        style={{
          width: '100%',
          background: 'var(--bg)',
          border: '1.5px solid var(--bd)',
          borderRadius: 'var(--r)',
          color: 'var(--t1)',
          fontFamily: 'var(--font)',
          fontSize: '1rem',
          padding: '12px 16px',
          outline: 'none',
          resize: 'vertical',
          marginTop: 5
        }}
      />
      <button type="submit" className="btn" style={{ marginTop: 16 }}>
        이메일 앱으로 문의 보내기
      </button>
      <p style={{ marginTop: 12, color: 'var(--t3)', fontSize: '0.85rem', lineHeight: 1.6 }}>
        제출 시 기기에 설정된 메일 앱이 열립니다. 메일이 열리지 않으면{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>로 직접 보내 주세요.
      </p>
    </form>
  )
}
