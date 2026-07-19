const auditLog = []
const MAX_LOG_SIZE = 1000
const RATE_LIMIT = {}
const RATE_WINDOW_MS = 60000
const MAX_REQUESTS_PER_WINDOW = 30

const DESTRUCTIVE_ACTIONS = [
  'cf_delete_dns', 'cf_purge_cache',
  'gd_lock_domain',
  'gh_file_commit', 'gh_delete_blog_post',
  'vercel_delete_env', 'vercel_trigger_deploy',
  'resend_send_email',
  'stripe_update', 'stripe_create', 'stripe_delete',
]

const SECRET_KEYS = [
  'password', 'secret', 'token', 'api_key', 'apikey',
  'authorization', 'cookie', 'auth_code', 'private_key',
  'stripe_secret_key', 'cloudflare_api_token', 'github_token',
]

function maskValue(value) {
  if (typeof value !== 'string') return value
  if (SECRET_KEYS.some(k => value.toLowerCase().includes(k))) return '[REDACTED]'
  if (/^(sk_live_|pk_live_|re_|cfut_|ghp_|gho_|vcp_)/.test(value)) {
    return value.slice(0, 6) + '...' + value.slice(-4)
  }
  return value
}

function maskObject(obj) {
  if (typeof obj !== 'object' || obj === null) return maskValue(String(obj))
  if (Array.isArray(obj)) return obj.map(maskObject)
  const masked = {}
  for (const [k, v] of Object.entries(obj)) {
    const lower = k.toLowerCase()
    if (SECRET_KEYS.some(sk => lower.includes(sk))) {
      masked[k] = v ? '[REDACTED]' : null
    } else {
      masked[k] = maskObject(v)
    }
  }
  return masked
}

function auditEntry(action, tool, status, meta = {}) {
  const entry = {
    timestamp: new Date().toISOString(),
    action,
    tool,
    status,
    ...meta,
  }
  auditLog.unshift(entry)
  if (auditLog.length > MAX_LOG_SIZE) auditLog.length = MAX_LOG_SIZE
  return entry
}

function checkRateLimit(identifier) {
  const now = Date.now()
  if (!RATE_LIMIT[identifier]) RATE_LIMIT[identifier] = []
  RATE_LIMIT[identifier] = RATE_LIMIT[identifier].filter(t => now - t < RATE_WINDOW_MS)
  if (RATE_LIMIT[identifier].length >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0, resetIn: RATE_WINDOW_MS - (now - RATE_LIMIT[identifier][0]) }
  }
  RATE_LIMIT[identifier].push(now)
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - RATE_LIMIT[identifier].length }
}

function isDestructive(toolName) {
  return DESTRUCTIVE_ACTIONS.includes(toolName)
}

function validateParams(toolName, params, toolDef) {
  const errors = []
  if (!toolDef.params || toolDef.params.length === 0) return { valid: true, errors: [] }
  for (const param of toolDef.params) {
    const required = !param.endsWith('?')
    const name = param.replace('?', '')
    if (required && (!params[name] || params[name] === '')) {
      errors.push(`Missing required parameter: ${name}`)
    }
  }
  for (const [key, val] of Object.entries(params)) {
    if (typeof val === 'string' && val.length > 10000) {
      errors.push(`Parameter ${key} exceeds maximum length (10000 chars)`)
    }
  }
  return { valid: errors.length === 0, errors }
}

function sanitizeInput(input) {
  if (typeof input !== 'string') return input
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
    .slice(0, 5000)
}

function detectQualityDecay(steps) {
  if (steps.length < 2) return { decaying: false }
  const recent = steps.slice(-5)
  const errorRate = recent.filter(s => s.status === 'error').length / recent.length
  const avgConfidence = recent.reduce((sum, s) => sum + (s.confidence || 1), 0) / recent.length
  return {
    decaying: errorRate > 0.4 || avgConfidence < 0.5,
    errorRate,
    avgConfidence,
    message: errorRate > 0.4
      ? `High error rate detected (${Math.round(errorRate * 100)}%). Halting workflow.`
      : avgConfidence < 0.5
        ? `Low confidence detected (${Math.round(avgConfidence * 100)}%). Halting workflow.`
        : null,
  }
}

function generateStepReport(stepNum, tool, params, result) {
  return {
    step: stepNum,
    tool,
    params: maskObject(params),
    resultPreview: typeof result === 'string' ? result.slice(0, 200) : JSON.stringify(result).slice(0, 200),
    timestamp: new Date().toISOString(),
  }
}

export const safety = {
  maskValue,
  maskObject,
  auditEntry,
  checkRateLimit,
  isDestructive,
  validateParams,
  sanitizeInput,
  detectQualityDecay,
  generateStepReport,
  getAuditLog: () => [...auditLog].slice(0, 100),
  DESTRUCTIVE_ACTIONS,
  SECRET_KEYS,
}
