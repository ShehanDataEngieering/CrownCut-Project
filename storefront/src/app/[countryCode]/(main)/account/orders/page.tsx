import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import { listRegions } from "@lib/data/regions"
import {
  buildCountryAlternates,
  buildCountryPath,
  toAbsoluteUrl,
} from "@lib/util/seo"

type MetadataProps = {
  params: {
    countryCode: string
  }
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const countryCodes = await listRegions().then(
    (regions) =>
      regions
        ?.flatMap((region) => region.countries?.map((country) => country.iso_2))
        .filter(Boolean) as string[]
  )

  const ordersPath = buildCountryPath(params.countryCode, "/account/orders")

  return {
    title: "Orders",
    description: "Order history and receipts.",
    alternates: {
      canonical: toAbsoluteUrl(ordersPath),
      languages: {
        ...buildCountryAlternates(countryCodes || [], "/account/orders"),
        "x-default": toAbsoluteUrl(ordersPath),
      },
    },
  }
}

export default function AccountOrdersPage() {
  return (
    <section className="tp-contact-area pb-80" style={{ paddingTop: 140 }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <div className="d-flex align-items-end justify-content-between gap-3 flex-wrap mb-3">
              <div>
                <h1 className="mb-2">Orders</h1>
                <p className="text-muted mb-0">
                  Order history is not available yet.
                </p>
              </div>
              <LocalizedClientLink href="/account" className="btn btn-outline-dark">
                Back to account
              </LocalizedClientLink>
            </div>

            <div
              className="card"
              style={{
                border: "1.5px solid rgb(222, 222, 209)",
                borderRadius: 10,
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              }}
            >
              <div className="card-body" style={{ padding: "1.25rem" }}>
                <p className="mb-3">
                  If you need help with an order, please send us your order ID.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <LocalizedClientLink href="/contact" className="btn btn-dark">
                    Contact support
                  </LocalizedClientLink>
                  <LocalizedClientLink href="/store" className="btn btn-outline-dark">
                    Continue shopping
                  </LocalizedClientLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
