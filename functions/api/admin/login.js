export async function onRequest(context) {
  const { request, env } = context
  const headers = { 'Content-Type': 'application/json' }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), { status: 405, headers })
  }

  const adminPassword = env.ADMIN_PASSWORD
  if (!adminPassword) {
    return new Response(JSON.stringify({ message: 'Admin not configured' }), { status: 500, headers })
  }

  const { password } = await request.json()
  if (!password || password !== adminPassword) {
    return new Response(JSON.stringify({ message: 'Invalid password' }), { status: 401, headers })
  }

  const token = Date.now().toString(36) + '-' + adminPassword.slice(0, 6)

  return new Response(JSON.stringify({ token }), { status: 200, headers })
}
