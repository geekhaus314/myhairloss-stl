import Script from 'next/script'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Google AdSense Script - Loaded client-side with afterInteractive strategy */}
      {/* This ensures SSR compatibility and loads ads after interactive content is ready */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9108798014217982"
        strategy="afterInteractive"
      />
      
      <Component {...pageProps} />
    </>
  )
}
