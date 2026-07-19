import { useState } from 'react'
import Head from 'next/head'
import { Fingerprint, Check, Copy, Smartphone } from 'lucide-react'

export default function SetupPasskey() {
  const [step, setStep] = useState('start')
  const [credential, setCredential] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const register = async () => {
    setLoading(true)
    setError('')
    try {
      const optRes = await fetch('/api/admin/passkey/register-options', { method: 'POST' })
      const options = await optRes.json()
      if (!optRes.ok) throw new Error(options.error || 'Failed to get registration options')

      const credential = await navigator.credentials.create({ publicKey: options })

      const verifyRes = await fetch('/api/admin/passkey/register-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential, expectedChallenge: options.challenge }),
      })
      const verifyData = await verifyRes.json()
      if (!verifyData.verified) throw new Error('Verification failed')

      setCredential(verifyData.credential)
      setStep('done')
    } catch (err) {
      setError(err.message || 'Registration failed')
    }
    setLoading(false)
  }

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(credential, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Head>
        <title>Setup Biometrics | Brian Ivie Hair &amp; Extensions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <Fingerprint className="w-10 h-10 text-[#c5a059] mx-auto mb-4" />
            <h1 className="text-3xl font-serif text-white mb-2">Biometric Setup</h1>
            <p className="text-white/40 text-sm">Register Face ID, Touch ID, or Windows Hello</p>
          </div>

          {step === 'start' && (
            <div className="bg-[#111] border border-[#222] p-8 rounded-lg text-center">
              <Smartphone className="w-16 h-16 text-white/20 mx-auto mb-6" />
              <p className="text-white/60 text-sm mb-8">
                Your device will prompt you to use Face ID, Touch ID, or Windows Hello to secure admin access.
              </p>
              <button
                onClick={register}
                disabled={loading}
                className="w-full bg-[#c5a059] text-[#0a0a0a] font-bold uppercase tracking-widest text-xs py-4 rounded hover:bg-[#d4b46a] transition-colors disabled:opacity-50"
              >
                {loading ? 'Waiting for your device...' : 'Register This Device'}
              </button>
              {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
            </div>
          )}

          {step === 'done' && (
            <div className="bg-[#111] border border-[#222] p-8 rounded-lg text-center">
              <Check className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h2 className="text-xl font-serif text-white mb-2">Device Registered!</h2>
              <p className="text-white/60 text-sm mb-6">
                Set <code className="text-[#c5a059] bg-[#0a0a0a] px-2 py-1 rounded text-xs">ADMIN_PASSKEY_CREDENTIAL</code> on Vercel to this credential JSON:
              </p>
              <div className="bg-[#0a0a0a] border border-[#333] rounded p-4 mb-4 text-left max-h-48 overflow-y-auto">
                <code className="text-[#c5a059] text-xs font-mono break-all whitespace-pre">{JSON.stringify(credential, null, 2)}</code>
              </div>
              <button
                onClick={copyJson}
                className="bg-[#c5a059] text-[#0a0a0a] font-bold uppercase tracking-widest text-xs py-3 px-6 rounded hover:bg-[#d4b46a] transition-colors"
              >
                {copied ? 'Copied!' : 'Copy to Clipboard'}
                {copied ? <Check className="w-4 h-4 inline ml-2" /> : <Copy className="w-4 h-4 inline ml-2" />}
              </button>
              <p className="text-white/40 text-xs mt-6">Save in Vercel project env vars, then redeploy.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
