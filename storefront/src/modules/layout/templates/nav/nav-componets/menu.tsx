"use client"

import menu_data from "@lib/data/menu-data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function Menu({
  onNavigateStart,
}: {
  onNavigateStart?: (href: string) => void
}) {
  return (
    <ul className="d-flex gap-3 m-0 p-0 list-unstyled align-items-center">
      {menu_data.map((menu) => (
        <li key={menu.id} className="position-relative">
          <LocalizedClientLink
            href={menu.link}
            className="text-dark text-decoration-none fw-medium menu-link"
            onClick={() => onNavigateStart?.(menu.link)}
          >
            {menu.title}
          </LocalizedClientLink>
        </li>
      ))}
    </ul>
  )
}
