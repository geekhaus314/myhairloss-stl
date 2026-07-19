import { executeWithSafety, listAvailableTools } from '../../../lib/agent-executor'
import { safety } from '../../../lib/agent-safety'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({
      tools: listAvailableTools(),
      total: listAvailableTools().length,
      safety: {
        rateLimit: '30 requests/minute',
        destructiveActionGuard: 'Requires _confirmed: true',
        auditLogging: 'All actions logged',
        secretMasking: 'All credentials redacted',
      },
    })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' })
  }

  const { tool, params = {} } = req.body || {}

  if (!tool) {
    return res.status(400).json({ error: 'Missing "tool" parameter' })
  }

  const result = await executeWithSafety(tool, params, req)

  const statusCode = result.ok ? 200 : (result.step === 1 ? 401 : result.step === 5 ? 403 : 400)
  return res.status(statusCode).json(result)
}

export function getAuditLog() {
  return safety.getAuditLog()
}
