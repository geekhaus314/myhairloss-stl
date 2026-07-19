const WHITELIST_IPS = ['99.17.39.34']
const ADMIN_SECRET = process.env.AGENT_API_KEY

function getClientIp(req) {
  return req.headers.get('cf-connecting-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip')
}

export default function middleware(req) {
  const { pathname } = req.nextUrl
  if (!pathname.startsWith('/admin/') && pathname !== '/admin') return
  if (pathname.startsWith('/api/')) return
  if (pathname === '/admin/login') return
  if (pathname === '/admin/setup-2fa') return

  const clientIp = getClientIp(req)
  if (clientIp && WHITELIST_IPS.includes(clientIp)) return

  const hasApiKey = req.headers.get('x-agent-api-key') === ADMIN_SECRET ||
    req.headers.get('authorization')?.replace('Bearer ', '') === ADMIN_SECRET
  if (hasApiKey) return

  const hasCookie = req.cookies.get('admin_token')?.value
  if (hasCookie) return

  return new Response(null, { status: 404 })
}

export const config = {
  matcher: ['/admin/:path*', '/admin'],
}
