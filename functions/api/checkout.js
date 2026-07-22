export async function onRequest(context) {
  const { request, env } = context
  const headers = { 'Content-Type': 'application/json' }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), { status: 405, headers })
  }

  if (!env.STRIPE_SECRET_KEY) {
    return new Response(JSON.stringify({ message: 'Payment service not configured.' }), { status: 500, headers })
  }

  const body = await request.json()
  const { productName, price } = body

  if (!productName || !price) {
    return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400, headers })
  }

  const cleanName = productName.replace(/[<>]/g, '').trim().slice(0, 200)
  const numPrice = parseFloat(price)

  if (!cleanName || isNaN(numPrice) || numPrice <= 0 || numPrice > 10000) {
    return new Response(JSON.stringify({ message: 'Invalid product data' }), { status: 400, headers })
  }

  const siteUrl = env.NEXT_PUBLIC_SITE_URL || 'https://myhairloss.com'

  try {
    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'mode': 'payment',
        'success_url': `${siteUrl}/shop?success=true`,
        'cancel_url': `${siteUrl}/shop?canceled=true`,
        'line_items[0][price_data][currency]': 'usd',
        'line_items[0][price_data][product_data][name]': cleanName,
        'line_items[0][price_data][product_data][description]': 'Order from MYHAIRLOSS.COM',
        'line_items[0][price_data][unit_amount]': String(Math.round(numPrice * 100)),
        'line_items[0][quantity]': '1',
      }),
    })

    const session = await stripeRes.json()

    if (!stripeRes.ok) {
      return new Response(JSON.stringify({ message: session.error?.message || 'Stripe error' }), { status: 500, headers })
    }

    return new Response(JSON.stringify({ url: session.url }), { status: 200, headers })
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Failed to create checkout session' }), { status: 500, headers })
  }
}
