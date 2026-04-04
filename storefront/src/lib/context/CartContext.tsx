"use client"
import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react"
import { retrieveCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

type Cart = HttpTypes.StoreCart

type CartContextValue = {
  cartId: string | null
  cart: Cart | null
  loading: boolean
  refresh: () => Promise<void>
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      const cartData = await retrieveCart()
      setCart(cartData)
    } catch (e) {
      console.error("Failed to retrieve cart:", e)
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial load
  useEffect(() => {
    refresh()
  }, [refresh])


  const cartId = cart?.id || null

  const value = useMemo(
    () => ({ cartId, cart, loading, refresh }),
    [cartId, cart, loading, refresh]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}


