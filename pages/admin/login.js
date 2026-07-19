import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Lock, Shield } from 'lucide-react'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [totp, setTotp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState('password')
  const router = useRouter()

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (res.ok) {
        if (data.totpRequired) {
          setStep('totp')
        } else {
          document.cookie = `admin_token=${password}; path=/admin; max-age=86400; SameSite=Strict`
          router.push('/admin')
        }
      } else {
        setError(data.error || 'Invalid password')
      }
    } catch {
      setError('Connection error')
    }
    setLoading(false)
  }

  const handleTotpSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, totp }),
      })
      const data = await res.json()
      if (res.ok) {
        document.cookie = `admin_token=${password}; path=/admin; max-age=86400; SameSite=Strict`
        router.push('/admin')
      } else {
        setError(data.error || 'Invalid 2FA code')
      }
    } catch {
      setError('Connection error')
    }
    setLoading(false)
  }

  if (step === 'totp') {
    return (
      <>
        <Head>
          <title>Two-Factor Auth | Brian Ivie Hair &amp; Extensions</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
          <div className="w-full max-w-md">
            <div className="text-center mb-12">
              <Shield className="w-10 h-10 text-[#c5a059] mx-auto mb-6" />
              <h1 className="text-3xl font-serif text-white mb-2">Two-Factor Auth</h1>
              <p className="text-white/40 text-sm">Enter the 6-digit code from your authenticator app</p>
            </div>
            <form onSubmit={handleTotpSubmit} className="bg-[#111] border border-[#222] p-10 rounded-lg">
              <label className="block text-white/60 text-xs uppercase tracking-widest mb-3 font-bold">Authentication Code</label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={totp}
                onChange={(e) => setTotp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full bg-[#0a0a0a] border border-[#333] text-white px-4 py-4 rounded mb-4 text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-[#c5a059] transition-colors"
                placeholder="000000"
                autoFocus
              />
              {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
              <button
                type="submit"
                disabled={loading || totp.length !== 6}
                className="w-full bg-[#c5a059] text-[#0a0a0a] font-bold uppercase tracking-widest text-xs py-4 rounded hover:bg-[#d4b46a] transition-colors disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify & Enter'}
              </button>
              <button
                type="button"
                onClick={() => { setStep('password'); setTotp(''); setError('') }}
                className="w-full text-white/30 text-xs mt-4 hover:text-white/50 transition-colors"
              >
                Back
              </button>
            </form>
            <p className="text-white/20 text-center text-xs mt-8">Authorized personnel only</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Admin Login | Brian Ivie Hair &amp; Extensions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <Lock className="w-10 h-10 text-[#c5a059] mx-auto mb-6" />
            <h1 className="text-3xl font-serif text-white mb-2">Welcome Back</h1>
            <p className="text-white/40 text-sm">Brian Ivie Hair &amp; Extensions — Admin Portal</p>
          </div>
          <form onSubmit={handlePasswordSubmit} className="bg-[#111] border border-[#222] p-10 rounded-lg">
            <label className="block text-white/60 text-xs uppercase tracking-widest mb-3 font-bold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#333] text-white px-4 py-4 rounded mb-4 focus:outline-none focus:border-[#c5a059] transition-colors"
              placeholder="Enter admin password"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c5a059] text-[#0a0a0a] font-bold uppercase tracking-widest text-xs py-4 rounded hover:bg-[#d4b46a] transition-colors disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Continue'}
            </button>
          </form>
          <p className="text-white/20 text-center text-xs mt-8">Authorized personnel only</p>
        </div>
      </div>
    </>
  )
}
