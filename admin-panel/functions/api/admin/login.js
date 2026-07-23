const rateLimitMap = new Map()
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000

function getClientIP(request) {
  return request.headers.get('CF-Connecting-IP') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

function cleanExpired() {
  const cutoff = Date.now() - WINDOW_MS * 2
  for (const [ip, entry] of rateLimitMap) {
    if (Date.now() - entry.windowStart > WINDOW_MS * 2) rateLimitMap.delete(ip)
  }
}

function checkRateLimit(ip) {
  const now = Date.now()
  let entry = rateLimitMap.get(ip)
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 0, windowStart: now })
    return { allowed: true, remaining: MAX_ATTEMPTS }
  }
  if (entry.count >= MAX_ATTEMPTS) {
    return { allowed: false, remaining: 0, retryAfter: Math.ceil((entry.windowStart + WINDOW_MS - now) / 1000) }
  }
  return { allowed: true, remaining: MAX_ATTEMPTS - entry.count }
}

function incrementRateLimit(ip) {
  const entry = rateLimitMap.get(ip)
  if (entry) {
    entry.count++
    if (entry.count >= MAX_ATTEMPTS * 10) cleanExpired()
  }
}

function resetRateLimit(ip) {
  rateLimitMap.delete(ip)
}

export async function onRequest(context) {
  const { request, env } = context
  const headers = { 'Content-Type': 'application/json' }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), { status: 405, headers })
  }

  const ip = getClientIP(request)
  const rateCheck = checkRateLimit(ip)
  if (!rateCheck.allowed) {
    return new Response(JSON.stringify({ message: 'Too many attempts. Try again later.', retryAfter: rateCheck.retryAfter }), { status: 429, headers })
  }

  const adminPassword = env.ADMIN_PASSWORD
  if (!adminPassword) {
    return new Response(JSON.stringify({ message: 'Admin not configured' }), { status: 500, headers })
  }

  let body
  try { body = await request.json() } catch (e) { return new Response(JSON.stringify({ message: 'Invalid JSON' }), { status: 400, headers }) }
  const { password } = body
  if (!password || password !== adminPassword) {
    incrementRateLimit(ip)
    return new Response(JSON.stringify({ message: 'Invalid password', remaining: rateCheck.remaining - 1 }), { status: 401, headers })
  }

  resetRateLimit(ip)

  const token = Date.now().toString(36) + '-' + adminPassword.slice(0, 6)

  return new Response(JSON.stringify({ token }), { status: 200, headers })
}
