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

  const accountPath = buildCountryPath(params.countryCode, "/account")

  return {
    title: "Account",
    description: "Manage your profile, orders, and preferences.",
    alternates: {
      canonical: toAbsoluteUrl(accountPath),
      languages: {
        ...buildCountryAlternates(countryCodes || [], "/account"),
        "x-default": toAbsoluteUrl(accountPath),
      },
    },
  }
}

export default function AccountPage() {
  return (
    <section className="tp-contact-area pb-80" style={{ paddingTop: 140 }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <h1 className="mb-3">Account</h1>
            <p className="text-muted mb-4">
              Account features are not enabled in this storefront yet.
            </p>

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
                  You can still browse and purchase gemstones without signing
                  in.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <LocalizedClientLink href="/store" className="btn btn-dark">
                    Browse gemstones
                  </LocalizedClientLink>
                  <LocalizedClientLink
                    href="/contact"
                    className="btn btn-outline-dark"
                  >
                    Contact us
                  </LocalizedClientLink>
                  <LocalizedClientLink
                    href="/account/orders"
                    className="btn btn-outline-dark"
                  >
                    View orders
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
