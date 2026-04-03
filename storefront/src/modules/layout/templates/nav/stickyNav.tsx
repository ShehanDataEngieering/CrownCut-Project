"use client"

import { usePathname } from "next/navigation"
import useSticky from "@hooks/use-sticky"
import NavRegionCurrency from "@modules/layout/components/nav-region-currency"
import CartButton from "@modules/layout/components/cart-button"
import { memo, useEffect, useRef, useState, useCallback } from "react"
import type { HttpTypes } from "@medusajs/types"
import { mobile_menu } from "@lib/data/menu-data"
import Menu from "./nav-componets/menu"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Search } from "@svg"
import { sdk } from "@lib/config"

function StickyNav({ regions }: { regions: HttpTypes.StoreRegion[] | null }) {
  const { sticky } = useSticky()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<HttpTypes.StoreProduct[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const [mobileSearchQuery, setMobileSearchQuery] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)
  const mobileSearchInputRef = useRef<HTMLInputElement>(null)
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openSearch = useCallback(() => {
    setIsSearchOpen(true)
    setTimeout(() => searchInputRef.current?.focus(), 50)
  }, [])

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false)
    setSearchQuery("")
    setSearchResults([])
  }, [])

  // Debounced live search
  useEffect(() => {
    const trimmed = searchQuery.trim()
    if (!trimmed) {
      setSearchResults([])
      return
    }
    setIsSearching(true)
    const timer = setTimeout(() => {
      sdk.store.product
        .list({ q: trimmed, limit: 6, fields: "id,title,handle,thumbnail" })
        .then(({ products }) => setSearchResults(products))
        .catch(() => setSearchResults([]))
        .finally(() => setIsSearching(false))
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const clearPageLoading = () => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current)
      loadingTimeoutRef.current = null
    }
    setIsPageLoading(false)
  }

  const startPageLoading = (href?: string) => {
    if (href && href === pathname) {
      return
    }

    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current)
    }

    setIsPageLoading(true)
    loadingTimeoutRef.current = setTimeout(() => {
      setIsPageLoading(false)
      loadingTimeoutRef.current = null
    }, 10000)
  }

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow =
      isMobileMenuOpen || isPageLoading ? "hidden" : prevOverflow

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false)
        closeSearch()
      }
    }

    document.addEventListener("keydown", onEscape)

    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener("keydown", onEscape)
    }
  }, [isMobileMenuOpen, isPageLoading])

  useEffect(() => {
    clearPageLoading()
    closeSearch()
  }, [pathname])

  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
      }
    }
  }, [])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      <header>
        <div
          id="header-sticky"
          className={`tp-header-area  tp-header-sticky tp-header-transparent has-dark-logo tp-header-height ${
            sticky ? "header-sticky" : ""
          }`}
        >
          <div className="tp-header-bottom-3 pl-85 pr-85">
            <div className="container-fluid">
              <div className={`header-layout${isSearchOpen ? " header-layout--search" : ""}`}>
                {/* Logo */}
                <div className="header-logo">
                  <LocalizedClientLink
                    href="/"
                    onClick={() => startPageLoading("/")}
                    aria-busy={isPageLoading}
                  >
                    <img
                      src="/assets/img/logo/crowncut-logonb.png"
                      alt="logo"
                      width={120}
                      height={120}
                      className="header-logo-img"
                      style={{
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </LocalizedClientLink>
                </div>

                {/* Desktop nav — centered via CSS grid; replaced by search bar when open */}
                <div className="header-nav d-none d-lg-flex justify-content-center align-items-center">
                  {isSearchOpen ? (
                    <div className="header-search-wrap">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          if (searchQuery.trim()) {
                            closeSearch()
                            window.location.href = `/store?search=${encodeURIComponent(searchQuery.trim())}`
                          }
                        }}
                        className="header-search-bar"
                      >
                        <span className="header-search-icon"><Search /></span>
                        <input
                          ref={searchInputRef}
                          type="search"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search products..."
                          className="header-search-input"
                          aria-label="Search products"
                        />
                        {isSearching && <span className="header-search-spinner" />}
                        <button
                          type="button"
                          onClick={closeSearch}
                          className="header-search-close"
                          aria-label="Close search"
                        >
                          ✕
                        </button>
                      </form>

                      {searchResults.length > 0 && (
                        <ul className="header-search-dropdown">
                          {searchResults.map((product) => (
                            <li key={product.id}>
                              <LocalizedClientLink
                                href={`/products/${product.handle}`}
                                className="header-search-result"
                                onClick={closeSearch}
                              >
                                {product.thumbnail ? (
                                  <img
                                    src={product.thumbnail}
                                    alt=""
                                    className="header-search-thumb"
                                  />
                                ) : (
                                  <div className="header-search-thumb header-search-thumb-placeholder" />
                                )}
                                <span className="header-search-title">{product.title}</span>
                              </LocalizedClientLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <div className="main-menu menu-style-3 menu-style-4 p-relative">
                      <nav className="tp-main-menu-content">
                        <Menu
                          isPageLoading={isPageLoading}
                          onNavigateStart={startPageLoading}
                        />
                      </nav>
                    </div>
                  )}
                </div>

                {/* Right section: desktop actions + mobile buttons */}
                <div className="header-right">
                  {/* Desktop actions */}
                  <div className="header-desktop-actions d-none d-lg-flex align-items-center gap-3">
                    {!isSearchOpen && (
                      <button
                        type="button"
                        aria-label="Search"
                        className="menu-icon-btn search-open-btn"
                        onClick={openSearch}
                      >
                        <Search />
                        <span className="visually-hidden">Search</span>
                      </button>
                    )}
                    <NavRegionCurrency regions={regions} />
                    <CartButton />
                  </div>
                  {/* Mobile buttons */}
                  <div className="d-flex d-lg-none align-items-center gap-2">
                    <LocalizedClientLink
                      href="/search"
                      aria-label="Search"
                      className="mobile-search-link"
                      onClick={() => startPageLoading("/search")}
                    >
                      <Search />
                      <span className="visually-hidden">Search</span>
                    </LocalizedClientLink>
                    <button
                      type="button"
                      className="mobile-menu-trigger"
                      aria-label="Open mobile menu"
                      aria-expanded={isMobileMenuOpen}
                      aria-controls="mobile-menu-drawer"
                      disabled={isPageLoading}
                      onClick={() => setIsMobileMenuOpen(true)}
                    >
                      {isPageLoading ? (
                        <span className="mobile-trigger-loading">
                          <span className="loading-spinner" />
                        </span>
                      ) : (
                        "☰"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <button
        type="button"
        aria-label="Close mobile menu overlay"
        className={`mobile-menu-overlay ${isMobileMenuOpen ? "show" : ""}`}
        onClick={closeMobileMenu}
      />

      <aside
        id="mobile-menu-drawer"
        className={`mobile-menu-drawer ${isMobileMenuOpen ? "open" : ""}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">Menu</span>
          <button
            type="button"
            className="mobile-menu-close"
            aria-label="Close mobile menu"
            onClick={closeMobileMenu}
          >
            ✕
          </button>
        </div>

        <nav className="mobile-menu-nav">
          <ul>
            {mobile_menu.map((item) => (
              <li key={`${item.id}-${item.title}`}>
                <LocalizedClientLink
                  href={item.link}
                  aria-busy={isPageLoading}
                  onClick={() => {
                    startPageLoading(item.link)
                    closeMobileMenu()
                  }}
                >
                  {item.title}
                </LocalizedClientLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-menu-actions">
          <NavRegionCurrency regions={regions} />
          <CartButton />
        </div>
      </aside>

      {isPageLoading && (
        <div className="page-loading-overlay" aria-live="polite" role="status">
          <div className="page-loading-content">
            <span className="loading-spinner loading-spinner-lg" />
            <span className="page-loading-text">Loading...</span>
          </div>
        </div>
      )}

        <style jsx>{`
          /* ── Header layout ── */
          .header-layout {
            display: flex;
            align-items: center;
            width: 100%;
          }

          .header-logo {
            flex-shrink: 0;
            display: flex;
            align-items: center;
          }

          .header-right {
            flex-shrink: 0;
            margin-left: auto;
            display: flex;
            align-items: center;
          }

          @media (min-width: 992px) {
            .header-layout {
              display: grid;
              grid-template-columns: 1fr auto 1fr;
            }

            .header-layout--search {
              grid-template-columns: auto minmax(0, 50%) auto;
            }

            .header-right {
              margin-left: 0;
              justify-content: flex-end;
            }
          }

          /* ── Logo ── */
          .header-logo-img {
            width: 120px;
            height: 120px;
          }

          @media (max-width: 991.98px) {
            .header-logo-img {
              width: 56px;
              height: 56px;
            }
          }

          /* ── Inline search bar ── */
          .header-search-wrap {
            position: relative;
            width: 100%;
          }

          .header-search-bar {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(0, 0, 0, 0.06);
            border-radius: 9999px;
            padding: 0 1rem;
            height: 40px;
            width: 100%;
          }

          .header-search-icon {
            display: inline-flex;
            align-items: center;
            flex-shrink: 0;
            opacity: 0.55;
          }

          .header-search-input {
            flex: 1;
            border: 0;
            background: transparent;
            outline: none;
            font-size: 0.9rem;
            color: inherit;
            min-width: 0;
          }

          .header-search-input::placeholder {
            color: rgba(0, 0, 0, 0.4);
          }

          .header-search-input::-webkit-search-cancel-button {
            display: none;
          }

          .header-search-close {
            background: transparent;
            border: 0;
            cursor: pointer;
            font-size: 13px;
            line-height: 1;
            opacity: 0.55;
            padding: 0.2rem;
            flex-shrink: 0;
          }

          .header-search-close:hover {
            opacity: 1;
          }

          .header-search-spinner {
            width: 14px;
            height: 14px;
            border: 2px solid rgba(0, 0, 0, 0.15);
            border-top-color: rgba(0, 0, 0, 0.6);
            border-radius: 50%;
            animation: nav-spin 0.65s linear infinite;
            flex-shrink: 0;
          }

          .header-search-dropdown {
            position: absolute;
            top: calc(100% + 6px);
            left: 0;
            right: 0;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.14);
            list-style: none;
            margin: 0;
            padding: 0.4rem 0;
            z-index: 500;
            overflow: hidden;
          }

          .header-search-result {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.5rem 1rem;
            text-decoration: none;
            color: inherit;
            transition: background 0.15s;
          }

          .header-search-result:hover {
            background: rgba(0, 0, 0, 0.04);
          }

          .header-search-thumb {
            width: 40px;
            height: 40px;
            object-fit: cover;
            border-radius: 6px;
            flex-shrink: 0;
            background: #f3f3f3;
          }

          .header-search-thumb-placeholder {
            background: #efefef;
          }

          .header-search-title {
            font-size: 0.875rem;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          /* ── Desktop search button ── */
          .search-open-btn {
            background: transparent;
            cursor: pointer;
          }

          .menu-icon-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 9999px;
            border: 1px solid rgba(0, 0, 0, 0.15);
            flex-shrink: 0;
          }

          .mobile-menu-trigger {
            font-size: 24px;
            line-height: 1;
            background: transparent;
            border: 0;
            color: inherit;
            width: 40px;
            height: 40px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .mobile-menu-trigger:focus-visible,
          .mobile-menu-close:focus-visible,
          .mobile-search-link:focus-visible {
            outline: 2px solid rgba(0, 0, 0, 0.5);
            outline-offset: 2px;
          }

        .mobile-search-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 9999px;
          border: 1px solid rgba(0, 0, 0, 0.15);
          color: inherit;
          text-decoration: none;
          flex-shrink: 0;
        }

        .mobile-menu-trigger:disabled {
          opacity: 0.8;
          cursor: not-allowed;
        }

        .mobile-trigger-loading {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-menu-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.2s ease;
          border: 0;
          z-index: 1098;
        }

        .mobile-menu-overlay.show {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }

        .mobile-menu-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: min(84vw, 320px);
          height: 100vh;
          background: #fff;
          transform: translateX(100%);
          transition: transform 0.25s ease;
          z-index: 1099;
          padding: 1rem;
          overflow-y: auto;
          box-shadow: -8px 0 24px rgba(0, 0, 0, 0.16);
        }

        .mobile-menu-drawer.open {
          transform: translateX(0);
        }

        .mobile-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .mobile-menu-title {
          font-size: 1rem;
          font-weight: 600;
        }

        .mobile-menu-close {
          font-size: 24px;
          line-height: 1;
          background: transparent;
          border: 0;
          color: inherit;
        }

        .mobile-menu-nav ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .mobile-menu-nav a {
          color: inherit;
          text-decoration: none;
          font-weight: 500;
          padding: 0.25rem 0.1rem;
        }

          .mobile-menu-actions {
            margin-top: 1.25rem;
            padding-top: 1rem;
            border-top: 1px solid rgba(0, 0, 0, 0.12);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.75rem;
          }

          @media (max-width: 575px) {
            .mobile-menu-actions {
              flex-direction: column;
              align-items: stretch;
            }

            .mobile-menu-actions :global(button),
            .mobile-menu-actions :global(a) {
              width: 100%;
              justify-content: center;
            }

            .mobile-menu-title {
              font-size: 0.95rem;
            }
          }

        .page-loading-overlay {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: all;
        }

        .page-loading-content {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.95rem;
          font-weight: 600;
        }

        .page-loading-text {
          color: #111;
        }

        .loading-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(0, 0, 0, 0.2);
          border-top-color: rgba(0, 0, 0, 0.9);
          border-radius: 50%;
          animation: nav-spin 0.65s linear infinite;
          flex-shrink: 0;
        }

        .loading-spinner-lg {
          width: 22px;
          height: 22px;
          border-width: 3px;
        }

        @keyframes nav-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (min-width: 992px) {
          .mobile-menu-trigger,
          .mobile-menu-overlay,
          .mobile-menu-drawer {
            display: none;
          }
        }
      `}</style>
    </>
  )
}

// Memoize to prevent unnecessary re-renders
export default memo(StickyNav)
