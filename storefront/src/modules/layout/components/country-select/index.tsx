"use client"

import { Listbox, Transition } from "@headlessui/react"
import { Fragment, useEffect, useMemo, useState } from "react"
import ReactCountryFlag from "react-country-flag"

import { StateType } from "@lib/hooks/use-toggle-state"
import { useParams, usePathname } from "next/navigation"
import { updateRegion } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

type CountryOption = {
  country: string
  region: string
  label: string
}

type CountrySelectProps = {
  toggleState: StateType
  regions: HttpTypes.StoreRegion[]
}

const CountrySelect = ({ toggleState, regions }: CountrySelectProps) => {
  const [current, setCurrent] = useState<
    | { country: string | undefined; region: string; label: string | undefined }
    | undefined
  >(undefined)

  const params = useParams()
  const countryCode = Array.isArray(params.countryCode) ? params.countryCode[0] : params.countryCode
  const pathname = usePathname()
  
  // Properly extract the page path by removing the country code prefix
  const currentPath = useMemo(() => {
    if (!countryCode || !pathname.startsWith(`/${countryCode}`)) {
      return pathname
    }
    // Remove the country code prefix and return the rest
    return pathname.slice(`/${countryCode}`.length) || "/"
  }, [pathname, countryCode])

  const { state, close } = toggleState

  const options = useMemo(() => {
    if (!regions || regions.length === 0) return []
    return regions
      ?.map((r) => {
        return r.countries?.map((c) => ({
          country: c.iso_2,
          region: r.id,
          label: c.display_name,
        }))
      })
      .flat()
      .filter(Boolean)
      .sort((a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""))
  }, [regions])

  useEffect(() => {
    if (countryCode && options && options.length > 0) {
      const option = options.find((o) => o?.country === countryCode)
      setCurrent(option)
    }
  }, [options, countryCode])

  const handleChange = (option: CountryOption) => {
    if (option && option.country) {
      updateRegion(option.country, currentPath || "/")
      close()
    }
  }

  return (
    <div className="relative">
      <Listbox
        as="span"
        onChange={handleChange}
        value={current || { country: "", region: "", label: "Select" }}
      >
        <Listbox.Button className="py-1 w-full">
          <div className="txt-compact-small flex items-start gap-x-2">
            <span>Shipping to:</span>
            {current && (
              <span className="txt-compact-small flex items-center gap-x-2">
                <ReactCountryFlag
                  svg
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                  countryCode={current.country ?? ""}
                />
                {current.label}
              </span>
            )}
          </div>
        </Listbox.Button>
        <div className="relative">
          <Transition
            show={state}
            as={Fragment}
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="absolute top-full left-0 mt-2 max-h-[442px] overflow-y-auto z-[9999] bg-white drop-shadow-xl text-small-regular uppercase text-black no-scrollbar rounded-md w-[320px] border border-gray-200"
              static
            >
              {options?.map((o, index) => {
                return (
                  <Listbox.Option
                    key={index}
                    value={o}
                    className="py-2 hover:bg-gray-200 px-3 cursor-pointer flex items-center gap-x-2"
                  >
                    <ReactCountryFlag
                      svg
                      style={{
                        width: "16px",
                        height: "16px",
                      }}
                      countryCode={o?.country ?? ""}
                    />{" "}
                    {o?.label}
                  </Listbox.Option>
                )
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CountrySelect
