import Head from 'next/head'
import Link from 'next/link'
import CalculatorBody from '@/components/CalculatorBody'
import FaqSection from '@/components/FaqSection'
import SiteFooter from '@/components/SiteFooter'
import AdSense from '@/components/AdSense'
import CalculatorSeoArticle from '@/components/CalculatorSeoArticle'
import { shouldAppendSeoArticle } from '@/lib/getCalculatorSeoSections'
// import ProductBanner from '@/components/ProductBanner' // AdSense 승인 전 비활성화
import {
  getAllSlugs,
  getCalculatorBySlug,
  getRelatedCalculators,
  metaDescription,
  pageTitle
} from '@/lib/calculators'
import { breadcrumbJsonLd, faqPageJsonLd, webApplicationJsonLd } from '@/lib/schema'

export default function CalculatorPage({ calc, related }) {
  const path = `/calculators/${calc.slug}/`
  const url = `https://gye-san.com${path}`
  const desc = metaDescription(calc.description)
  const title = pageTitle(calc.name)
  const faqLd = faqPageJsonLd(calc.faq)
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
            gye-san.com · 무료 온라인 도구
          </div>
          <h1>
            <span className="ac">{calc.name}</span>
          </h1>
          <p className="geo-lead">
            <strong>{calc.description}</strong>
          </p>
        </header>
        <article>
          <AdSense slot="1111111111" format="horizontal" />
          <CalculatorBody formulaType={calc.formula_type} />
          {/* AdSense 승인 전: 제휴 스토어 배너 비활성화 (승인 후 주석 해제)
          <ProductBanner banner={calc.banner} />
          */}
          <AdSense slot="2222222222" />
          <FaqSection items={calc.faq} />
          {shouldAppendSeoArticle(calc) ? <CalculatorSeoArticle calc={calc} /> : null}
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
        <div className="cta-bottom">
          <Link href="/">💡 더 많은 무료 계산기는 계산닷컴에서</Link>
        </div>
        <AdSense slot="3333333333" />
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
