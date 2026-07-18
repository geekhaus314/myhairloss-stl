export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ message: 'Email service not configured. Please contact the site owner.' })
  }

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  const { name, email, phone, service, message, type } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' })
  }

  const subject = type === 'booking'
    ? `Booking Request: ${service || 'General'} from ${name}`
    : type === 'feedback'
    ? `Feedback from ${name}`
    : `New Inquiry from ${name}`

  const emailContent = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  New Inquiry — Brian Ivie Hair LLC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name:    ${name}
Email:   ${email}
Phone:   ${phone || 'Not provided'}
Service: ${service || 'Not specified'}
Type:    ${type || 'contact'}

Message:
${message}
  `

  try {
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
