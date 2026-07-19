const BASE = 'https://api.stripe.com/v1'

async function stripeFetch(path, options = {}) {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY not configured')
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${key}`,
      ...options.headers,
    },
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Stripe API error (${res.status}): ${err}`)
  }
  return res.json()
}

export const stripeTools = {
  stripe_balance: {
    description: 'Get Stripe account balance',
    execute: async () => stripeFetch('/balance'),
  },
  stripe_customers: {
    description: 'List recent Stripe customers',
    params: ['limit?'],
    execute: async ({ limit = 10 }) => stripeFetch(`/customers?limit=${limit}`),
  },
  stripe_products: {
    description: 'List all Stripe products',
    params: ['limit?'],
    execute: async ({ limit = 20 }) => stripeFetch(`/products?limit=${limit}`),
  },
  stripe_prices: {
    description: 'List all Stripe prices',
    params: ['limit?'],
    execute: async ({ limit = 20 }) => stripeFetch(`/prices?limit=${limit}`),
  },
  stripe_charges: {
    description: 'List recent charges/payments',
    params: ['limit?'],
    execute: async ({ limit = 10 }) => stripeFetch(`/charges?limit=${limit}`),
  },
  stripe_subscriptions: {
    description: 'List active subscriptions',
    params: ['limit?'],
    execute: async ({ limit = 20 }) => stripeFetch(`/subscriptions?limit=${limit}`),
  },
  stripe_account: {
    description: 'Get Stripe account details',
    execute: async () => stripeFetch('/account'),
  },
  stripe_payment_intents: {
    description: 'List recent payment intents',
    params: ['limit?'],
    execute: async ({ limit = 10 }) => stripeFetch(`/payment_intents?limit=${limit}`),
  },
}
