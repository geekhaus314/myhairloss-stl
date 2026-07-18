import Stripe from 'stripe'
import { checkRateLimit, sanitizeInput, getClientIP } from '../../lib/security'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const ip = getClientIP(req)
  if (!checkRateLimit(`checkout:${ip}`, 5, 60000)) {
    return res.status(429).json({ message: 'Too many requests. Please try again in a minute.' })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ message: 'Payment service not configured.' })
  }

  const { productId, productName, price } = req.body

  if (!productName || !price) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const cleanName = sanitizeInput(productName).slice(0, 200)
  const numPrice = parseFloat(price)

  if (!cleanName || isNaN(numPrice) || numPrice <= 0 || numPrice > 10000) {
    return res.status(400).json({ message: 'Invalid product data' })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: cleanName,
            description: 'Order from MYHAIRLOSS.COM - We\'ll contact you to confirm shipping details.',
          },
          unit_amount: Math.round(numPrice * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://myhairloss.com'}/shop?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://myhairloss.com'}/shop?canceled=true`,
      metadata: {
        productId: sanitizeInput(productId || 'unknown').slice(0, 100),
        productName: cleanName,
      },
    })

    res.status(200).json({ url: session.url })
  } catch (error) {
    console.error('Stripe error:', error)
    res.status(500).json({ message: 'Failed to create checkout session' })
  }
}
