const rateLimit = {}

export function checkRateLimit(key, limit = 5, windowMs = 60000) {
  const now = Date.now()
  if (!rateLimit[key]) {
    rateLimit[key] = { count: 1, resetTime: now + windowMs }
    return true
  }
  if (now > rateLimit[key].resetTime) {
    rateLimit[key] = { count: 1, resetTime: now + windowMs }
    return true
  }
  if (rateLimit[key].count >= limit) {
    return false
  }
  rateLimit[key].count++
  return true
}

export function sanitizeInput(str) {
  if (typeof str !== 'string') return ''
  return str
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/\{.*\}/g, '')
    .trim()
    .slice(0, 5000)
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function getClientIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
         req.headers['x-real-ip'] || 
         'unknown'
}
