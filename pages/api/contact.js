import { checkRateLimit, sanitizeInput, validateEmail, getClientIP } from '../../lib/security'

export default async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const ip = getClientIP(req)
  if (!checkRateLimit(`contact:${ip}`, 3, 60000)) {
    return res.status(429).json({ message: 'Too many requests. Please try again in a minute.' })
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ message: 'Email service not configured.' })
  }

  const { name, email, phone, service, message, type } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' })
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email address' })
  }

  const cleanName = sanitizeInput(name).slice(0, 100)
  const cleanPhone = sanitizeInput(phone || '').slice(0, 20)
  const cleanService = sanitizeInput(service || '').slice(0, 100)
  const cleanMessage = sanitizeInput(message).slice(0, 5000)

  if (!cleanName || !cleanMessage) {
    return res.status(400).json({ message: 'Invalid input detected' })
  }

  const subject = type === 'booking'
    ? `Booking Request: ${cleanService || 'General'} from ${cleanName}`
    : type === 'feedback'
    ? `Feedback from ${cleanName}`
    : `New Inquiry from ${cleanName}`

  const emailContent = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  New Inquiry — Brian Ivie Hair LLC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name:    ${cleanName}
Email:   ${email}
Phone:   ${cleanPhone || 'Not provided'}
Service: ${cleanService || 'Not specified'}
Type:    ${type || 'contact'}

Message:
${cleanMessage}
  `

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'myhairloss.com <noreply@myhairloss.com>',
      to: ['info@myhairloss.com'],
      replyTo: email,
      subject,
      text: emailContent,
    })

    res.status(200).json({ message: 'Inquiry sent successfully' })
  } catch (error) {
    console.error('Email error:', error)
    res.status(500).json({ message: 'Failed to send inquiry' })
  }
}
