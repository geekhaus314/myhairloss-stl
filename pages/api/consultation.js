export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  const { name, email, phone, hairLossType, timeframe, concerns, preferredContact } = req.body

  if (!name || !email || !concerns) {
    return res.status(400).json({ message: 'Name, email, and concerns are required' })
  }

  const emailContent = `
New Consultation Inquiry
========================

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Type of Hair Loss: ${hairLossType || 'Not specified'}
How Long: ${timeframe || 'Not specified'}
Preferred Contact: ${preferredContact || 'Email'}

Concerns/Goals:
${concerns}

---
This inquiry was submitted through MYHAIRLOSS.COM consultation form.
  `

  try {
    await resend.emails.send({
      from: 'MYHAIRLOSS.COM <noreply@myhairloss.com>',
      to: ['info@myhairloss.com'],
      replyTo: email,
      subject: `Consultation Inquiry: ${name} - ${hairLossType || 'Hair Loss'}`,
      text: emailContent,
    })

    res.status(200).json({ message: 'Consultation inquiry sent successfully' })
  } catch (error) {
    console.error('Email error:', error)
    res.status(500).json({ message: 'Failed to send inquiry' })
  }
}
