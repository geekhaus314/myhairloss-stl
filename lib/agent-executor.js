import { safety } from './agent-safety'
import { cloudflareTools } from './agent-tools/cloudflare'
import { vercelTools } from './agent-tools/vercel'
import { githubTools } from './agent-tools/github'
import { stripeTools } from './agent-tools/stripe'
import { resendTools } from './agent-tools/resend'
import { godaddyTools } from './agent-tools/godaddy'
import { siteTools } from './agent-tools/site'

const ALL_TOOLS = {
  ...cloudflareTools,
  ...vercelTools,
  ...githubTools,
  ...stripeTools,
  ...resendTools,
  ...godaddyTools,
  ...siteTools,
}

const VALIDATION_PIPELINE = [
  { name: 'auth_check', description: 'Verify authentication credentials' },
  { name: 'rate_limit', description: 'Enforce rate limiting' },
  { name: 'input_sanitization', description: 'Sanitize and validate all inputs' },
  { name: 'param_validation', description: 'Validate required parameters' },
  { name: 'safety_check', description: 'Check destructive action guards' },
  { name: 'execute', description: 'Execute the tool' },
  { name: 'audit_log', description: 'Log the action to audit trail' },
]

function validateStep1_Auth(req) {
  const key = req.headers['x-agent-api-key'] || req.query.key
  const auth = req.headers.authorization
  const token = (key || (auth && auth.replace('Bearer ', '')))
  if (!token) return { pass: false, error: 'No credentials provided' }
  if (token === process.env.AGENT_API_KEY || token === process.env.ADMIN_PASSWORD) {
    return { pass: true, identity: token === process.env.AGENT_API_KEY ? 'agent' : 'admin' }
  }
  return { pass: false, error: 'Invalid credentials' }
}

function validateStep2_RateLimit(identifier) {
  const result = safety.checkRateLimit(identifier)
  if (!result.allowed) {
    return { pass: false, error: `Rate limit exceeded. ${result.remaining} requests remaining. Reset in ${Math.ceil(result.resetIn / 1000)}s.` }
  }
  return { pass: true, remaining: result.remaining }
}

function validateStep3_Sanitize(params) {
  const sanitized = {}
  for (const [key, val] of Object.entries(params || {})) {
    if (typeof val === 'string') {
      sanitized[key] = safety.sanitizeInput(val)
    } else {
      sanitized[key] = val
    }
  }
  return { pass: true, sanitized }
}

function validateStep4_Params(toolName, params, toolDef) {
  const result = safety.validateParams(toolName, params, toolDef)
  return { pass: result.valid, errors: result.errors }
}

function validateStep5_Safety(toolName, params) {
  if (!safety.isDestructive(toolName)) {
    return { pass: true, destructive: false }
  }
  if (params._confirmed === true) {
    return { pass: true, destructive: true, confirmed: true }
  }
  return {
    pass: false,
    destructive: true,
    requiresConfirmation: true,
    warning: `DESTRUCTIVE ACTION: ${toolName} requires explicit confirmation. Resend with _confirmed: true to proceed.`,
    action: toolName,
  }
}

async function validateStep6_Execute(toolName, toolDef, params) {
  const startTime = Date.now()
  try {
    const result = await toolDef.execute(params)
    const elapsed = Date.now() - startTime
    return { pass: true, result, elapsed }
  } catch (error) {
    return { pass: false, error: error.message, elapsed: Date.now() - startTime }
  }
}

function validateStep7_Audit(stepReports, toolName, status, meta) {
  safety.auditEntry(status, toolName, status, meta)
  return { pass: true, logSize: safety.getAuditLog().length }
}

function crossValidateResult(toolName, result) {
  if (result === null || result === undefined) return { valid: false, confidence: 0, issue: 'Null/undefined result' }
  if (typeof result === 'object' && result.error) return { valid: true, confidence: 0.3, issue: `Error in result: ${result.error}` }
  if (typeof result === 'string' && result.length === 0) return { valid: false, confidence: 0, issue: 'Empty string result' }
  if (typeof result === 'object') {
    if (Array.isArray(result) && result.length === 0) return { valid: true, confidence: 0.8, issue: 'Empty array (may be valid)' }
    return { valid: true, confidence: 0.95, issue: null }
  }
  return { valid: true, confidence: 0.9, issue: null }
}

