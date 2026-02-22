import { Metadata } from "next"

import FooterTwo from "@modules/layout/templates/footerNew/footer-2"
import Nav from "@modules/layout/templates/nav"
import { CartProvider } from "@lib/context/CartContext"
import { getBaseURL } from "@lib/util/env"
import { SITE_DESCRIPTION, SITE_NAME } from "@lib/util/seo"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    description: SITE_DESCRIPTION,
  },
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Nav />
      {props.children}
      <FooterTwo />
    </CartProvider>
  )
}
