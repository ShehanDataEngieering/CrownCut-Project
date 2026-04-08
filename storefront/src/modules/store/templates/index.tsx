import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import MobileFilterBar from "@modules/store/components/mobile-filter-bar"

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
      <div className="row g-3 align-items-stretch">
        {/* Sidebar — desktop only */}
        <div className="col-lg-3 d-none d-lg-block h-100" style={{ paddingTop: "4.5rem" }}>
          <RefinementList sortBy={sort} filters={filters} />
        </div>

        {/* Products — full width on mobile */}
        <div className="col-12 col-lg-9">
          {/* Heading above products column */}
          <div className="mb-3 tp-page-heading d-flex align-items-center justify-content-between">
            <h1 className="h3 tp-store-theme-title mb-0" data-testid="store-page-title">All products</h1>
          </div>

          {/* Mobile filter bar — hidden on desktop */}
          <div className="d-lg-none mb-3">
            <MobileFilterBar sortBy={sort} filters={filters} />
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
