import { MetadataRoute } from "next"

import { listCategories } from "@lib/data/categories"
import { getCollectionsList } from "@lib/data/collections"
import { getProductsList } from "@lib/data/products"
import { listRegions } from "@lib/data/regions"
import { buildCountryPath, toAbsoluteUrl } from "@lib/util/seo"

const STATIC_ROUTES = ["", "/store", "/categories"]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const regions = await listRegions()
  const countryCodes = (
    regions
      ?.flatMap((region) => region.countries?.map((country) => country.iso_2))
      .filter(Boolean) ?? []
  ) as string[]

  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  countryCodes.forEach((countryCode) => {
    STATIC_ROUTES.forEach((route) => {
      entries.push({
        url: toAbsoluteUrl(buildCountryPath(countryCode, route)),
        lastModified: now,
        changeFrequency: "daily",
        priority: route === "" ? 1 : 0.8,
      })
    })
  })

  const [allCategories, collectionsByCountry, productsByCountry] =
    await Promise.all([
      listCategories(),
      Promise.all(
        countryCodes.map(async (countryCode) => {
          const { collections } = await getCollectionsList(0, 200)
          return { countryCode, collections }
        })
      ),
      Promise.all(
        countryCodes.map(async (countryCode) => {
          const { response } = await getProductsList({
            countryCode,
            queryParams: { limit: 250 },
          })

          return { countryCode, products: response.products }
        })
      ),
    ])

  countryCodes.forEach((countryCode) => {
    allCategories
      ?.filter((category) => category.handle)
      .forEach((category) => {
        entries.push({
          url: toAbsoluteUrl(
            buildCountryPath(countryCode, `/categories/${category.handle}`)
          ),
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.7,
        })
      })
  })

  collectionsByCountry.forEach(({ countryCode, collections }) => {
    collections
      ?.filter((collection) => collection.handle)
      .forEach((collection) => {
        entries.push({
          url: toAbsoluteUrl(
            buildCountryPath(countryCode, `/collections/${collection.handle}`)
          ),
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.7,
        })
      })
  })

  productsByCountry.forEach(({ countryCode, products }) => {
    products
      ?.filter((product) => product.handle)
      .forEach((product) => {
        entries.push({
          url: toAbsoluteUrl(buildCountryPath(countryCode, `/products/${product.handle}`)),
          lastModified: now,
          changeFrequency: "daily",
          priority: 0.9,
        })
      })
  })

  return entries
}
