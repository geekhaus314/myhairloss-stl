export async function onRequest(context) {
  const { request, env } = context
  const headers = { 'Content-Type': 'application/json' }

  if (request.method !== 'GET') {
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

  try {
    const res = await fetch('https://api.resend.com/emails?limit=50', {
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}` },
    })
    const emails = await res.json()

    if (!res.ok || !emails.data) {
      return new Response(JSON.stringify({ inquiries: 0, bookings: 0, contacts: 0, messages: [] }), { status: 200, headers })
    }

    const relevant = emails.data.filter((e) => e.subject && (e.subject.includes('Inquiry') || e.subject.includes('Booking') || e.subject.includes('Contact')))

    const details = await Promise.allSettled(
      relevant.map((e) =>
        fetch(`https://api.resend.com/emails/${e.id}`, {
          headers: { Authorization: `Bearer ${env.RESEND_API_KEY}` },
        }).then((r) => r.json()).then((d) => ({ id: e.id, text: d.text || '', replyTo: (d.reply_to && d.reply_to[0]) || '' }))
      )
    )
    const detailMap = {}
    for (const d of details) {
      if (d.status === 'fulfilled' && d.value) detailMap[d.value.id] = d.value
    }

    const messages = relevant.map((e) => {
      const s = e.subject || ''
      const type = s.includes('Booking') ? 'booking' : s.includes('Inquiry') ? 'inquiry' : 'contact'
      const name = s.replace(/.*(?:from|by) /, '').trim() || 'Unknown'
      const prodMatch = s.match(/(?:Product Inquiry|Booking Request): (.+?) (?:from|by)/)
      const detail = detailMap[e.id] || {}
      const rawText = detail.text || ''
      const body = rawText.replace(/New (Product Inquiry|Contact) .*?\n{2,}/s, '').trim() || s
      const replyTo = detail.replyTo || ''
      const emailMatch = body.match(/Email:\s*(\S+@\S+)/)
      const customerEmail = replyTo || (emailMatch ? emailMatch[1] : e.from_email || e.from || '')
      return {
        id: e.id,
        name,
        email: customerEmail,
        phone: '',
        service: prodMatch ? prodMatch[1].trim() : '',
        type,
        message: body,
        subject: s,
        createdAt: e.created_at || e.last_event_at || new Date().toISOString(),
      }
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    return new Response(JSON.stringify({
      inquiries: messages.filter((m) => m.type === 'inquiry').length,
      bookings: messages.filter((m) => m.type === 'booking').length,
      contacts: messages.filter((m) => m.type === 'contact').length,
      messages: messages.slice(0, 50),
    }), { status: 200, headers })
  } catch (err) {
    return new Response(JSON.stringify({ inquiries: 0, bookings: 0, contacts: 0, messages: [] }), { status: 200, headers })
  }
}
