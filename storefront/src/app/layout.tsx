import { getBaseURL } from "@lib/util/env"
import { SITE_DESCRIPTION, SITE_NAME } from "@lib/util/seo"
import { Metadata } from "next"
import "styles/globals.scss"
import CookieConsent from "@modules/layout/components/cookie-consent"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: getBaseURL(),
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body suppressHydrationWarning>
        <main className="relative">{props.children}</main>
        <CookieConsent />
      </body>
    </html>
  )
}
