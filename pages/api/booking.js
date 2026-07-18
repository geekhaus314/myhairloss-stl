import { checkRateLimit, sanitizeInput, validateEmail, getClientIP } from '../../lib/security'

export default async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const ip = getClientIP(req)
  if (!checkRateLimit(`booking:${ip}`, 3, 60000)) {
    return res.status(429).json({ message: 'Too many requests. Please try again in a minute.' })
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ message: 'Email service not configured.' })
  }

  const { name, email, phone, service, preferred_date, preferred_time, message, consultationType, type } = req.body

  if (!name || !email || !service || !preferred_date || !preferred_time) {
    return res.status(400).json({ message: 'Name, email, service, date, and time are required' })
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email address' })
  }

  const cleanName = sanitizeInput(name).slice(0, 100)
  const cleanPhone = sanitizeInput(phone || '').slice(0, 20)
  const cleanService = sanitizeInput(service).slice(0, 100)
  const cleanDate = sanitizeInput(preferred_date).slice(0, 20)
  const cleanTime = sanitizeInput(preferred_time).slice(0, 20)
  const cleanMessage = sanitizeInput(message || '').slice(0, 5000)
  const cleanType = sanitizeInput(consultationType || 'in-person').slice(0, 50)

  if (!cleanName || !cleanService) {
    return res.status(400).json({ message: 'Invalid input detected' })
  }

  const locationLabel = cleanType === 'virtual' ? 'Virtual (Zoom/Phone)' : 'In-Person — 3674 Ashby Rd, St. Ann, MO 63074'

  const adminContent = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  New Booking Request — MYHAIRLOSS.COM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Client:         ${cleanName}
Email:          ${email}
Phone:          ${cleanPhone || 'Not provided'}
Service:        ${cleanService}
Type:           ${locationLabel}
Preferred Date: ${cleanDate}
Preferred Time: ${cleanTime}

Notes:
${cleanMessage || 'None'}
  `

  const clientContent = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Brian Ivie Hair & Extensions
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hi ${cleanName},

Thank you for booking a consultation with Brian Ivie Hair & Extensions. Here are the details of your request:

Service:        ${cleanService}
Type:           ${locationLabel}
Preferred Date: ${cleanDate}
Preferred Time: ${cleanTime}

Brian will review your request and reach out within 24 hours to confirm your appointment. If you need to reschedule or have questions, please call us at (314) 583-4843 or reply to this email.

We look forward to seeing you.

Brian Ivie Hair & Extensions
3674 Ashby Rd, St. Ann, MO 63074
(314) 583-4843 | info@myhairloss.com
  `

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Send notification to studio
    await resend.emails.send({
      from: 'MYHAIRLOSS.COM <noreply@myhairloss.com>',
      to: ['info@myhairloss.com'],
      replyTo: email,
      subject: `Booking: ${cleanService} — ${cleanName} (${cleanDate} @ ${cleanTime})`,
      text: adminContent,
    })

    // Send confirmation to client
    await resend.emails.send({
      from: 'Brian Ivie Hair & Extensions <noreply@myhairloss.com>',
      to: [email],
      subject: `Booking Confirmation — ${cleanService} on ${cleanDate}`,
      text: clientContent,
    })

    res.status(200).json({ message: 'Booking request submitted successfully' })
  } catch (error) {
    console.error('Booking email error:', error)
    res.status(500).json({ message: 'Failed to submit booking request' })
  }
}
