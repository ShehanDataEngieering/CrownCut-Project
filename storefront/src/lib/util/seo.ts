import { Metadata } from "next"

import { getBaseURL } from "@lib/util/env"

export const SITE_NAME = "Crown Cut Gems"
export const SITE_DESCRIPTION = "Fine gems and jewelry curated for brilliance and everyday elegance."

export const getSiteUrl = () => new URL(getBaseURL())

export const toPath = (path = "") => {
  if (!path) {
    return "/"
  }

  return path.startsWith("/") ? path : `/${path}`
}

export const buildCountryPath = (countryCode: string, path = "") => {
  const normalizedPath = toPath(path)

  if (normalizedPath === "/") {
    return `/${countryCode}`
  }

  return `/${countryCode}${normalizedPath}`
}

export const toAbsoluteUrl = (path: string) => {
  return new URL(toPath(path), getSiteUrl()).toString()
}

export const buildCountryAlternates = (
  countryCodes: string[],
  path = ""
): Record<string, string> => {
  const uniqueCountryCodes = [...new Set(countryCodes.filter(Boolean))]

  return uniqueCountryCodes.reduce((acc, countryCode) => {
    const hreflang = `en-${countryCode.toUpperCase()}`
    acc[hreflang] = toAbsoluteUrl(buildCountryPath(countryCode, path))
    return acc
  }, {} as Record<string, string>)
}

export const buildNoIndexMetadata = (): Pick<Metadata, "robots"> => ({
  robots: {
    index: false,
    follow: false,
  },
})
