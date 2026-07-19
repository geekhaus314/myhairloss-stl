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
  stripe_create_invoice: {
    description: 'Create and send an invoice to a customer email',
    params: ['email', 'amount', 'description?', 'days_until_due?'],
    execute: async ({ email, amount, description = 'Hair loss consultation', days_until_due = 30 }) => {
      let customer
      const existing = await stripeFetch(`/customers?email=${encodeURIComponent(email)}&limit=1`)
      if (existing.data?.length > 0) {
        customer = existing.data[0]
      } else {
        customer = await stripeFetch('/customers', {
          method: 'POST',
          body: new URLSearchParams({ email }).toString(),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
      }

      const invoice = await stripeFetch('/invoices', {
        method: 'POST',
        body: new URLSearchParams({
          customer: customer.id,
          'days_until_due': String(days_until_due),
          auto_advance: 'true',
        }).toString(),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })

      await stripeFetch('/invoiceitems', {
        method: 'POST',
        body: new URLSearchParams({
          customer: customer.id,
          invoice: invoice.id,
          amount: String(Math.round(parseFloat(amount) * 100)),
          currency: 'usd',
          description,
        }).toString(),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })

      const finalized = await stripeFetch(`/invoices/${invoice.id}/finalize`, {
        method: 'POST',
        body: '{}',
      })

      return {
        invoiceId: finalized.id,
        status: finalized.status,
        amount: `$${(finalized.amount_due / 100).toFixed(2)}`,
        customer: email,
        description,
        pdf: finalized.invoice_pdf,
        hosted: finalized.hosted_invoice_url,
      }
    }
  },
  stripe_list_invoices: {
    description: 'List recent invoices',
    params: ['limit?'],
    execute: async ({ limit = 10 }) => stripeFetch(`/invoices?limit=${limit}`),
  },
  stripe_upcoming_invoice: {
    description: 'Preview what a customer would be billed for',
    params: ['customer_id?'],
    execute: async ({ customer_id }) => {
      if (!customer_id) throw new Error('customer_id is required')
      return stripeFetch(`/invoices/preview?customer=${customer_id}`)
    }
  },
}
