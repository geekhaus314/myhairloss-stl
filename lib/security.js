const rateLimitStore = {}

export function checkRateLimit(key, limit = 5, windowMs = 60000) {
  const now = Date.now()
  if (!rateLimitStore[key] || now > rateLimitStore[key].resetTime) {
    rateLimitStore[key] = { count: 1, resetTime: now + windowMs }
    return true
  }
  if (rateLimitStore[key].count >= limit) return false
  rateLimitStore[key].count++
  return true
}

export function sanitizeInput(str) {
  if (typeof str !== 'string') return ''
  return str.replace(/[<>]/g, '').replace(/javascript:/gi, '').replace(/on\w+\s*=/gi, '').trim().slice(0, 5000)
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function getClientIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.headers['x-real-ip'] || 'unknown'
}
