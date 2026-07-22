export async function onRequest(context) {
  const { request, env } = context
  const headers = { 'Content-Type': 'application/json' }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), { status: 405, headers })
  }

  if (!env.RESEND_API_KEY) {
    return new Response(JSON.stringify({ message: 'Email service not configured.' }), { status: 500, headers })
  }

  const body = await request.json()
  const { name, email, phone, service, message, type } = body

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ message: 'Name, email, and message are required' }), { status: 400, headers })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ message: 'Invalid email address' }), { status: 400, headers })
  }

  const s = (v) => (typeof v === 'string' ? v.replace(/[<>]/g, '').trim() : '')
  const cleanName = s(name).slice(0, 100)
  const cleanPhone = s(phone || '').slice(0, 20)
  const cleanService = s(service || '').slice(0, 100)
  const cleanMessage = s(message).slice(0, 5000)

  if (!cleanName || !cleanMessage) {
    return new Response(JSON.stringify({ message: 'Invalid input detected' }), { status: 400, headers })
  }

  const subject = type === 'booking'
    ? `Booking Request: ${cleanService || 'General'} from ${cleanName}`
    : type === 'feedback'
    ? `Feedback from ${cleanName}`
    : `New Inquiry from ${cleanName}`

  const emailBody = JSON.stringify({
    from: 'myhairloss.com <noreply@myhairloss.com>',
    to: ['contact@myhairloss.com'],
    replyTo: email,
    subject,
    text: `New Inquiry — Brian Ivie Hair & Extensions\n\nName: ${cleanName}\nEmail: ${email}\nPhone: ${cleanPhone || 'N/A'}\nService: ${cleanService || 'N/A'}\nType: ${type || 'contact'}\n\nMessage:\n${cleanMessage}`,
  })

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST', headers: { 'Authorization': `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' }, body: emailBody,
    })
    return new Response(JSON.stringify({ message: 'Inquiry sent successfully' }), { status: 200, headers })
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Failed to send inquiry' }), { status: 500, headers })
  }
}
