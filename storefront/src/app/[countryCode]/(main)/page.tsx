import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import FashionBanner from "@modules/layout/banner/fashon-banner"
import FeatureAreaOne from "@modules/layout/components/features/feature-area-1"
import ShopBanner from "@modules/layout/components/shop-banner/shop-banner"
export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

type HomePageProps = {
  params: { countryCode: string } | Promise<{ countryCode: string }>
}

export default async function Home({ params }: HomePageProps) {
  const { countryCode } = await params
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
       <FashionBanner />
       <FeatureAreaOne />
       <ShopBanner />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
