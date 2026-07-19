import { isEnabled, verify } from '../../../lib/totp'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { password, totp } = req.body || {}

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid password' })
    }

    if (totp) {
      if (!verify(totp)) {
        return res.status(401).json({ error: 'Invalid 2FA code' })
      }
      return res.status(200).json({ ok: true })
    }

    if (isEnabled()) {
      return res.status(200).json({ ok: true, totpRequired: true })
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
