import { useState } from 'react'
import Head from 'next/head'
import { Shield, Check, Copy, Smartphone } from 'lucide-react'

export default function Setup2FA() {
  const [secret, setSecret] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [token, setToken] = useState('')
  const [step, setStep] = useState('start')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = async () => {
    setError('')
    const res = await fetch('/api/admin/setup-totp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'generate' }),
    })
    const data = await res.json()
    if (res.ok) {
      setSecret(data.secret)
      setQrCode(data.qrCode)
      setStep('scan')
    } else {
      setError('Failed to generate')
    }
  }

  const verifySetup = async () => {
    setError('')
    const res = await fetch('/api/admin/setup-totp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'verify', secret, token }),
    })
    const data = await res.json()
    if (data.valid) {
      setStep('done')
    } else {
      setError('Invalid code — try again')
    }
  }

  const copySecret = () => {
    navigator.clipboard.writeText(secret)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Head>
        <title>Setup 2FA | Brian Ivie Hair &amp; Extensions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <Shield className="w-10 h-10 text-[#c5a059] mx-auto mb-4" />
            <h1 className="text-3xl font-serif text-white mb-2">Two-Factor Auth Setup</h1>
            <p className="text-white/40 text-sm">Google Authenticator or any TOTP app</p>
          </div>

          {step === 'start' && (
            <div className="text-center">
              <p className="text-white/60 text-sm mb-8">Generate a QR code to scan with your authenticator app.</p>
              <button
                onClick={generate}
                className="bg-[#c5a059] text-[#0a0a0a] font-bold uppercase tracking-widest text-xs py-4 px-8 rounded hover:bg-[#d4b46a] transition-colors"
              >
                Generate QR Code
              </button>
            </div>
          )}

          {step === 'scan' && (
            <div className="bg-[#111] border border-[#222] p-8 rounded-lg">
              <div className="flex justify-center mb-6">
                <img src={qrCode} alt="TOTP QR Code" className="w-48 h-48" />
              </div>
              <div className="text-center mb-6">
                <p className="text-white/60 text-xs mb-2">Or enter this secret manually:</p>
                <div className="flex items-center justify-center gap-2">
                  <code className="bg-[#0a0a0a] text-[#c5a059] px-3 py-2 rounded text-xs font-mono break-all">{secret}</code>
                  <button onClick={copySecret} className="text-white/40 hover:text-white/70 transition-colors flex-shrink-0">
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="border-t border-[#222] pt-6">
                <label className="block text-white/60 text-xs uppercase tracking-widest mb-3 font-bold">Verify Code</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={token}
                  onChange={(e) => setToken(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full bg-[#0a0a0a] border border-[#333] text-white px-4 py-4 rounded mb-4 text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-[#c5a059] transition-colors"
                  placeholder="000000"
                  autoFocus
                />
                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
                <button
                  onClick={verifySetup}
                  disabled={token.length !== 6}
                  className="w-full bg-[#c5a059] text-[#0a0a0a] font-bold uppercase tracking-widest text-xs py-4 rounded hover:bg-[#d4b46a] transition-colors disabled:opacity-50"
                >
                  Verify & Complete
                </button>
              </div>
            </div>
          )}

          {step === 'done' && (
            <div className="bg-[#111] border border-[#222] p-8 rounded-lg text-center">
              <Check className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h2 className="text-xl font-serif text-white mb-2">Verified!</h2>
              <p className="text-white/60 text-sm mb-6">
                2FA is working. Set <code className="text-[#c5a059] bg-[#0a0a0a] px-2 py-1 rounded text-xs">ADMIN_TOTP_SECRET</code> on Vercel to this secret:
              </p>
              <div className="bg-[#0a0a0a] border border-[#333] rounded p-4 mb-6">
                <code className="text-[#c5a059] text-xs font-mono break-all">{secret}</code>
              </div>
              <p className="text-white/40 text-xs">Save this in Vercel project env vars, then deploy.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
