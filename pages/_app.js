import Head from 'next/head'
import Script from 'next/script'
import '@/styles/globals.css'
import Nav from '@/components/Nav'
import PwaInstallPrompt from '@/components/PwaInstallPrompt'
import { organizationSchemaJsonLd, websiteSchemaJsonLd } from '@/lib/schema'

export default function App({ Component, pageProps }) {
  const org = organizationSchemaJsonLd()
  const site = websiteSchemaJsonLd()
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="application-name" content="계산닷컴" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="계산닷컴" />
        <meta name="theme-color" content="#3b82f6" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }} />
      </Head>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-9ZJM9GHEVJ" strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-9ZJM9GHEVJ');
        `}
      </Script>
      <Nav />
      <Component {...pageProps} />
      <PwaInstallPrompt />
    </>
  )
}
