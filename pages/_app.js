import '../styles/globals.css'
import Script from 'next/script'
import { CartProvider } from '../lib/cart-context'
import CartDrawer from '../components/CartDrawer'

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9108798014217982"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Component {...pageProps} />
      <CartDrawer />
    </CartProvider>
  )
}
