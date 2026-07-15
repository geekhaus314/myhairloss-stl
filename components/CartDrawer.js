import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react'
import { useCart } from '../lib/cart-context'
import { formatPrice } from '../lib/products'

export default function CartDrawer() {
  const {
    lineItems,
    count,
    subtotalCents,
    open,
    setOpen,
    setQuantity,
    removeItem,
  } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleCheckout = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: lineItems.map((li) => ({ id: li.id, quantity: li.quantity })),
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Unable to start checkout.')
      }
      window.location.href = data.url
    } catch (err) {
      setError(err.message || 'Something went wrong.')
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating cart button */}
      <button
        onClick={() => setOpen(true)}
        aria-label={`Open cart (${count} items)`}
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 bg-[#0a0a0a] text-[#c5a059] rounded-full flex items-center justify-center shadow-2xl hover:bg-[#c5a059] hover:text-[#0a0a0a] transition-colors"
      >
        <ShoppingBag className="w-6 h-6" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#c5a059] text-[#0a0a0a] text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#fdfdfb]">
            {count}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[100] bg-black/50"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 260 }}
              className="fixed top-0 right-0 z-[110] h-full w-full max-w-md bg-[#fdfdfb] flex flex-col"
              role="dialog"
              aria-label="Shopping cart"
            >
              <div className="flex items-center justify-between px-8 py-8 border-b border-gray-100">
                <h2 className="text-2xl font-bold tracking-tighter">
                  Your Cart{' '}
                  <span className="font-light text-[#c5a059]">
                    ({count})
                  </span>
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close cart"
                  className="text-[#0a0a0a] hover:text-[#c5a059] transition-colors"
                >
                  <X className="w-7 h-7" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-8 py-6">
                {lineItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <ShoppingBag className="w-12 h-12 text-gray-300 mb-6" />
                    <p className="text-gray-400 font-light">
                      Your cart is empty.
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-8">
                    {lineItems.map((li) => (
                      <li key={li.id} className="flex gap-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg leading-tight">
                            {li.name}
                          </h3>
                          <p className="text-sm text-gray-400 font-light mb-3">
                            {formatPrice(li.priceCents)} each
                          </p>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                setQuantity(li.id, li.quantity - 1)
                              }
                              aria-label={`Decrease ${li.name} quantity`}
                              className="w-8 h-8 border border-gray-200 flex items-center justify-center hover:border-[#c5a059] transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center font-bold">
                              {li.quantity}
                            </span>
                            <button
                              onClick={() =>
                                setQuantity(li.id, li.quantity + 1)
                              }
                              aria-label={`Increase ${li.name} quantity`}
                              className="w-8 h-8 border border-gray-200 flex items-center justify-center hover:border-[#c5a059] transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => removeItem(li.id)}
                              aria-label={`Remove ${li.name}`}
                              className="ml-auto text-gray-300 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right font-bold">
                          {formatPrice(li.priceCents * li.quantity)}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {lineItems.length > 0 && (
                <div className="border-t border-gray-100 px-8 py-8 space-y-6">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs uppercase tracking-widest font-bold text-gray-400">
                      Subtotal
                    </span>
                    <span className="text-2xl font-bold">
                      {formatPrice(subtotalCents)}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                    Shipping & taxes are calculated at secure checkout,
                    powered by Stripe.
                  </p>
                  {error && (
                    <p className="text-red-500 text-xs font-bold uppercase tracking-widest">
                      {error}
                    </p>
                  )}
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="btn-primary w-full"
                  >
                    {loading ? 'Redirecting…' : 'Proceed to Checkout'}
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
