import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { productId, productName, price } = req.body

  if (!productName || !price) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: productName,
            description: 'Order from MYHAIRLOSS.COM - We\'ll contact you to confirm shipping details.',
          },
          unit_amount: Math.round(price * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://myhairloss.com'}/shop?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://myhairloss.com'}/shop?canceled=true`,
      metadata: {
        productId: productId || 'unknown',
        productName,
      },
    })

    res.status(200).json({ url: session.url })
  } catch (error) {
    console.error('Stripe error:', error)
    res.status(500).json({ message: 'Failed to create checkout session' })
  }
}
