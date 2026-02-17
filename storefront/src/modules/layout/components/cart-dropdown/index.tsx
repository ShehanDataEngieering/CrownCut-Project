"use client"

import { Popover, Transition } from "@headlessui/react"
import { Button } from "@medusajs/ui"
import { usePathname, useRouter } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"
import { CartTwo } from "@svg"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const router = useRouter()
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  console.log("CartDropdown cart state:", cartState);
  console.log("CartDropdown cart items:", cartState?.items);

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  console.log("CartDropdown totalItems calculated:", totalItems);

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }

    itemRef.current = totalItems
  }, [pathname, timedOpen, totalItems])

   console.log("Rendering CartDropdown with totalItems:", totalItems);

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <LocalizedClientLink
        href="/cart"
        data-testid="nav-cart-link-mobile"
        className="lg:hidden relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-ui-border-base text-ui-fg-subtle hover:text-ui-fg-base transition-colors"
        aria-label="Go to cart"
      >
        <CartTwo />
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center text-[10px] font-semibold text-ui-fg-base">
          {totalItems}
        </span>
      </LocalizedClientLink>
      <Popover className="relative lg:block hidden">
        <Popover.Button
          as="button"
          onClick={() => router.push("/cart")}
          data-testid="nav-cart-link"
          className="h-full hover:text-ui-fg-base pr-2 relative inline-flex flex-col items-center justify-center gap-1"
        >
          <span className="relative inline-block">
            <CartTwo />
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center text-[10px] font-semibold text-ui-fg-base">
              {totalItems}
            </span>
          </span>
        </Popover.Button>
      </Popover>
    </div>
  )
}

export default CartDropdown
