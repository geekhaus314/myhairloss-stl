import fs from 'fs'
import path from 'path'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const BRIAN_PHONE = '3145834843'

function isValid(credential) {
  if (credential === ADMIN_PASSWORD) return true
  const digits = credential.replace(/\D/g, '')
  if (digits === BRIAN_PHONE) return true
  return false
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { password } = req.body || {}
    if (isValid(password)) {
      return res.status(200).json({ ok: true })
    }
    return res.status(401).json({ error: 'Invalid password' })
  }

  if (req.method === 'GET') {
    const auth = req.headers.authorization
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token' })
    }
    const token = auth.replace('Bearer ', '')
    if (isValid(token)) {
      return res.status(200).json({ ok: true })
    }
    return res.status(401).json({ error: 'Invalid token' })
  }

  res.status(405).json({ error: 'Method not allowed' })
}
