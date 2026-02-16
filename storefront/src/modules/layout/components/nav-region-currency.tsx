"use client"

import { useMemo, useEffect, useState } from "react"
import { useParams, usePathname } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import CountrySelect from "./country-select"
import { useToggleState } from "@medusajs/ui"

export default function NavRegionCurrency({
  regions,
}: {
  regions: HttpTypes.StoreRegion[] | null
}) {
  const toggleState = useToggleState()
  const params = useParams<{ countryCode: string }>()
  const countryCode = Array.isArray(params.countryCode) ? params.countryCode[0] : params.countryCode
  const pathname = usePathname()

  const currentPath = useMemo(() => {
    if (!countryCode || !pathname.startsWith(`/${countryCode}`)) {
      return pathname
    }
    // Remove the country code prefix and return the rest
    return pathname.slice(`/${countryCode}`.length) || "/"
  }, [pathname, countryCode])

  const currencyByCountry = useMemo(() => {
    const map = new Map<string, string>()
    regions?.forEach((r) => {
      r.countries?.forEach((c) => {
        if (c.iso_2) map.set(c.iso_2, r.currency_code?.toUpperCase?.() || "")
      })
    })
    return map
  }, [regions])

  const [selectedCurrency, setSelectedCurrency] = useState<string>("")

  useEffect(() => {
    const cur = countryCode ? currencyByCountry.get(countryCode) : ""
    if (cur && cur !== selectedCurrency) setSelectedCurrency(cur)
  }, [countryCode, currencyByCountry, selectedCurrency])

  if (!regions?.length) {
    return null
  }

  return (
    <div className="flex items-center gap-3">
      {/* Country selector - currency auto-determined by backend region */}
      <div
        onMouseEnter={toggleState.open}
        onMouseLeave={toggleState.close}
        onClick={toggleState.toggle}
        className="cursor-pointer relative"
        role="button"
        aria-label="Change shipping country"
      >
        <div className="overflow-visible">
          <CountrySelect toggleState={toggleState} regions={regions} />
        </div>
      </div>

      {/* Display current currency (read-only, determined by backend) */}
      {selectedCurrency && (
        <div className="hidden small:inline-flex items-center gap-2 text-sm text-ui-fg-subtle">
          <span>{selectedCurrency}</span>
        </div>
      )}
    </div>
  )
}
