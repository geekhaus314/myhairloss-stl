export default function handler(req, res) {
  const auth = req.headers.authorization
  if (!auth || auth.replace('Bearer ', '') !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const now = new Date()
  res.status(200).json({
    framework: 'Next.js 14',
    nodeVersion: '18.x',
    buildType: 'SSG + ISR',
    deployStatus: 'READY',
    domain: 'myhairloss.com',
    registrar: 'GoDaddy',
    dns: 'Cloudflare',
    hosting: 'Vercel',
    email: 'Resend + Cloudflare Email Routing',
    ssl: 'Cloudflare (automatic)',
    domainExpiry: 'Jan 2027',
    lastCheck: now.toISOString(),
    blogCategories: 6,
    emailAddresses: 7,
  })
}
