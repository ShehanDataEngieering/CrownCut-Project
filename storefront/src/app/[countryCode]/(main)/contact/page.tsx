import { Metadata } from "next"

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

  const contactPath = buildCountryPath(params.countryCode, "/contact")

  return {
    title: "Contact",
    description: "Get in touch with CrownCut Gems International.",
    alternates: {
      canonical: toAbsoluteUrl(contactPath),
      languages: {
        ...buildCountryAlternates(countryCodes || [], "/contact"),
        "x-default": toAbsoluteUrl(contactPath),
      },
    },
  }
}

export default function ContactPage() {
  return (
    <section className="tp-contact-area pb-80" style={{ paddingTop: 140 }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <h1 className="mb-3">Contact</h1>
            <p className="text-muted mb-4">
              Questions about a gemstone, availability, or custom requests? Send
              us a message and we will reply shortly.
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
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      placeholder="Tell us what you are looking for..."
                      rows={6}
                    />
                  </div>

                  <div className="col-12 d-flex gap-2 align-items-center">
                    <button type="button" className="btn btn-dark">
                      Send message
                    </button>
                    <span className="text-muted small">
                      (Form wiring not implemented yet)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h6 className="mb-2">Business</h6>
              <div className="text-muted">
                CrownCut Gems International<br />
                Sri Lanka
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
