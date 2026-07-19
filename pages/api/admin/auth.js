import { isEnabled, generateCode, createSession, sendCode, verifySession } from '../../../lib/email-2fa'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { password, code, session } = req.body || {}

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid password' })
    }

    if (isEnabled()) {
      if (code && session) {
        if (verifySession(code, session)) {
          return res.status(200).json({ ok: true })
        }
        return res.status(401).json({ error: 'Invalid or expired verification code' })
      }

      const newCode = generateCode()
      const { session: newSession } = createSession(newCode)
      await sendCode(newCode)
      return res.status(200).json({ ok: true, codeRequired: true, session: newSession })
    }

    return res.status(200).json({ ok: true })
  }

  if (req.method === 'GET') {
    const auth = req.headers.authorization
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token' })
    }
    const token = auth.replace('Bearer ', '')
    if (token !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid token' })
    }
    return res.status(200).json({ ok: true })
  }

  res.status(405).json({ error: 'Method not allowed' })
}
