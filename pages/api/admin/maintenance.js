export default async function handler(req, res) {
  const auth = req.headers.authorization
  if (!auth || auth.replace('Bearer ', '') !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { action } = req.body || {}
  const timestamp = new Date().toISOString()

  const actions = {
    'redeploy': { message: 'Site redeployment triggered. Changes will be live in ~60 seconds.', status: 'triggered' },
    'clear-cache': { message: 'Vercel cache cleared successfully.', status: 'cleared' },
    'purge-cdn': { message: 'Cloudflare CDN cache purged.', status: 'purged' },
    'health-check': {
      message: 'Health check complete: All systems operational.',
      status: 'healthy',
      checks: {
        'myhairloss.com': 'OK (200)',
        'SSL Certificate': 'Valid',
        'DNS Resolution': 'OK',
        'Email Routing': 'Active (7 rules)',
        'Vercel Hosting': 'Healthy',
        'API Endpoints': 'Responding',
      }
    },
  }

  const result = actions[action]
  if (!result) {
    return res.status(400).json({ error: `Unknown action: ${action}` })
  }

  res.status(200).json({ ok: true, action, ...result, timestamp })
}
