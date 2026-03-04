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

type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  image: string
}

const POSTS: BlogPost[] = [
  {
    slug: "how-to-choose-a-sapphire",
    title: "How to Choose a Sapphire",
    excerpt: "A practical guide to color, clarity, cut, and origin when selecting a sapphire.",
    date: "2026-03-04",
    image: "/assets/img/blog/grid/blog-grid-1.jpg",
  },
  {
    slug: "spinel-vs-sapphire",
    title: "Spinel vs Sapphire: What's the Difference?",
    excerpt: "Two beautiful stones often confused. Learn the key differences and what to look for.",
    date: "2026-03-01",
    image: "/assets/img/blog/grid/blog-grid-2.jpg",
  },
  {
    slug: "care-and-cleaning",
    title: "Gemstone Care and Cleaning",
    excerpt: "Simple, safe care tips to keep gemstones looking their best over time.",
    date: "2026-02-20",
    image: "/assets/img/blog/grid/blog-grid-3.jpg",
  },
]

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const countryCodes = await listRegions().then(
    (regions) =>
      regions
        ?.flatMap((region) => region.countries?.map((country) => country.iso_2))
        .filter(Boolean) as string[]
  )

  const blogPath = buildCountryPath(params.countryCode, "/blog")

  return {
    title: "Blog",
    description: "Guides, notes, and gemstone education.",
    alternates: {
      canonical: toAbsoluteUrl(blogPath),
      languages: {
        ...buildCountryAlternates(countryCodes || [], "/blog"),
        "x-default": toAbsoluteUrl(blogPath),
      },
    },
  }
}

export default function BlogPage() {
  return (
    <section className="tp-blog-area pb-80" style={{ paddingTop: 140 }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="d-flex align-items-end justify-content-between gap-3 flex-wrap mb-4">
              <div>
                <h1 className="mb-2">Blog</h1>
                <p className="text-muted mb-0">
                  Guides, buying advice, and behind-the-scenes notes.
                </p>
              </div>
              <LocalizedClientLink
                href="/store"
                className="btn btn-outline-dark"
              >
                Browse gemstones
              </LocalizedClientLink>
            </div>

            <div className="row g-3">
              {POSTS.map((post) => (
                <div key={post.slug} className="col-md-6 col-lg-4">
                  <article
                    className="h-100"
                    style={{
                      border: "1.5px solid rgb(222, 222, 209)",
                      borderRadius: 10,
                      overflow: "hidden",
                      background: "#fff",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                    }}
                  >
                    <LocalizedClientLink
                      href={`/blog/${encodeURIComponent(post.slug)}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: 180,
                          background: "rgb(250, 250, 245)",
                        }}
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </div>
                      <div style={{ padding: "1rem" }}>
                        <div className="text-muted small mb-2">{post.date}</div>
                        <h6 className="mb-2">{post.title}</h6>
                        <p className="text-muted mb-0">{post.excerpt}</p>
                      </div>
                    </LocalizedClientLink>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
