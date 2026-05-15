import Head from 'next/head'
import Link from 'next/link'
import CalculatorBody from '@/components/CalculatorBody'
import FaqSection from '@/components/FaqSection'
import SiteFooter from '@/components/SiteFooter'
import CalculatorGuide from '@/components/CalculatorGuide'
import CalculatorSeoArticle from '@/components/CalculatorSeoArticle'
import { shouldAppendSeoArticle } from '@/lib/getCalculatorSeoSections'
import { getCalculatorContent } from '@/lib/calculatorContent'
import {
  getAllSlugs,
  getCalculatorBySlug,
  getRelatedCalculators,
  metaDescription,
  pageTitle,
  shouldNoindexCalculator
} from '@/lib/calculators'
import { breadcrumbJsonLd, faqPageJsonLd, webApplicationJsonLd } from '@/lib/schema'
import { isPlaceholderSlug } from '@/lib/site'

export default function CalculatorPage({ calc, related }) {
  const path = `/calculators/${calc.slug}/`
  const url = `https://gye-san.com${path}`
  const desc = metaDescription(calc.description, calc.slug)
  const title = pageTitle(calc.name, calc.slug)
  const noindex = shouldNoindexCalculator(calc.slug)
  const guide = getCalculatorContent(calc.slug)
  const faqForLd = guide
    ? [...(calc.faq || []), ...(guide.extraFaq || [])]
    : calc.faq
  const faqLd = faqPageJsonLd(faqForLd)
  const webApp = webApplicationJsonLd({
    name: calc.name,
    description: calc.description.replace(/\s+/g, ' ').trim(),
    path
  })
  const crumbs = breadcrumbJsonLd({ name: calc.name, path })

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={url} />
        {noindex ? <meta name="robots" content="noindex, follow" /> : null}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={url} />
        <meta property="og:locale" content="ko_KR" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />
        {faqLd ? (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
        ) : null}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      </Head>
      <main className="w">
        <header className="ani">
          <div className="badge">
            <span className="dot" />
            {calc.pillar}
          </div>
          <h1>
            <span className="ac">{calc.name}</span>
          </h1>
          <p className="geo-lead">{calc.description}</p>
        </header>
        <article>
          {isPlaceholderSlug(calc.slug) ? (
            <p className="placeholder-notice" role="status">
              이 계산기는 산식 연동 작업 중입니다. 아래 입력 UI는 참고용이며, 관련 계산기 링크를 이용해 주세요.
            </p>
          ) : null}
          <CalculatorBody formulaType={calc.formula_type} />
          <FaqSection items={calc.faq} />
          {guide ? <CalculatorGuide calc={calc} content={guide} /> : null}
          {!guide && shouldAppendSeoArticle(calc) ? <CalculatorSeoArticle calc={calc} /> : null}
        </article>
        {related.length > 0 ? (
          <div className="rel">
            <h2>관련 계산기</h2>
            <div className="rg">
              {related.map((c) => (
                <Link key={c.slug} href={`/calculators/${c.slug}/`} className="rc">
                  <span className="ico">{c.emoji}</span>
                  <span className="nm">{c.name}</span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
        <p className="calc-disclaimer">
          위 결과는 참고용 추정치입니다. 실제 금액·세액·일정은 법령 개정, 회사 규정, 계약 조건에 따라 달라질 수 있습니다.{' '}
          <Link href="/disclaimer/">면책 안내</Link>
        </p>
        <div className="cta-bottom">
          <Link href="/calculators/">전체 계산기 보기</Link>
        </div>
        <SiteFooter />
      </main>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: getAllSlugs().map((slug) => ({ params: { slug } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const calc = getCalculatorBySlug(params.slug)
  if (!calc) return { notFound: true }
  const related = getRelatedCalculators(calc.slug, calc.pillar, 3)
  return { props: { calc, related } }
}