export async function executeWithSafety(toolName, params, req) {
  const stepReports = []
  const workflowId = `wf_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

  const toolDef = ALL_TOOLS[toolName]
  if (!toolDef) {
    return {
      ok: false,
      error: `Unknown tool: ${toolName}`,
      available_tools: Object.keys(ALL_TOOLS),
      workflowId,
    }
  }

  // Step 1: Auth
  const s1 = validateStep1_Auth(req)
  stepReports.push(safety.generateStepReport(1, toolName, params, s1))
  if (!s1.pass) {
    safety.auditEntry('auth_failure', toolName, 'blocked', { workflowId })
    return { ok: false, error: s1.error, step: 1, workflowId }
  }

  // Step 2: Rate Limit
  const clientId = `${s1.identity}_${req.headers['x-agent-api-key'] || 'admin'}`
  const s2 = validateStep2_RateLimit(clientId)
  stepReports.push(safety.generateStepReport(2, toolName, params, s2))
  if (!s2.pass) {
    safety.auditEntry('rate_limited', toolName, 'blocked', { workflowId })
    return { ok: false, error: s2.error, step: 2, workflowId }
  }

  // Step 3: Sanitize
  const s3 = validateStep3_Sanitize(params)
  stepReports.push(safety.generateStepReport(3, toolName, params, s3))

  // Step 4: Param Validation
  const s4 = validateStep4_Params(toolName, s3.sanitized, toolDef)
  stepReports.push(safety.generateStepReport(4, toolName, s3.sanitized, s4))
  if (!s4.pass) {
    safety.auditEntry('validation_failure', toolName, 'rejected', { workflowId, errors: s4.errors })
    return { ok: false, error: `Parameter validation failed: ${s4.errors.join(', ')}`, step: 4, workflowId }
  }

  // Step 5: Safety Check
  const s5 = validateStep5_Safety(toolName, s3.sanitized)
  stepReports.push(safety.generateStepReport(5, toolName, s3.sanitized, s5))
  if (!s5.pass) {
    safety.auditEntry('safety_blocked', toolName, 'blocked', { workflowId, destructive: true })
    return { ok: false, error: s5.warning, requiresConfirmation: true, action: toolName, step: 5, workflowId }
  }

  // Step 6: Execute
  const s6 = await validateStep6_Execute(toolName, toolDef, s3.sanitized)
  stepReports.push(safety.generateStepReport(6, toolName, s3.sanitized, s6.pass ? 'success' : 'error'))

  if (!s6.pass) {
    safety.auditEntry('execution_error', toolName, 'error', { workflowId, error: s6.error, elapsed: s6.elapsed })
    return { ok: false, error: s6.error, step: 6, elapsed: s6.elapsed, workflowId }
  }

  // Step 7: Cross-validate + Audit
  const crossValidation = crossValidateResult(toolName, s6.result)
  safety.auditEntry('success', toolName, 'success', {
    workflowId,
    elapsed: s6.elapsed,
    confidence: crossValidation.confidence,
  })
  stepReports.push(safety.generateStepReport(7, toolName, params, 'logged'))

  return {
    ok: true,
    tool: toolName,
    result: s6.result,
    elapsed: s6.elapsed,
    workflowId,
    validation: {
      stepsCompleted: 7,
      confidence: crossValidation.confidence,
      crossValidation: crossValidation.issue,
      rateLimitRemaining: s2.remaining,
    },
  }
}

export function listAvailableTools() {
  return Object.entries(ALL_TOOLS).map(([name, def]) => ({
    name,
    description: def.description,
    params: def.params || [],
    destructive: safety.isDestructive(name),
  }))
}
