import { safety } from '../../../lib/agent-safety'

export default function handler(req, res) {
  const auth = req.headers.authorization
  if (!auth || auth.replace('Bearer ', '') !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    const log = safety.getAuditLog()
    const stats = {
      total: log.length,
      successes: log.filter(e => e.status === 'success').length,
      failures: log.filter(e => e.status === 'error' || e.status === 'blocked').length,
      destructive: log.filter(e => e.destructive).length,
    }
    return res.status(200).json({ log, stats })
  }

  res.status(405).json({ error: 'Method not allowed' })
}
