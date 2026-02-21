import { Metadata } from "next"
import { listCategories } from "@lib/data/categories"
import GemstoneCategoriesPage from "@modules/categories/components/gemstone-categories"

export const metadata: Metadata = {
  title: "Gemstone Categories",
  description: "Browse our collection of precious gemstones by category.",
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
