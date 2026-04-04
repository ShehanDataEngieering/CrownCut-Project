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
    image: "/assets/img/blog/how-to-choose-sapphire.jpg",
    excerpt: "A practical guide to color, clarity, cut, and origin when selecting a sapphire.",
    content: [
      "Selecting a blue sapphire involves evaluating several important factors that influence its beauty and value. The most important characteristic is color. The most prized sapphires display rich, vivid shades such as royal blue, cornflower blue, or deep blue, with strong saturation and balanced brightness.",
      "Clarity is another key factor. Natural sapphires often contain small inclusions, which are normal and can indicate authenticity. However, stones that appear \"eye-clean,\" meaning inclusions are not visible to the naked eye, are generally more valuable.",
      "The cut of the sapphire affects how well it reflects light. A well-cut sapphire will show excellent symmetry and brilliance, while a poorly cut stone may appear dull or uneven in color.",
      "Carat weight also influences value, as larger sapphires are much rarer. High-quality stones above two or three carats are especially sought after.",
      "The origin of the sapphire can also impact desirability. Sapphires from regions such as Sri Lanka (Ceylon), Kashmir, and Burma are historically known for producing exceptional stones.",
      "Finally, consider whether the gemstone has undergone treatment. Many sapphires are heat-treated to enhance color and clarity, while untreated natural stones are rarer and often more valuable.",
      "For confidence in your purchase, always request a certified gemological laboratory report confirming the sapphire's authenticity and characteristics.",
    ],
  },
  {
    slug: "spinel-vs-sapphire",
    title: "Spinel vs Sapphire: What's the Difference?",
    date: "2026-03-01",
    image: "/assets/img/blog/spinel-vs-sapphire.jpg",
    excerpt: "Two beautiful stones often confused. Learn the key differences and what to look for.",
    content: [
      "Spinel and sapphire are two exceptional gemstones admired for their beauty, durability, and vibrant colors. Although they may appear similar, they differ in composition and gemological properties.",
      "Spinel is composed of magnesium aluminum oxide (MgAl₂O₄) and forms in a cubic crystal system, with a hardness of 8 on the Mohs scale. Sapphire, a variety of corundum, is made of aluminum oxide (Al₂O₃), crystallizes in the trigonal system, and ranks 9 in hardness, making it one of the most durable gemstones used in jewelry.",
      "Both gemstones occur in a wide range of colors, from vivid reds and blues to softer pastel tones. Sapphire is traditionally known for its deep blue brilliance, while spinel is increasingly appreciated for its vibrant hues and natural rarity.",
      "For accurate identification and authenticity, a certified gemological laboratory report is always recommended.",
    ],
  },
  {
    slug: "care-and-cleaning",
    title: "Gemstone Care and Cleaning",
    date: "2026-02-20",
    image: "/assets/img/blog/gemstone-care-cleaning.jpg",
    excerpt: "Simple, safe care tips to keep gemstones looking their best over time.",
    content: [
      "Proper care helps preserve the beauty and longevity of your gemstones. Avoid exposing gemstones to harsh chemicals such as bleach, household cleaners, or chlorinated pool water, as these can damage both the stone and its setting. Prolonged exposure to direct sunlight or high heat should also be avoided, as some gemstones may fade or develop cracks.",
      "When cleaning your jewelry, use warm water with mild soap and a soft toothbrush to gently remove dirt and oils. Rinse thoroughly and dry with a clean, lint-free cloth to maintain the stone's natural brilliance. Avoid harsh cleaning methods such as ultrasonic or steam cleaners, especially for treated or delicate gemstones.",
      "For storage, keep gemstones in separate soft pouches or a fabric-lined jewelry box to prevent scratches and protect their surface. With proper care and gentle cleaning, your gemstones will maintain their beauty for years to come.",
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
