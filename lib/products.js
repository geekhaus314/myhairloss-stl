// Central product catalog for the storefront + Stripe checkout.
// Edit prices here anytime. `priceCents` is the amount charged in US cents
// (e.g. 2999 = $29.99). `id` must stay stable — it's what the cart and the
// Stripe checkout API use to look each product up.

export const products = [
  {
    id: 'professional-tapes',
    name: 'Professional Tapes',
    desc: 'Ultra-hold adhesives for secure system placement.',
    priceCents: 2999,
  },
  {
    id: 'liquid-adhesives',
    name: 'Liquid Adhesives',
    desc: 'Medical-grade bonding for active lifestyles.',
    priceCents: 3499,
  },
  {
    id: 'specialty-shampoos',
    name: 'Specialty Shampoos',
    desc: 'Formulated for hair systems and extensions.',
    priceCents: 2499,
  },
  {
    id: 'conditioners-serums',
    name: 'Conditioners & Serums',
    desc: 'Essential care for maintaining hair longevity.',
    priceCents: 2799,
  },
]

export const productsById = Object.fromEntries(products.map((p) => [p.id, p]))

export function formatPrice(cents) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}
