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
  const { name, email, phone, hairLossType, timeframe, concerns, preferredContact } = body

  if (!name || !email || !concerns) {
    return new Response(JSON.stringify({ message: 'Name, email, and concerns are required' }), { status: 400, headers })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ message: 'Invalid email address' }), { status: 400, headers })
  }

  const s = (v) => (typeof v === 'string' ? v.replace(/[<>]/g, '').trim() : '')
  const cleanName = s(name).slice(0, 100)
  const cleanPhone = s(phone || '').slice(0, 20)
  const cleanType = s(hairLossType || '').slice(0, 100)
  const cleanTimeframe = s(timeframe || '').slice(0, 50)
  const cleanConcerns = s(concerns).slice(0, 5000)
  const cleanContact = s(preferredContact || 'Email').slice(0, 20)

  if (!cleanName || !cleanConcerns) {
    return new Response(JSON.stringify({ message: 'Invalid input detected' }), { status: 400, headers })
  }

  const emailBody = JSON.stringify({
    from: 'MYHAIRLOSS.COM <noreply@myhairloss.com>',
    to: ['contact@myhairloss.com'],
    replyTo: email,
    subject: `Consultation: ${cleanName} - ${cleanType || 'Hair Loss'}`,
    text: `Consultation Inquiry — MYHAIRLOSS.COM\n\nName: ${cleanName}\nEmail: ${email}\nPhone: ${cleanPhone || 'N/A'}\nHair Loss Type: ${cleanType || 'N/A'}\nDuration: ${cleanTimeframe || 'N/A'}\nPreferred Contact: ${cleanContact}\n\nConcerns:\n${cleanConcerns}`,
  })

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST', headers: { 'Authorization': `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' }, body: emailBody,
    })
    return new Response(JSON.stringify({ message: 'Consultation inquiry sent successfully' }), { status: 200, headers })
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Failed to send inquiry' }), { status: 500, headers })
  }
}
