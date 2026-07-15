import Stripe from 'stripe'
import { Resend } from 'resend'
import { NOTIFY_EMAIL, FROM_EMAIL } from '../../lib/email-config'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const resend = new Resend(process.env.RESEND_API_KEY)

// Stripe requires the raw, unparsed request body to verify the signature.
export const config = {
  api: {
    bodyParser: false,
  },
}

async function buffer(readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

function formatPrice(cents) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format((cents || 0) / 100)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method not allowed')
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('[v0] STRIPE_WEBHOOK_SECRET is not set')
    return res.status(500).send('Webhook not configured')
  }

  const rawBody = await buffer(req)
  const signature = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err) {
    console.error('[v0] Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        { limit: 100 }
      )

      const itemsHtml = lineItems.data
        .map(
          (li) =>
            `<tr>
              <td style="padding:8px 16px;color:#333;">${li.quantity} × ${li.description}</td>
              <td style="padding:8px 16px;color:#333;text-align:right;">${formatPrice(
                li.amount_total
              )}</td>
            </tr>`
        )
        .join('')

      const customer = session.customer_details || {}
      const shipping = session.shipping_details || session.collected_information?.shipping_details

      const html = `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0a0a0a;color:#c5a059;padding:24px;text-align:center;">
            <h1 style="margin:0;font-size:18px;letter-spacing:4px;">MYHAIRLOSS.COM</h1>
            <p style="margin:8px 0 0;font-size:12px;color:#fff;text-transform:uppercase;letter-spacing:2px;">New Product Order</p>
          </div>
          <table style="width:100%;border-collapse:collapse;background:#fff;">
            ${itemsHtml}
            <tr>
              <td style="padding:12px 16px;font-weight:bold;border-top:2px solid #0a0a0a;">Total Paid</td>
              <td style="padding:12px 16px;font-weight:bold;text-align:right;border-top:2px solid #0a0a0a;">${formatPrice(
                session.amount_total
              )}</td>
            </tr>
          </table>
          <div style="padding:16px;color:#333;font-size:14px;">
            <p style="margin:4px 0;"><strong>Customer:</strong> ${customer.name || '—'}</p>
            <p style="margin:4px 0;"><strong>Email:</strong> ${customer.email || '—'}</p>
            <p style="margin:4px 0;"><strong>Phone:</strong> ${customer.phone || '—'}</p>
            ${
              shipping
                ? `<p style="margin:4px 0;"><strong>Ship to:</strong><br/>${shipping.name || ''}<br/>${[
                    shipping.address?.line1,
                    shipping.address?.line2,
                    shipping.address?.city,
                    shipping.address?.state,
                    shipping.address?.postal_code,
                  ]
                    .filter(Boolean)
                    .join(', ')}</p>`
                : ''
            }
          </div>
        </div>
      `

      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: NOTIFY_EMAIL,
          replyTo: customer.email || undefined,
          subject: `New Order — ${formatPrice(session.amount_total)} — ${
            customer.name || 'Customer'
          }`,
          html,
        })
      }
    } catch (err) {
      console.error('[v0] Failed to process completed checkout:', err.message)
      // Still acknowledge so Stripe doesn't retry indefinitely.
    }
  }

  return res.status(200).json({ received: true })
}
