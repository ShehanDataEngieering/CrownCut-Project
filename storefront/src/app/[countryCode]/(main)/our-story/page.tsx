import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Born from a deep-seated passion for the natural artistry of the earth, Crowncut Gems International believes true luxury lies in purity and provenance.",
}

export default function OurStoryPage() {
  return (
    <section style={{ paddingTop: 140, paddingBottom: 80 }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-9">

            {/* Hero heading */}
            <div className="mb-5 text-center">
              <p
                style={{
                  fontSize: "0.8rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#999",
                  marginBottom: "0.75rem",
                }}
              >
                Crowncut Gems International
              </p>
              <h1
                style={{
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  lineHeight: 1.2,
                  marginBottom: "1.5rem",
                }}
              >
                Our Story
              </h1>
              <div
                style={{
                  width: 48,
                  height: 2,
                  background: "#1a1a1a",
                  margin: "0 auto",
                }}
              />
            </div>

            {/* Story body */}
            <div
              style={{
                fontSize: "1.1rem",
                lineHeight: 1.9,
                color: "#333",
                background: "#fafafa",
                border: "1px solid rgba(0,0,0,0.07)",
                borderRadius: 12,
                padding: "2.5rem 3rem",
              }}
            >
              <p style={{ marginBottom: 0 }}>
                Born from a deep-seated passion for the natural artistry of the
                earth,{" "}
                <strong>Crowncut Gems International</strong> believes true luxury
                lies in purity and provenance. Founded by{" "}
                <strong>Bawantha Ravinath Perera</strong> in the heart of
                Gothenburg, our house is defined by a rare distinction:{" "}
                <strong>we are the source.</strong> By eliminating the
                intermediary, we ensure every stone travels directly from the
                earth's depths to your hands.
              </p>

              <p style={{ marginTop: "1.5rem", marginBottom: 0 }}>
                This unique &lsquo;mine-to-market&rsquo; heritage allows us to
                maintain an uncompromising standard of &lsquo;crown-cut&rsquo;
                brilliance while offering the world&rsquo;s finest gems at their
                most authentic value. Our journey is driven by a simple mission:
                to bring the rarest, most vibrant stones to those who appreciate
                true brilliance.
              </p>

              <p style={{ marginTop: "1.5rem", marginBottom: 0 }}>
                Every gem in our collection is hand-selected for its unique
                character, ensuring that we don&rsquo;t just sell stones; we
                share stories of elegance, heritage, and quality. At Crowncut, a
                gemstone is more than a luxury; it is a{" "}
                <strong>timeless legacy waiting to be worn.</strong>
              </p>
            </div>

            {/* CTA */}
            <div className="text-center mt-5">
              <LocalizedClientLink
                href="/store"
                className="btn btn-dark px-5 py-3"
                style={{ letterSpacing: "0.05em", fontSize: "0.95rem" }}
              >
                Explore Our Collection
              </LocalizedClientLink>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
