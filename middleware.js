const ADMIN_SECRET = process.env.AGENT_API_KEY

export default function middleware(req) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith('/admin/') && pathname !== '/admin') return
  if (pathname.startsWith('/api/')) return

  const hasApiKey = req.headers.get('x-agent-api-key') === ADMIN_SECRET ||
    req.headers.get('authorization')?.replace('Bearer ', '') === ADMIN_SECRET

  if (hasApiKey) return

  if (pathname === '/admin/login') return

  const hasCookie = req.cookies.get('admin_token')?.value
  if (hasCookie) return

  return new Response(null, { status: 404 })
}

export const config = {
  matcher: ['/admin/:path*', '/admin'],
}
