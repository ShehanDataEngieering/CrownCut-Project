"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type FilterOptions = {
  priceRange: { min?: number; max?: number }
  inStock: boolean
  onSale: boolean
  search: string
  category: string
}

const sortOptions = [
  { value: "created_at", label: "Latest" },
  { value: "price_asc", label: "Price ↑" },
  { value: "price_desc", label: "Price ↓" },
]

export default function MobileFilterBar({
  sortBy,
  filters,
}: {
  sortBy: SortOptions
  filters?: FilterOptions
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [minDraft, setMinDraft] = useState(filters?.priceRange?.min?.toString() || "")
  const [maxDraft, setMaxDraft] = useState(filters?.priceRange?.max?.toString() || "")

  const createQueryString = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams)
      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value)
        else params.delete(key)
      })
      return params.toString()
    },
    [searchParams]
  )

  const setSort = (value: string) => {
    const qs = createQueryString({ sortBy: value })
    router.push(`${pathname}?${qs}`)
  }

  const applyFilters = () => {
    const qs = createQueryString({
      minPrice: minDraft,
      maxPrice: maxDraft,
      page: "1",
    })
    router.push(`${pathname}?${qs}`)
    setShowFilters(false)
  }

  const resetFilters = () => {
    const qs = createQueryString({ minPrice: "", maxPrice: "", inStock: "", onSale: "", page: "1" })
    setMinDraft("")
    setMaxDraft("")
    router.push(`${pathname}?${qs}`)
    setShowFilters(false)
  }

  const borderStyle = "1.5px solid rgb(222, 222, 209)"
  const btnBase: React.CSSProperties = {
    border: borderStyle,
    borderRadius: 6,
    background: "#fff",
    color: "rgb(52,52,45)",
    padding: "0.4rem 0.75rem",
    fontSize: "0.82rem",
    fontWeight: 500,
    cursor: "pointer",
  }

  return (
    <div>
      {/* Strip */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        {/* Sort select */}
        <select
          value={sortBy}
          onChange={(e) => setSort(e.target.value)}
          style={{
            ...btnBase,
            flex: 1,
            minWidth: 120,
            appearance: "auto",
          }}
          aria-label="Sort products"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        {/* Filters toggle */}
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          style={{
            ...btnBase,
            background: showFilters ? "rgb(222,222,209)" : "#fff",
          }}
        >
          {showFilters ? "✕ Close" : "⚙ Filters"}
        </button>

        {/* Active category badge */}
        {filters?.category && (
          <span
            style={{
              border: borderStyle,
              borderRadius: 20,
              padding: "0.3rem 0.65rem",
              fontSize: "0.78rem",
              background: "rgb(222,222,209)",
              color: "rgb(52,52,45)",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {filters.category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            <button
              type="button"
              onClick={() => {
                const qs = createQueryString({ category: "", page: "1" })
                router.push(`${pathname}?${qs}`)
              }}
              style={{ background: "none", border: 0, cursor: "pointer", lineHeight: 1, padding: 0, fontSize: "0.78rem" }}
              aria-label="Clear category"
            >
              ✕
            </button>
          </span>
        )}
      </div>

      {/* Expanded filter panel */}
      {showFilters && (
        <div
          style={{
            marginTop: 10,
            border: borderStyle,
            borderRadius: 8,
            background: "#fff",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div>
            <p style={{ fontSize: "0.82rem", fontWeight: 600, marginBottom: 6 }}>Price Range</p>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="number"
                placeholder="Min"
                value={minDraft}
                onChange={(e) => setMinDraft(e.target.value)}
                style={{ flex: 1, border: borderStyle, borderRadius: 6, padding: "0.4rem 0.6rem", fontSize: "0.82rem" }}
              />
              <input
                type="number"
                placeholder="Max"
                value={maxDraft}
                onChange={(e) => setMaxDraft(e.target.value)}
                style={{ flex: 1, border: borderStyle, borderRadius: 6, padding: "0.4rem 0.6rem", fontSize: "0.82rem" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" onClick={resetFilters} style={{ ...btnBase, flex: 1, textAlign: "center" }}>
              Reset
            </button>
            <button
              type="button"
              onClick={applyFilters}
              style={{ ...btnBase, flex: 1, textAlign: "center", background: "rgb(222,222,209)" }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
