import { Metadata } from "next"
import { listCategories } from "@lib/data/categories"
import GemstoneCategoriesPage from "@modules/categories/components/gemstone-categories"
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

  const categoriesPath = buildCountryPath(params.countryCode, "/categories")

  return {
    title: "Gemstone Categories",
    description: "Browse our collection of precious gemstones by category.",
    alternates: {
      canonical: toAbsoluteUrl(categoriesPath),
      languages: {
        ...buildCountryAlternates(countryCodes || [], "/categories"),
        "x-default": toAbsoluteUrl(categoriesPath),
      },
    },
  }
}

export default async function CategoriesPage({
  params,
}: {
  params: { countryCode: string }
}) {
  const categories = await listCategories()

  const normalizedCategories = categories
    .filter((category) => category.handle)
    .map((category) => ({
      id: category.id,
      name: category.name,
      handle: category.handle!,
      description: category.description,
    }))

  return <GemstoneCategoriesPage categories={normalizedCategories} />
}
