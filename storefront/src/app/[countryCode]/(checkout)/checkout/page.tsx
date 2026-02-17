import { Metadata } from "next"
import { notFound } from "next/navigation"

import Wrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { enrichLineItems, retrieveCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

export const metadata: Metadata = {
  title: "Checkout",
}

const fetchCart = async () => {
  const cart = await retrieveCart()
  if (!cart) {
    return notFound()
  }

  if (cart?.items?.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id!)
    cart.items = enrichedItems as HttpTypes.StoreCartLineItem[]
  }

  return cart
}

export default async function Checkout() {
  const cart = await fetchCart()

  return (
    <section className="tp-checkout-area pt-60 pb-60">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <Wrapper cart={cart}>
              <CheckoutForm cart={cart} />
            </Wrapper>
          </div>
          <div className="col-lg-5">
            <CheckoutSummary cart={cart} />
          </div>
        </div>
      </div>
    </section>
  )
}
