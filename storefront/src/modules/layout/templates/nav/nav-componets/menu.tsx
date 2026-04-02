"use client"

import menu_data from "@lib/data/menu-data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function Menu({
  isPageLoading = false,
  onNavigateStart,
}: {
  isPageLoading?: boolean
  onNavigateStart?: (href: string) => void
}) {
  return (
    <>
      <ul className="d-flex gap-3 m-0 p-0 list-unstyled align-items-center">
        {menu_data.map((menu) => (
          <li key={menu.id} className="position-relative">
            <LocalizedClientLink
              href={menu.link}
              className={`text-dark text-decoration-none fw-medium menu-link ${isPageLoading ? "is-loading" : ""}`}
              aria-busy={isPageLoading}
              onClick={() => onNavigateStart?.(menu.link)}
            >
              {isPageLoading && <span className="menu-spinner" />}
              {menu.title}
            </LocalizedClientLink>
            <div className="home-menu tp-submenu tp-mega-menu">
              <div className="row row-cols-lg-4 row-cols-sm-2 row-cols-1 gx-2 gy-2 gy-lg-0"></div>
            </div>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .menu-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
        }

        .menu-link.is-loading {
          pointer-events: none;
          opacity: 0.7;
        }

        .menu-spinner {
          width: 12px;
          height: 12px;
          border: 2px solid rgba(0, 0, 0, 0.2);
          border-top-color: rgba(0, 0, 0, 0.8);
          border-radius: 50%;
          animation: menu-spin 0.65s linear infinite;
          flex-shrink: 0;
        }

        @keyframes menu-spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  )
}
