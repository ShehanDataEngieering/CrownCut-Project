"use client"

import { usePathname, useRouter, useParams } from "next/navigation"
import Image from "next/image"
import useSticky from "@hooks/use-sticky"
import NavRegionCurrency from "@modules/layout/components/nav-region-currency"
import CartButton from "@modules/layout/components/cart-button"
import { memo, useEffect, useRef, useState, useCallback } from "react"
import type { HttpTypes } from "@medusajs/types"
import { mobile_menu } from "@lib/data/menu-data"
import Menu from "./nav-componets/menu"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Search } from "@svg"

type SearchProduct = { id: string; title: string; handle: string; thumbnail: string | null }

function StickyNav({ regions }: { regions: HttpTypes.StoreRegion[] | null }) {
  const { sticky } = useSticky()
  const pathname = usePathname()
  const router = useRouter()
  const { countryCode } = useParams()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([])
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
    if (trimmed.length < 2) {
      setSearchResults([])
      setIsSearching(false)
      return
    }
    setIsSearching(true)
    const timer = setTimeout(() => {
      fetch(`/api/search-suggestions?q=${encodeURIComponent(trimmed)}`)
        .then((r) => r.json())
        .then(({ products }) => setSearchResults(products || []))
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
    }, 3000)
  }

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow =
      isMobileMenuOpen ? "hidden" : prevOverflow

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false)
        closeSearch()
        setIsMobileSearchOpen(false)
        setMobileSearchQuery("")
      }
    }

    document.addEventListener("keydown", onEscape)

    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener("keydown", onEscape)
    }
  }, [isMobileMenuOpen, closeSearch])

  useEffect(() => {
    clearPageLoading()
    closeSearch()
    setIsMobileSearchOpen(false)
    setMobileSearchQuery("")
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
                    <div className="header-logo-sizer">
                      <Image
                        src="/assets/img/logo/crowncut-logonb.png"
                        alt="logo"
                        fill
                        className="header-logo-img"
                        style={{ objectFit: "contain" }}
                        priority
                      />
                    </div>
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
                            router.push(`/${countryCode}/store?search=${encodeURIComponent(searchQuery.trim())}`)
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

                      {searchQuery.trim() && !isSearching && searchResults.length === 0 && (
                        <div className="header-search-dropdown header-search-empty">
                          No results for &ldquo;{searchQuery}&rdquo;
                        </div>
                      )}
                      {searchResults.length > 0 && (
                        <ul className="header-search-dropdown">
                          {searchResults.map((product) => (
                            <li key={product.id}>
                              <a
                                href={`/${countryCode}/products/${product.handle}`}
                                className="header-search-result"
                                onClick={(e) => {
                                  e.preventDefault()
                                  closeSearch()
                                  router.push(`/${countryCode}/products/${product.handle}`)
                                }}
                              >
                                {product.thumbnail ? (
                                  <img
                                    src={product.thumbnail}
                                    alt=""
                                    className="header-search-thumb"
                                    loading="lazy"
                                  />
                                ) : (
                                  <div className="header-search-thumb header-search-thumb-placeholder" />
                                )}
                                <span className="header-search-title">{product.title}</span>
                              </a>
                            </li>
                          ))}
                          <li className="header-search-viewall-row">
                            <a
                              href={`/${countryCode}/store?search=${encodeURIComponent(searchQuery.trim())}`}
                              className="header-search-viewall"
                              onClick={(e) => {
                                e.preventDefault()
                                const q = searchQuery.trim()
                                closeSearch()
                                router.push(`/${countryCode}/store?search=${encodeURIComponent(q)}`)
                              }}
                            >
                              View all results for &ldquo;{searchQuery}&rdquo; →
                            </a>
                          </li>
                        </ul>
                      )}
                    </div>
                  ) : (
                    <div className="main-menu menu-style-3 menu-style-4 p-relative">
                      <nav className="tp-main-menu-content">
                        <Menu
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
                    {isMobileSearchOpen ? (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          if (mobileSearchQuery.trim()) {
                            setIsMobileSearchOpen(false)
                            setMobileSearchQuery("")
                            router.push(`/${countryCode}/store?search=${encodeURIComponent(mobileSearchQuery.trim())}`)
                          }
                        }}
                        className="mobile-search-bar"
                      >
                        <input
                          ref={mobileSearchInputRef}
                          type="search"
                          value={mobileSearchQuery}
                          onChange={(e) => setMobileSearchQuery(e.target.value)}
                          placeholder="Search products..."
                          className="mobile-search-input"
                          aria-label="Search products"
                          autoFocus
                        />
                        <button type="submit" aria-label="Submit search" className="mobile-search-submit">
                          <Search />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsMobileSearchOpen(false)
                            setMobileSearchQuery("")
                          }}
                          className="mobile-search-close-btn"
                          aria-label="Close search"
                        >
                          ✕
                        </button>
                      </form>
                    ) : (
                      <>
                        <button
                          type="button"
                          aria-label="Search"
                          className="mobile-search-link"
                          onClick={() => setIsMobileSearchOpen(true)}
                        >
                          <Search />
                          <span className="visually-hidden">Search</span>
                        </button>
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
                      </>
                    )}
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
        <div className="page-loading-overlay" aria-live="polite" role="status" />
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
          .header-logo-sizer {
            position: relative;
            width: 120px;
            height: 120px;
            flex-shrink: 0;
          }

          @media (max-width: 991.98px) {
            .header-logo-sizer {
              width: 95px;
              height: 95px;
            }
          }

          @media (max-width: 575.98px) {
            .header-logo-sizer {
              width: 80px;
              height: 80px;
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
            overflow: visible;
          }

          .header-search-empty {
            padding: 0.75rem 1rem;
            color: rgba(0, 0, 0, 0.5);
            font-size: 0.875rem;
            border-radius: 12px;
          }

          .header-search-viewall-row {
            border-top: 1px solid rgba(0, 0, 0, 0.07);
            margin-top: 0.25rem;
          }

          .header-search-viewall {
            display: block;
            padding: 0.6rem 1rem;
            font-size: 0.8rem;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.6);
            text-decoration: none;
            transition: color 0.15s;
          }

          .header-search-viewall:hover {
            color: #000;
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
            object-fit: contain;
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
            min-width: 0;
            flex: 1;
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
            font-size: 28px;
            line-height: 1;
            background: transparent;
            border: 1px solid rgba(0, 0, 0, 0.15);
            border-radius: 9999px;
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
          background: transparent;
          cursor: pointer;
        }

        .mobile-search-bar {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 9999px;
          padding: 0 0.6rem;
          height: 40px;
          flex: 1;
          min-width: 0;
        }

        .mobile-search-input {
          flex: 1;
          border: 0;
          background: transparent;
          outline: none;
          font-size: 0.875rem;
          color: inherit;
          min-width: 0;
        }

        .mobile-search-input::placeholder {
          color: rgba(0, 0, 0, 0.4);
        }

        .mobile-search-input::-webkit-search-cancel-button {
          display: none;
        }

        .mobile-search-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 0;
          cursor: pointer;
          padding: 0.2rem;
          flex-shrink: 0;
          opacity: 0.6;
        }

        .mobile-search-submit:hover {
          opacity: 1;
        }

        .mobile-search-close-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 0;
          cursor: pointer;
          font-size: 13px;
          line-height: 1;
          padding: 0.2rem;
          flex-shrink: 0;
          opacity: 0.55;
        }

        .mobile-search-close-btn:hover {
          opacity: 1;
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
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          z-index: 2000;
          background: #111;
          animation: loading-bar 3s ease-in-out forwards;
          pointer-events: none;
        }

        @keyframes loading-bar {
          0% { width: 0%; opacity: 1; }
          80% { width: 85%; opacity: 1; }
          100% { width: 100%; opacity: 0; }
        }


        .loading-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(0, 0, 0, 0.2);
          border-top-color: rgba(0, 0, 0, 0.9);
          border-radius: 50%;
          animation: nav-spin 0.65s linear infinite;
          flex-shrink: 0;
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
