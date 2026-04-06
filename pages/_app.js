import Head from 'next/head'
import Script from 'next/script'
import '@/styles/globals.css'
import Nav from '@/components/Nav'
import { organizationSchemaJsonLd } from '@/lib/schema'

export default function App({ Component, pageProps }) {
  const org = organizationSchemaJsonLd()
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
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
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5440243063519453"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Nav />
      <Component {...pageProps} />
    </>
  )
}
