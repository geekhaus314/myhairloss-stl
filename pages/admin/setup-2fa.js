import Head from 'next/head'
import { Mail, Check } from 'lucide-react'

export default function Setup2FA() {
  const currentEmail = typeof window !== 'undefined'
    ? document.cookie.match(/admin_2fa_email=([^;]+)/)?.[1] || ''
    : ''

  return (
    <>
      <Head>
        <title>Setup 2FA | Brian Ivie Hair &amp; Extensions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <Mail className="w-10 h-10 text-[#c5a059] mx-auto mb-4" />
            <h1 className="text-3xl font-serif text-white mb-2">Two-Factor Auth Setup</h1>
            <p className="text-white/40 text-sm">Verification codes sent to your email</p>
          </div>

          <div className="bg-[#111] border border-[#222] p-8 rounded-lg text-center">
            <Check className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-xl font-serif text-white mb-2">How It Works</h2>
            <ol className="text-white/60 text-sm text-left space-y-3 mt-4 mb-6">
              <li>1. Enter your password on the login page</li>
              <li>2. A 6-digit code is emailed to you instantly</li>
              <li>3. Enter the code to access the admin dashboard</li>
            </ol>
            <p className="text-white/40 text-xs mb-4">
              Codes expire after 5 minutes and are single-use.
            </p>
            <p className="text-white/40 text-xs">
              To enable, set <code className="text-[#c5a059] bg-[#0a0a0a] px-2 py-1 rounded">ADMIN_EMAIL</code> on Vercel
              to the email address where codes should be sent.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
