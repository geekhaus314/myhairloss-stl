export async function onRequest(context) {
  const { request, env } = context
  const headers = { 'Content-Type': 'application/json' }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), { status: 405, headers })
  }

  const auth = request.headers.get('Authorization') || ''
  const token = auth.replace('Bearer ', '').trim()
  const adminPassword = env.ADMIN_PASSWORD

  if (!token || !adminPassword) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401, headers })
  }

  const parts = token.split('-')
  if (parts.length !== 2) {
    return new Response(JSON.stringify({ message: 'Invalid token' }), { status: 401, headers })
  }

  const timestamp = parseInt(parts[0], 36)
  const hash = parts[1]

  if (hash !== adminPassword.slice(0, 6) || !timestamp || Date.now() - timestamp > 86400000) {
    return new Response(JSON.stringify({ message: 'Invalid or expired token' }), { status: 401, headers })
  }

  if (!env.RESEND_API_KEY) {
    return new Response(JSON.stringify({ message: 'Email service not configured' }), { status: 500, headers })
  }

  const { messageId, to, subject, replyText } = await request.json()

  if (!to || !replyText) {
    return new Response(JSON.stringify({ message: 'Recipient and reply text are required' }), { status: 400, headers })
  }

  const s = (v) => (typeof v === 'string' ? v.replace(/[<>]/g, '').trim() : '')
  const cleanTo = s(to).slice(0, 200)
  const cleanSubject = s(subject ? `Re: ${subject}` : 'Re: MYHAIRLOSS.COM').slice(0, 200)
  const cleanReply = s(replyText).slice(0, 5000)

  if (!cleanTo || !cleanReply) {
    return new Response(JSON.stringify({ message: 'Invalid input' }), { status: 400, headers })
  }

  const adminEmail = env.ADMIN_EMAIL || 'brian@myhairloss.com'

  const emailBody = JSON.stringify({
    from: `Brian Ivie <${adminEmail}>`,
    to: [cleanTo],
    subject: cleanSubject,
    text: cleanReply,
    headers: messageId ? { 'In-Reply-To': `<${messageId}@admin.myhairloss.com>`, 'References': `<${messageId}@admin.myhairloss.com>` } : {},
  })

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: emailBody,
    })
    if (!res.ok) {
      const err = await res.json()
      return new Response(JSON.stringify({ message: err.message || 'Failed to send reply' }), { status: 500, headers })
    }
    return new Response(JSON.stringify({ message: 'Reply sent' }), { status: 200, headers })
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Failed to send reply' }), { status: 500, headers })
  }
}
