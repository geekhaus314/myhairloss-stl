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
  const { name, email, phone, service, preferred_date, preferred_time, message, consultationType } = body

  if (!name || !email || !service || !preferred_date || !preferred_time) {
    return new Response(JSON.stringify({ message: 'Name, email, service, date, and time are required' }), { status: 400, headers })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ message: 'Invalid email address' }), { status: 400, headers })
  }

  const s = (v) => (typeof v === 'string' ? v.replace(/[<>]/g, '').trim() : '')
  const cleanName = s(name).slice(0, 100)
  const cleanPhone = s(phone || '').slice(0, 20)
  const cleanService = s(service).slice(0, 100)
  const cleanDate = s(preferred_date).slice(0, 20)
  const cleanTime = s(preferred_time).slice(0, 20)
  const cleanMessage = s(message || '').slice(0, 5000)
  const cleanType = s(consultationType || 'in-person').slice(0, 50)

  if (!cleanName || !cleanService) {
    return new Response(JSON.stringify({ message: 'Invalid input detected' }), { status: 400, headers })
  }

  const locationLabel = cleanType === 'virtual' ? 'Virtual (Zoom/Phone)' : 'In-Person — 3674 Ashby Rd, St. Ann, MO 63074'

  const adminBody = JSON.stringify({
    from: 'MYHAIRLOSS.COM <noreply@myhairloss.com>',
    to: ['booking@myhairloss.com'],
    replyTo: email,
    subject: `Booking: ${cleanService} — ${cleanName} (${cleanDate} @ ${cleanTime})`,
    text: `New Booking Request — MYHAIRLOSS.COM\n\nClient: ${cleanName}\nEmail: ${email}\nPhone: ${cleanPhone || 'N/A'}\nService: ${cleanService}\nType: ${locationLabel}\nDate: ${cleanDate}\nTime: ${cleanTime}\n\nNotes:\n${cleanMessage || 'None'}`,
  })

  const clientBody = JSON.stringify({
    from: 'Brian Ivie Hair & Extensions <noreply@myhairloss.com>',
    to: [email],
    subject: `Booking Confirmation — ${cleanService} on ${cleanDate}`,
    text: `Hi ${cleanName},\n\nThank you for booking with Brian Ivie Hair & Extensions.\n\nService: ${cleanService}\nType: ${locationLabel}\nDate: ${cleanDate}\nTime: ${cleanTime}\n\nWe'll confirm within 24 hours. Call (314) 583-4843 with questions.`,
  })

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST', headers: { 'Authorization': `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' }, body: adminBody,
    })
    await fetch('https://api.resend.com/emails', {
      method: 'POST', headers: { 'Authorization': `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' }, body: clientBody,
    })
    return new Response(JSON.stringify({ message: 'Booking request submitted successfully' }), { status: 200, headers })
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Failed to submit booking request' }), { status: 500, headers })
  }
}
