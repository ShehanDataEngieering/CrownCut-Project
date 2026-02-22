import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { StoreProductCategory, StoreRegion } from "@medusajs/types"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import {
  buildCountryAlternates,
  buildCountryPath,
  toAbsoluteUrl,
} from "@lib/util/seo"

type Props = {
  params: { category: string[]; countryCode: string }
  searchParams: {
    sortBy?: SortOptions
    page?: string
  }
}

export async function generateStaticParams() {
  const product_categories = await listCategories()

  if (!product_categories) {
    return []
  }

  const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
    regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
  )

  const categoryHandles = product_categories.map(
    (category: any) => category.handle
  )

  const staticParams = countryCodes
    ?.map((countryCode: string | undefined) =>
      categoryHandles.map((handle: any) => ({
        countryCode,
        category: [handle],
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { product_categories } = await getCategoryByHandle(
      params.category
    )

    const title = product_categories
      .map((category: StoreProductCategory) => category.name)
      .join(" | ")

    const description =
      product_categories[product_categories.length - 1].description ??
      `${title} category.`

    const countryCodes = await listRegions().then(
      (regions: StoreRegion[]) =>
        regions
          ?.flatMap((r) => r.countries?.map((c) => c.iso_2))
          .filter(Boolean) as string[]
    )

    const categoryPath = buildCountryPath(
      params.countryCode,
      `/categories/${params.category.join("/")}`
    )

    return {
      title,
      description,
      alternates: {
        canonical: toAbsoluteUrl(categoryPath),
        languages: {
          ...buildCountryAlternates(
            countryCodes || [],
            `/categories/${params.category.join("/")}`
          ),
          "x-default": toAbsoluteUrl(categoryPath),
        },
      },
      openGraph: {
        title,
        description,
        url: toAbsoluteUrl(categoryPath),
        type: "website",
      },
    }
  } catch (error) {
    notFound()
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { sortBy, page } = searchParams

  const { product_categories } = await getCategoryByHandle(
    params.category
  )

  if (!product_categories) {
    notFound()
  }

  const categoryName =
    product_categories[product_categories.length - 1]?.name || "Category"
  const categoryPath = buildCountryPath(
    params.countryCode,
    `/categories/${params.category.join("/")}`
  )
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: toAbsoluteUrl(buildCountryPath(params.countryCode)),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Categories",
        item: toAbsoluteUrl(buildCountryPath(params.countryCode, "/categories")),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryName,
        item: toAbsoluteUrl(categoryPath),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <CategoryTemplate
        categories={product_categories}
        sortBy={sortBy}
        page={page}
        countryCode={params.countryCode}
      />
    </>
  )
}
