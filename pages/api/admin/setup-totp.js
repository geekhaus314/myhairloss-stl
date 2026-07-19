import { authenticator } from 'otplib'
import QRCode from 'qrcode'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { action, secret, token } = req.body || {}

  if (action === 'generate') {
    const newSecret = authenticator.generateSecret()
    const otpauth = `otpauth://totp/Admin:myhairloss.com?secret=${newSecret}&issuer=BrianIvieHair&algorithm=SHA1&digits=6&period=30`
    const qrCode = await QRCode.toDataURL(otpauth)
    return res.status(200).json({ secret: newSecret, qrCode })
  }

  if (action === 'verify') {
    if (!secret || !token) {
      return res.status(400).json({ error: 'Missing secret or token' })
    }
    try {
      const valid = authenticator.verify({ token, secret })
      return res.status(200).json({ valid })
    } catch {
      return res.status(200).json({ valid: false })
    }
  }

  return res.status(400).json({ error: 'Invalid action' })
}
