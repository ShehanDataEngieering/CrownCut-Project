import { Metadata } from "next"

import SearchModal from "@modules/search/templates/search-modal"
import { buildNoIndexMetadata } from "@lib/util/seo"

export const metadata: Metadata = {
  title: "Search",
  ...buildNoIndexMetadata(),
}

export default function SearchModalRoute() {
  return <SearchModal />
}
