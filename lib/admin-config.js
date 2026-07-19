export const ADMIN_CONFIG = {
  siteName: 'Brian Ivie Hair & Extensions',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://myhairloss.com',
  adminUrl: process.env.NEXT_PUBLIC_ADMIN_URL || 'https://admin.myhairloss.com',
  adminPassword: process.env.ADMIN_PASSWORD,
  agentApiKey: process.env.AGENT_API_KEY,
  vercelToken: process.env.VERCEL_TOKEN,
  vercelProjectId: process.env.VERCEL_PROJECT_ID || 'prj_f0FVyn4MUOvN0vrqnzjvHjWbgQzz',
  resendApiKey: process.env.RESEND_API_KEY,
}

export function verifyAdminAuth(req) {
  const authHeader = req.headers.authorization || req.headers.cookie
  if (!authHeader) return false
  const token = authHeader.replace('Bearer ', '').replace('admin_token=', '')
  return token === ADMIN_CONFIG.adminPassword
}

export function verifyAgentAuth(req) {
  const apiKey = req.headers['x-agent-api-key'] || req.query.key
  return apiKey === ADMIN_CONFIG.agentApiKey
}
