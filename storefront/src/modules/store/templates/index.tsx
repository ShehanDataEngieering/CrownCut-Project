import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

type FilterOptions = {
  priceRange: { min?: number; max?: number }
  inStock: boolean
  onSale: boolean
  search: string
  category: string
}

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  categoryId,
  filters,
  viewMode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  categoryId?: string
  filters?: FilterOptions
  viewMode?: "grid" | "list"
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  const view = viewMode || "grid"

  return (
    <div className="container py-4 tp-store-section tp-store-theme-page" data-testid="category-container">
      <div className="row g-4 align-items-start">
        <div className="col-lg-3 col-md-4">
          <RefinementList sortBy={sort} filters={filters} />
        </div>
        <div className="col-lg-9 col-md-8">
          <div className="mb-4">
            <h1 className="h2 tp-store-theme-title" data-testid="store-page-title">All products</h1>
          </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
            categoryId={categoryId}
            filters={filters}
            viewMode={view}
          />
        </Suspense>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
