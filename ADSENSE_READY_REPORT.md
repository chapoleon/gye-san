# AdSense 승인 준비 리포트

작업일: 2026-05-15  
대상: https://gye-san.com (계산닷컴)  
Publisher ID: `pub-5440243063519453`

---

## 1. 수정한 파일 목록

### AdSense·SEO·인프라
- `pages/_document.js` — AdSense meta + script (전역 1회)
- `pages/_app.js` — WebSite JSON-LD, AdSense 중복 제거
- `public/ads.txt`
- `public/robots.txt`
- `scripts/generate-sitemaps.mjs`, `lib/sitemap-urls.mjs`, `public/sitemap.xml`
- `public/_redirects` — `/disclaimer/` 리다이렉트
- `lib/site.js`, `lib/schema.js`, `lib/calculators.js`, `lib/getCalculatorSeoSections.js`
- `lib/calculatorContent.js`, `lib/loanCalc.js`, `lib/taxCalc.js`

### UI·신뢰 페이지
- `components/Nav.js`, `components/SiteFooter.js`, `components/ContactForm.jsx`
- `components/CalculatorGuide.jsx`, `components/CalculatorBody.js`, `components/widgets-core.js`
- `pages/disclaimer/index.js` (신규)
- `pages/about/index.js`, `pages/contact/index.js`, `pages/terms/index.js`
- `pages/index.js`, `pages/calculators/index.js`, `pages/calculators/[slug].jsx`
- `styles/globals.css`
- `components/calculator-widgets.js` — placeholder 문구 정리

### 삭제
- `ads.txt` (프로젝트 루트 중복본 — `public/ads.txt`만 사용)

---

## 2. AdSense 코드 삽입 위치

**파일:** `pages/_document.js` (`<Head>` 내부, 모든 페이지 공통)

```html
<meta name="google-adsense-account" content="ca-pub-5440243063519453" />
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5440243063519453" crossorigin="anonymous"></script>
```

- `_app.js`에 있던 중복 스크립트는 제거했습니다.
- 승인 전 과도한 광고 유닛: 홈·계산기 목록·계산기 상세의 `<AdSense />` 컴포넌트 호출을 제거했습니다. (`components/AdSense.js`는 승인 후 재활성화용으로 유지)

---

## 3. ads.txt 생성 여부

- **경로:** `public/ads.txt`
- **내용:** `google.com, pub-5440243063519453, DIRECT, f08c47fec0942fa0`
- **헤더:** `public/_headers`에 `Content-Type: text/plain` 설정 유지

---

## 4. robots.txt / sitemap 처리

### robots.txt
- Googlebot, AdsBot-Google 허용
- `Disallow: /api/` (`/_next/` 차단 제거 — JS/CSS 렌더링 허용)
- `Sitemap: https://gye-san.com/sitemap.xml` (한 줄, sitemap-index 미참조)

### sitemap.xml 수정 (2026-05-15 추가 작업)

**원인:** `public/_redirects` 1행이 `/sitemap.xml` → `/sitemap-index.xml` 301 리다이렉트를 걸어, 존재하지 않는 `sitemap-index.xml`로 보내 404가 발생했습니다.

**조치:**
- `public/_redirects`에서 해당 리다이렉트 **삭제**
- **Pages Router + `output: 'export'`** — `app/sitemap.ts` 미사용
- URL 목록 단일 소스: `lib/sitemap-urls.mjs`
- `public/sitemap.xml` 정적 파일 + 빌드 후 `out/sitemap.xml` 동기화 (`generate-sitemaps.mjs`)
- `public/_headers`에 `/sitemap.xml` → `application/xml` Content-Type 추가
- `sitemap-index.xml` / `sitemap-blog.xml` 참조 코드 **전부 제거**

**포함 URL (14개, 실제 slug 기준):**

| 요청 예시 slug | 실제 라우트 |
|----------------|-------------|
| hourly-wage | `/calculators/hourly/` |
| weekly-holiday-pay | `/calculators/weekly-holiday/` |
| compound-interest | `/calculators/compound/` |

- `/`, `/about/`, `/contact/`, `/privacy/`, `/terms/`, `/disclaimer/`, `/guides/`
- `/calculators/salary/`, `/calculators/severance/`, `/calculators/hourly/`, `/calculators/weekly-holiday/`, `/calculators/vat/`, `/calculators/compound/`, `/calculators/loan-interest/`

**제외:** placeholder 계산기, `/guides/ads-txt/`, `/api/`, 존재하지 않는 slug

---

## 5. 보강한 핵심 계산기 페이지 (10종)

