import Stripe from 'stripe'
import { productsById } from '../../lib/products'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res
      .status(500)
      .json({ error: 'Payments are not configured yet. Please try again later.' })
  }

  try {
    const { items } = req.body || {}

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Your cart is empty.' })
    }

    // Build line items from the server-side catalog so prices can never be
    // tampered with by the client — we only trust the product id + quantity.
    const line_items = []
    for (const item of items) {
      const product = productsById[item?.id]
      const quantity = Number.parseInt(item?.quantity, 10)
      if (!product || !Number.isFinite(quantity) || quantity < 1) {
        return res.status(400).json({ error: 'Invalid item in cart.' })
      }
      line_items.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.desc,
          },
          unit_amount: product.priceCents,
        },
        quantity: Math.min(quantity, 99),
      })
    }

    const origin =
      req.headers.origin ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      `https://${req.headers.host}`

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      billing_address_collection: 'auto',
      shipping_address_collection: { allowed_countries: ['US'] },
      phone_number_collection: { enabled: true },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#products`,
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('[v0] Stripe checkout error:', err.message)
    return res
      .status(500)
      .json({ error: 'Unable to start checkout. Please try again.' })
  }
}
