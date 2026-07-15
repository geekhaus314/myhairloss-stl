import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { productsById } from './products'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  // items shape: { [productId]: quantity }
  const [items, setItems] = useState({})
  const [open, setOpen] = useState(false)

  const addItem = useCallback((id) => {
    setItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
    setOpen(true)
  }, [])

  const setQuantity = useCallback((id, qty) => {
    setItems((prev) => {
      const next = { ...prev }
      if (qty <= 0) {
        delete next[id]
      } else {
        next[id] = qty
      }
      return next
    })
  }, [])

  const removeItem = useCallback((id) => {
    setItems((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }, [])

  const clearCart = useCallback(() => setItems({}), [])

  const lineItems = useMemo(
    () =>
      Object.entries(items)
        .map(([id, quantity]) => {
          const product = productsById[id]
          if (!product) return null
          return { ...product, quantity }
        })
        .filter(Boolean),
    [items]
  )

  const count = useMemo(
    () => lineItems.reduce((sum, li) => sum + li.quantity, 0),
    [lineItems]
  )

  const subtotalCents = useMemo(
    () => lineItems.reduce((sum, li) => sum + li.priceCents * li.quantity, 0),
    [lineItems]
  )

  const value = {
    items,
    lineItems,
    count,
    subtotalCents,
    open,
    setOpen,
    addItem,
    setQuantity,
    removeItem,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