| 계산기 | slug | 콘텐츠 | 계산 UI |
|--------|------|--------|---------|
| 실수령액 | salary | CalculatorGuide + FAQ | 동작 |
| 4대보험 | insurance | CalculatorGuide + FAQ | 동작 |
| 퇴직금 | severance | CalculatorGuide + FAQ | 동작 |
| 시급 | hourly | CalculatorGuide + FAQ | 동작 |
| 주휴수당 | weekly-holiday | CalculatorGuide + FAQ | **신규 구현** (`widgets-core.js`) |
| 연차수당 | annual-leave | CalculatorGuide + FAQ | **신규 구현** |
| 부가세 | vat | CalculatorGuide + FAQ | 동작 |
| 종합소득세 | income-tax | CalculatorGuide + FAQ | **신규 구현** (단순 누진 모델) |
| 대출이자 | loan-interest | CalculatorGuide + FAQ | **신규 구현** |
| 복리 | compound | CalculatorGuide + FAQ | 동작 |

---

## 6. 신뢰 페이지

| 경로 | 상태 |
|------|------|
| `/about/` | 운영 원칙·목적 보강 |
| `/contact/` | mailto 연동 폼, UI 예시 문구 제거 |
| `/privacy/` | AdSense·Analytics·쿠키 명시 (기존 유지) |
| `/terms/` | 10개 조항으로 확장 |
| `/disclaimer/` | **신규** 면책 안내 |

---

## 7. 제거·수정한 문제 문구

- `UI 예시`, `실제 전송은 연결되어 있지 않습니다`, `시연용 UI`
- `계산기은(는) … 무료로 제공` 반복 SEO 템플릿 (`getCalculatorSeoSections.js` 전면 개편)
- `무료 자동계산` / `✅ 자동계산` title 접미사
- 홈 `월간 검색수 120만+` 등 검증 불가 수치
- placeholder `준비 중` → `추가 예정` (비활성 위젯)
- `자동 계산 (곧 제공)` 버튼 문구

---

## 8. noindex / sitemap 제외

### noindex (`robots: noindex, follow`)
`lib/site.js`의 `PLACEHOLDER_CALCULATOR_SLUGS` 26종 — 계산 UI만 있고 산식 미연동

예: overtime, night-pay, inheritance, dsr-dti, year-end-tax, health-insurance, mortgage, age-calculator, date-calculator 등

### sitemap 제외
- 위 placeholder 26종 전체
- `/guides/ads-txt/` (운영 가이드, 색인 불필요)
- 블로그 sitemap (`sitemap-blog.xml` 생성 중단)

### 홈·목록 노출
- 홈·카테고리 그리드에서는 placeholder 계산기 링크 **숨김** (URL 직접 접근은 가능, noindex)

---

## 9. 사람이 직접 확인해야 할 항목

1. **AdSense 콘솔**에서 사이트 연결·ads.txt 상태가 “찾음”인지 (배포 후 24~72시간)
2. **support@gye-san.com** 메일함 수신·mailto 동작 (모바일·데스크톱)
3. placeholder 계산기 26종 — 추후 산식 구현 또는 목록에서 완전 제거 여부 결정
4. 종합소득세·연차수당 등 **단순화된 모델**이 실제 신고액과 크게 다를 수 있음 — 법령 개정 시 수치 점검
5. Cloudflare 배포 후 `ads.txt`가 HTML이 아닌 **plain text**로 응답하는지
6. 승인 후 광고 슬롯 재활성화 시 CLS·정책 재점검

---

## 10. 배포 후 확인 URL

- https://gye-san.com/
- https://gye-san.com/ads.txt
- https://gye-san.com/robots.txt
- https://gye-san.com/sitemap.xml
- https://gye-san.com/about/
- https://gye-san.com/contact/
- https://gye-san.com/privacy/
- https://gye-san.com/terms/
- https://gye-san.com/disclaimer/

### 핵심 계산기 샘플
- https://gye-san.com/calculators/salary/
- https://gye-san.com/calculators/insurance/
- https://gye-san.com/calculators/weekly-holiday/
- https://gye-san.com/calculators/income-tax/

---

## 빌드 검증

- `npm run lint` — 통과
- `npm run build` — 통과 (sitemap **14 URL**, `public/`·`out/` 동기화)

---

## 계산 로직 변경 요약

| 영역 | 변경 |
|------|------|
| 기존 동작 계산기 (salary, severance 등) | **변경 없음** |
| 주휴수당·연차·종소세·대출이자 | `components/widgets-core.js`에 **신규** 참고용 산식 추가 |
| placeholder 26종 | 로직 변경 없음, noindex만 적용 |
