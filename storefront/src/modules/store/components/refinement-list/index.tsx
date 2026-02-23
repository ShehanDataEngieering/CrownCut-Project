"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import SortProducts, { SortOptions } from "./sort-products"

type FilterOptions = {
  priceRange: { min?: number; max?: number }
  inStock: boolean
  onSale: boolean
  search: string
  category: string
}

type RefinementListProps = {
  sortBy: SortOptions
  filters?: FilterOptions
  search?: boolean
  'data-testid'?: string
}

const RefinementList = ({ sortBy, filters, 'data-testid': dataTestId }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isListView = searchParams?.get('view') === 'list'

  const themedCardStyle: React.CSSProperties = {
    border: "1.5px solid rgb(222, 222, 209)",
    borderRadius: 8,
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    background: "#fff",
  }

  const themedBodyStyle: React.CSSProperties = {
    background: "rgb(250, 250, 245)",
    padding: "1rem",
  }

  const themedAlertStyle: React.CSSProperties = {
    border: "1.5px solid rgb(222, 222, 209)",
    borderRadius: 8,
    background: "rgb(250, 250, 245)",
    color: "rgb(52, 52, 45)",
    padding: "0.75rem 1rem",
    marginBottom: 0,
  }

  const viewButtonBaseStyle: React.CSSProperties = {
    border: "1.5px solid rgb(222, 222, 209)",
    borderRadius: 6,
    padding: "0.5rem 0.75rem",
    fontWeight: 500,
  }

  const viewButtonActiveStyle: React.CSSProperties = {
    background: "rgb(222, 222, 209)",
    color: "rgb(35, 35, 31)",
  }

  const viewButtonInactiveStyle: React.CSSProperties = {
    background: "#fff",
    color: "rgb(74, 74, 65)",
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  const updateFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="mb-4 d-grid tp-refinement-list" style={{ gap: "0.875rem" }}>
      <div className="card" style={themedCardStyle}>
        <div className="card-body" style={themedBodyStyle}>
          <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
        </div>
      </div>

      {/* Active Category Filter */}
      {filters?.category && (
        <div className="d-flex justify-content-between align-items-center" style={themedAlertStyle}>
          <span>
            <strong>Category:</strong> {filters.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
          <button
            className="btn btn-sm"
            style={{ border: "1.5px solid rgb(222, 222, 209)", color: "rgb(74, 74, 65)", background: "#fff" }}
            onClick={() => updateFilters({ category: '' })}
          >
            Clear
          </button>
        </div>
      )}
      
      {/* Search Filter */}
      <div className="card" style={themedCardStyle}>
        <div className="card-body" style={themedBodyStyle}>
          <h6 className="card-title mb-3">Search</h6>
          <input
            type="text"
            className="form-control tp-theme-input"
            placeholder="Search products..."
            defaultValue={filters?.search || ''}
            onChange={(e) => updateFilters({ search: e.target.value, page: '1' })}
          />
        </div>
      </div>

      {/* Price Filter */}
      <div className="card" style={themedCardStyle}>
        <div className="card-body" style={themedBodyStyle}>
          <h6 className="card-title mb-3">Price Range</h6>
          <div className="row g-2">
            <div className="col-6">
              <input
                type="number"
                className="form-control tp-theme-input"
                placeholder="Min"
                defaultValue={filters?.priceRange?.min || ''}
                onChange={(e) => updateFilters({ minPrice: e.target.value, page: '1' })}
              />
            </div>
            <div className="col-6">
              <input
                type="number"
                className="form-control tp-theme-input"
                placeholder="Max"
                defaultValue={filters?.priceRange?.max || ''}
                onChange={(e) => updateFilters({ maxPrice: e.target.value, page: '1' })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Status Filters */}
      <div className="card" style={themedCardStyle}>
        <div className="card-body" style={themedBodyStyle}>
          <h6 className="card-title mb-3">Status</h6>
          <div className="form-check mb-2">
            <input
              type="checkbox"
              className="form-check-input tp-theme-check"
              id="inStockCheck"
              checked={filters?.inStock || false}
              onChange={(e) => updateFilters({ inStock: e.target.checked ? 'true' : '', page: '1' })}
            />
            <label className="form-check-label" htmlFor="inStockCheck">
              In Stock
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input tp-theme-check"
              id="onSaleCheck"
              checked={filters?.onSale || false}
              onChange={(e) => updateFilters({ onSale: e.target.checked ? 'true' : '', page: '1' })}
            />
            <label className="form-check-label" htmlFor="onSaleCheck">
              On Sale
            </label>
          </div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="card" style={themedCardStyle}>
        <div className="card-body" style={themedBodyStyle}>
          <h6 className="card-title mb-3">View</h6>
          <div className="d-flex w-100 gap-2" role="group" aria-label="View mode toggle">
            <button
              type="button"
              onClick={() => updateFilters({ view: 'grid' })}
              className="btn flex-fill"
              style={{
                ...viewButtonBaseStyle,
                ...(isListView ? viewButtonInactiveStyle : viewButtonActiveStyle),
              }}
            >
              Grid
            </button>
            <button
              type="button"
              onClick={() => updateFilters({ view: 'list' })}
              className="btn flex-fill"
              style={{
                ...viewButtonBaseStyle,
                ...(isListView ? viewButtonActiveStyle : viewButtonInactiveStyle),
              }}
            >
              List
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RefinementList
