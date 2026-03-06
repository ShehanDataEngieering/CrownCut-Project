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

  const notFoundPath = buildCountryPath(params.countryCode, "/404")

  return {
    title: "Page not found",
    description: "This page does not exist.",
    alternates: {
      canonical: toAbsoluteUrl(notFoundPath),
      languages: {
        ...buildCountryAlternates(countryCodes || [], "/404"),
        "x-default": toAbsoluteUrl(notFoundPath),
      },
    },
  }
}

export default function NotFoundPage() {
  return (
    <section className="tp-contact-area pb-80" style={{ paddingTop: 140 }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <h1 className="mb-2">404</h1>
            <p className="text-muted mb-4">
              The page you are looking for does not exist.
            </p>

            <div className="d-flex flex-wrap gap-2">
              <LocalizedClientLink href="/" className="btn btn-dark">
                Go home
              </LocalizedClientLink>
              <LocalizedClientLink href="/store" className="btn btn-outline-dark">
                Browse gemstones
              </LocalizedClientLink>
              <LocalizedClientLink href="/contact" className="btn btn-outline-dark">
                Contact us
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
