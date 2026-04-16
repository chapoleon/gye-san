'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
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
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="오류 재현 방법, 요청 사항 등을 적어 주세요."
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
        문의 보내기
      </button>
      {sent ? (
        <p style={{ marginTop: 14, color: 'var(--t2)', fontSize: '0.9rem' }}>
          현재 이 양식은 시연용 UI이며 실제 전송은 이루어지지 않습니다. 긴급한 사항은 아래 이메일로 직접 보내 주시기 바랍니다.
        </p>
      ) : null}
    </form>
  )
}
