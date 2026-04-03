import { Metadata } from "next"
import { notFound } from "next/navigation"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

import { listRegions } from "@lib/data/regions"
import {
  buildCountryAlternates,
  buildCountryPath,
  toAbsoluteUrl,
} from "@lib/util/seo"

type Props = {
  params: {
    countryCode: string
    slug: string
  }
}

type BlogPost = {
  slug: string
  title: string
  date: string
  image: string
  excerpt: string
  content: string[]
}

const POSTS: BlogPost[] = [
  {
    slug: "how-to-choose-a-sapphire",
    title: "How to Choose a Sapphire",
    date: "2026-03-04",
    image: "/assets/img/blog/details/blog-big-1.jpg",
    excerpt: "A practical guide to color, clarity, cut, and origin when selecting a sapphire.",
    content: [
      "Sapphires come in many colors, but the fundamentals stay the same: color quality, clarity, cut, and provenance.",
      "Start with color: look for a vivid, even tone without areas that appear gray or overly dark.",
      "Clarity varies by type. Small inclusions are common; prioritize brilliance and overall appearance.",
      "Cut influences sparkle. A well-cut stone returns light evenly and looks lively across the face.",
      "If you are comparing stones remotely, ask for multiple lighting photos/videos and a lab report when available.",
    ],
  },
  {
    slug: "spinel-vs-sapphire",
    title: "Spinel vs Sapphire: What's the Difference?",
    date: "2026-03-01",
    image: "/assets/img/blog/details/blog-big-1.jpg",
    excerpt: "Two beautiful stones often confused. Learn the key differences and what to look for.",
    content: [
      "Spinel and sapphire can look similar, especially in certain reds, pinks, and blues.",
      "The key differences are mineral composition and typical inclusion patterns; lab testing is the most reliable.",
      "From a buyer perspective, focus on color and cut quality first, then confirm identity with a report.",
    ],
  },
  {
    slug: "care-and-cleaning",
    title: "Gemstone Care and Cleaning",
    date: "2026-02-20",
    image: "/assets/img/blog/details/blog-big-1.jpg",
    excerpt: "Simple, safe care tips to keep gemstones looking their best over time.",
    content: [
      "Use warm water, mild soap, and a soft brush for most durable gemstones.",
      "Avoid harsh chemicals and sudden temperature changes.",
      "When in doubt, especially for treated stones, ask before using ultrasonic cleaners.",
    ],
  },
]

const getPost = (slug: string) => POSTS.find((p) => p.slug === slug)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost(params.slug)
  if (!post) {
    notFound()
  }

  const countryCodes = await listRegions().then(
    (regions) =>
      regions
        ?.flatMap((region) => region.countries?.map((country) => country.iso_2))
        .filter(Boolean) as string[]
  )

  const postPath = buildCountryPath(params.countryCode, `/blog/${params.slug}`)

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: toAbsoluteUrl(postPath),
      languages: {
        ...buildCountryAlternates(countryCodes || [], `/blog/${params.slug}`),
        "x-default": toAbsoluteUrl(postPath),
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: toAbsoluteUrl(postPath),
      type: "article",
      images: [post.image],
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug)
  if (!post) {
    notFound()
  }

  return (
    <section className="tp-blog-details-area pb-80" style={{ paddingTop: 140 }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-9 col-lg-10">
            <div className="mb-3">
              <LocalizedClientLink
                href="/blog"
                className="btn btn-sm btn-outline-dark"
              >
                Back to blog
              </LocalizedClientLink>
            </div>

            <h1 className="mb-2">{post.title}</h1>
            <div className="text-muted small mb-4">{post.date}</div>

            <div
              style={{
                borderRadius: 12,
                overflow: "hidden",
                border: "1.5px solid rgb(222, 222, 209)",
                background: "#fff",
              }}
            >
              <img
                src={post.image}
                alt={post.title}
                style={{ width: "100%", height: 360, objectFit: "cover", display: "block" }}
              />
            </div>

            <div className="mt-4" style={{ fontSize: "1.02rem", lineHeight: 1.75 }}>
              <p className="text-muted">{post.excerpt}</p>
              {post.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
