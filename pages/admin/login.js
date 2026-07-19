import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Lock, Fingerprint } from 'lucide-react'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
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
        if (data.passkeyRequired) {
          setStep('passkey')
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

  const handlePasskeyAuth = async () => {
    setError('')
    setLoading(true)
    try {
      const optRes = await fetch('/api/admin/passkey/auth-options', { method: 'POST' })
      if (!optRes.ok) {
        setError('No passkey registered yet')
        setLoading(false)
        return
      }
      const options = await optRes.json()

      const credential = await navigator.credentials.get({ publicKey: options })

      const authRes = await fetch('/api/admin/passkey/auth-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential, expectedChallenge: options.challenge }),
      })
      const authData = await authRes.json()

      if (!authData.verified) {
        setError('Biometric verification failed')
        setLoading(false)
        return
      }

      const finalRes = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, passkeyVerified: true }),
      })
      if (finalRes.ok) {
        document.cookie = `admin_token=${password}; path=/admin; max-age=86400; SameSite=Strict`
        router.push('/admin')
      } else {
        setError('Authentication failed')
      }
    } catch (err) {
      setError(err.message || 'Biometric authentication failed')
    }
    setLoading(false)
  }

  if (step === 'passkey') {
    return (
      <>
        <Head>
          <title>Verify Identity | Brian Ivie Hair &amp; Extensions</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
          <div className="w-full max-w-md">
            <div className="text-center mb-12">
              <Fingerprint className="w-12 h-12 text-[#c5a059] mx-auto mb-6" />
              <h1 className="text-3xl font-serif text-white mb-2">Verify Your Identity</h1>
              <p className="text-white/40 text-sm">Use Face ID, Touch ID, or your device biometrics</p>
            </div>
            <div className="bg-[#111] border border-[#222] p-10 rounded-lg text-center">
              <button
                onClick={handlePasskeyAuth}
                disabled={loading}
                className="w-full bg-[#c5a059] text-[#0a0a0a] font-bold uppercase tracking-widest text-xs py-4 rounded hover:bg-[#d4b46a] transition-colors disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Use Biometrics'}
              </button>
              {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
              <button
                type="button"
                onClick={() => { setStep('password'); setError('') }}
                className="w-full text-white/30 text-xs mt-4 hover:text-white/50 transition-colors"
              >
                Back
              </button>
            </div>
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
