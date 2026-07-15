import { Resend } from 'resend'
import { NOTIFY_EMAIL, FROM_EMAIL } from '../../lib/email-config'

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function row(label, value) {
  if (!value) return ''
  return `<tr>
    <td style="padding:8px 16px;font-weight:bold;color:#0a0a0a;white-space:nowrap;vertical-align:top;">${escapeHtml(
      label
    )}</td>
    <td style="padding:8px 16px;color:#333;">${escapeHtml(value).replace(
      /\n/g,
      '<br/>'
    )}</td>
  </tr>`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.RESEND_API_KEY) {
    return res
      .status(500)
      .json({ error: 'Email is not configured yet. Please call the studio.' })
  }

  const {
    name,
    email,
    phone,
    service,
    preferred_date,
    message,
    type = 'contact',
  } = req.body || {}

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' })
  }

  const isBooking = type === 'booking'
  const subject = isBooking
    ? `New Booking Request — ${name}`
    : `New Contact Inquiry — ${name}`

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#0a0a0a;color:#c5a059;padding:24px;text-align:center;">
        <h1 style="margin:0;font-size:18px;letter-spacing:4px;">MYHAIRLOSS.COM</h1>
        <p style="margin:8px 0 0;font-size:12px;color:#fff;text-transform:uppercase;letter-spacing:2px;">
          ${isBooking ? 'Appointment Request' : 'Website Inquiry'}
        </p>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#fff;">
        ${row('Name', name)}
        ${row('Email', email)}
        ${row('Phone', phone)}
        ${row('Service', service)}
        ${row('Preferred Date', preferred_date)}
        ${row('Message', message)}
      </table>
      <p style="padding:16px;color:#999;font-size:12px;text-align:center;">
        Reply directly to this email to respond to ${escapeHtml(name)}.
      </p>
    </div>
  `

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject,
      html,
    })

    if (error) {
      console.error('[v0] Resend error:', error)
      return res.status(502).json({ error: 'Failed to send. Please try again.' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[v0] Contact API error:', err.message)
    return res.status(500).json({ error: 'Failed to send. Please try again.' })
  }
}
