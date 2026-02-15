import "server-only"
import { cookies } from "next/headers"

const CART_COOKIE_NAME = "_medusa_cart_id"

const getCookieStore = async () => cookies()

export const getCartId = async (): Promise<string | null> => {
  const cookieStore = await getCookieStore()
  return cookieStore.get(CART_COOKIE_NAME)?.value ?? null
}

export const setCartId = async (cartId: string) => {
  const cookieStore = await getCookieStore()
  await cookieStore.set(CART_COOKIE_NAME, cartId, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  })
}

export const removeCartId = async () => {
  const cookieStore = await getCookieStore()
  await cookieStore.set(CART_COOKIE_NAME, "", { maxAge: -1 })
}
