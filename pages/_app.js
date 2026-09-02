import Script from 'next/script'
import Head from 'next/head'
import '../styles/globals.css'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Global meta */}
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="robots" content="index, follow" />
      </Head>

      {/* Google AdSense */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9108798014217982"
        strategy="afterInteractive"
      />

      {/* Google Analytics 4 (enabled when NEXT_PUBLIC_GA_ID is set) */}
      {GA_ID && (
        <>
          <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive" dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `
          }} />
        </>
      )}

      <Component {...pageProps} />
    </>
  )
}
