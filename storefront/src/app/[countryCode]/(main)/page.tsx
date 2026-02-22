import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion, listRegions } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"
import FashionBanner from "@modules/layout/banner/fashon-banner"
import FeatureAreaOne from "@modules/layout/components/features/feature-area-1"
import ShopBanner from "@modules/layout/components/shop-banner/shop-banner"
import {
  buildCountryAlternates,
  buildCountryPath,
  SITE_DESCRIPTION,
  SITE_NAME,
  toAbsoluteUrl,
} from "@lib/util/seo"

type MetadataProps = {
  params: { countryCode: string }
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const isSweden = params.countryCode?.toLowerCase() === "se"
  const countryCodes = await listRegions().then(
    (regions) =>
      regions
        ?.flatMap((region) => region.countries?.map((country) => country.iso_2))
        .filter(Boolean) as string[]
  )

  const countryPath = buildCountryPath(params.countryCode)
  const title = isSweden ? "Gemstones in Sweden | Crown Cut Gems" : SITE_NAME
  const description = isSweden
    ? "Shop natural gemstones in Sweden from Crown Cut Gems. Explore sapphire, aquamarine, garnet, and more with secure delivery."
    : SITE_DESCRIPTION

  return {
    title,
    description,
    alternates: {
      canonical: toAbsoluteUrl(countryPath),
      languages: {
        ...buildCountryAlternates(countryCodes || [], ""),
        "x-default": toAbsoluteUrl(countryPath),
      },
    },
    openGraph: {
      title,
      description,
      url: toAbsoluteUrl(countryPath),
      type: "website",
    },
  }
}

type HomePageProps = {
  params: { countryCode: string } | Promise<{ countryCode: string }>
}

export default async function Home({ params }: HomePageProps) {
  const { countryCode } = await params
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)
  const categories = await listCategories()

  const normalizedCategories = categories
    .filter((category) => category.handle)
    .map((category) => ({
      id: category.id,
      name: category.name,
      handle: category.handle!,
      description: category.description,
    }))

  if (!collections || !region) {
    return null
  }

  return (
    <>
       <FashionBanner />
       <FeatureAreaOne />
       <ShopBanner categories={normalizedCategories} />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
