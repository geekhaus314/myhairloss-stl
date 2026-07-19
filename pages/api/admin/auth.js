import fs from 'fs'
import path from 'path'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { password } = req.body || {}
    if (password === ADMIN_PASSWORD) {
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
    if (token === ADMIN_PASSWORD) {
      return res.status(200).json({ ok: true })
    }
    return res.status(401).json({ error: 'Invalid token' })
  }

  res.status(405).json({ error: 'Method not allowed' })
}
