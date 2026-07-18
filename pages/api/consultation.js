import { checkRateLimit, sanitizeInput, validateEmail, getClientIP } from '../../lib/security'

export default async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const ip = getClientIP(req)
  if (!checkRateLimit(`consultation:${ip}`, 3, 60000)) {
    return res.status(429).json({ message: 'Too many requests. Please try again in a minute.' })
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ message: 'Email service not configured.' })
  }

  const { name, email, phone, hairLossType, timeframe, concerns, preferredContact } = req.body

  if (!name || !email || !concerns) {
    return res.status(400).json({ message: 'Name, email, and concerns are required' })
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email address' })
  }

  const cleanName = sanitizeInput(name).slice(0, 100)
  const cleanPhone = sanitizeInput(phone || '').slice(0, 20)
  const cleanHairLossType = sanitizeInput(hairLossType || '').slice(0, 100)
  const cleanTimeframe = sanitizeInput(timeframe || '').slice(0, 50)
  const cleanConcerns = sanitizeInput(concerns).slice(0, 5000)
  const cleanPreferredContact = sanitizeInput(preferredContact || 'Email').slice(0, 20)

  if (!cleanName || !cleanConcerns) {
    return res.status(400).json({ message: 'Invalid input detected' })
  }

  const emailContent = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Consultation Inquiry — MYHAIRLOSS.COM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name:            ${cleanName}
Email:           ${email}
Phone:           ${cleanPhone || 'Not provided'}
Type of Hair Loss: ${cleanHairLossType || 'Not specified'}
How Long:        ${cleanTimeframe || 'Not specified'}
Preferred Contact: ${cleanPreferredContact}

Concerns/Goals:
${cleanConcerns}
  `

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'MYHAIRLOSS.COM <noreply@myhairloss.com>',
      to: ['info@myhairloss.com'],
      replyTo: email,
      subject: `Consultation: ${cleanName} - ${cleanHairLossType || 'Hair Loss'}`,
      text: emailContent,
    })

    res.status(200).json({ message: 'Consultation inquiry sent successfully' })
  } catch (error) {
    console.error('Email error:', error)
    res.status(500).json({ message: 'Failed to send inquiry' })
  }
}
