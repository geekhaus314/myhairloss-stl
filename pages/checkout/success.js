import Head from 'next/head'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function CheckoutSuccess() {
  return (
    <div className="bg-[#fdfdfb] min-h-screen flex flex-col">
      <Head>
        <title>Order Confirmed | Brian Ivie Hair and Extensions</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <div className="bg-[#0a0a0a] text-[#c5a059] py-3 text-center">
        <Link
          href="/"
          className="text-lg md:text-2xl font-black tracking-[0.4em] uppercase hover:text-white transition-colors"
        >
          MYHAIRLOSS.COM
        </Link>
      </div>

      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-lg text-center">
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-10">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-8">
            Order{' '}
            <span className="italic font-serif font-light text-[#c5a059]">
              Confirmed.
            </span>
          </h1>
          <p className="text-lg text-gray-500 font-light leading-relaxed mb-12">
            Thank you for your purchase. A receipt has been emailed to you, and
            Brian&apos;s team will prepare your order right away. You&apos;ll be
            contacted with shipping details shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/" className="btn-primary">
              Return Home
            </Link>
            <Link href="/contact" className="btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-[#0a0a0a] text-white py-12 px-6 text-center">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold">
          © {new Date().getFullYear()} Brian Ivie Hair and Extensions. All
          rights reserved.
        </p>
      </footer>
    </div>
  )
}
