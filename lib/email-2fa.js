import crypto from 'crypto'

const CODE_EXPIRY_MS = 5 * 60 * 1000

export function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function createSession(code) {
  const salt = crypto.randomBytes(16).toString('hex')
  const expires = Date.now() + CODE_EXPIRY_MS
  const hash = crypto.createHash('sha256').update(salt + code).digest('hex')
  return { session: `${salt}.${hash}.${expires}` }
}

export function verifySession(code, session) {
  if (!session) return false
  const parts = session.split('.')
  if (parts.length !== 3) return false
  const [salt, hash, expires] = parts
  if (Date.now() > parseInt(expires)) return false
  const expected = crypto.createHash('sha256').update(salt + code).digest('hex')
  return hash === expected
}

export async function sendCode(code) {
  const email = process.env.ADMIN_EMAIL
  if (!email) return false

  const body = JSON.stringify({
    from: 'myhairloss.com <admin@myhairloss.com>',
    to: email,
    subject: 'Your admin verification code',
    text: `Your admin verification code is: ${code}\n\nThis code expires in 5 minutes. If you did not request this, you can ignore this email.`,
    html: `<p>Your admin verification code is:</p>
<h2 style="letter-spacing:0.3em;font-size:32px;text-align:center;padding:20px;background:#f5f5f5;border-radius:8px">${code}</h2>
<p>This code expires in 5 minutes. If you did not request this, you can ignore this email.</p>`,
  })

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body,
  })
  return res.ok
}

export function isEnabled() {
  return !!process.env.ADMIN_EMAIL
}
