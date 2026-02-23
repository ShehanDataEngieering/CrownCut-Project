import { Metadata } from "next"

import { getCategoryByHandle } from "@lib/data/categories"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"
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

  const storePath = buildCountryPath(params.countryCode, "/store")

  return {
    title: "Store",
    description: "Explore all of our products.",
    alternates: {
      canonical: toAbsoluteUrl(storePath),
      languages: {
        ...buildCountryAlternates(countryCodes || [], "/store"),
        "x-default": toAbsoluteUrl(storePath),
      },
    },
    openGraph: {
      title: "Store",
      description: "Explore all of our products.",
      url: toAbsoluteUrl(storePath),
      type: "website",
    },
  }
}

type Params = {
  searchParams: {
    sortBy?: SortOptions
    page?: string
    minPrice?: string
    maxPrice?: string
    inStock?: string
    onSale?: string
    search?: string
    view?: "grid" | "list"
    category?: string
  }
  params: {
    countryCode: string
  }
}

export default async function StorePage({ searchParams, params }: Params) {
  const {
    sortBy,
    page,
    minPrice,
    maxPrice,
    inStock,
    onSale,
    search,
    view,
    category
  } = searchParams

  let categoryId: string | undefined
  let resolvedCategoryHandle = ""

  if (category) {
    const { product_categories } = await getCategoryByHandle([category])
    const matchedCategory = product_categories?.[0]

    if (matchedCategory?.id) {
      categoryId = matchedCategory.id
      resolvedCategoryHandle = category
    }
  }

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      categoryId={categoryId}
      filters={{
        priceRange: {
          min: minPrice ? parseFloat(minPrice) : undefined,
          max: maxPrice ? parseFloat(maxPrice) : undefined,
        },
        inStock: inStock === "true",
        onSale: onSale === "true",
        search: search || "",
        category: resolvedCategoryHandle,
      }}
      viewMode={view || "grid"}
    />
  )
}
