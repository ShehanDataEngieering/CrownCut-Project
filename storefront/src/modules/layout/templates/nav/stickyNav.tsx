"use client"

import { usePathname } from "next/navigation"
import useSticky from "@hooks/use-sticky"
import NavRegionCurrency from "@modules/layout/components/nav-region-currency"
import CartButton from "@modules/layout/components/cart-button"
import { memo, useEffect, useRef, useState } from "react"
import type { HttpTypes } from "@medusajs/types"
import { mobile_menu } from "@lib/data/menu-data"
import Menu from "./nav-componets/menu"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

function StickyNav({ regions }: { regions: HttpTypes.StoreRegion[] | null }) {
  const { sticky } = useSticky()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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
              <div className="row align-items-center">
                <div className="col-xl-2 col-lg-2 col-6">
                  <div className="logo">
                    <LocalizedClientLink
                      href="/"
                      onClick={() => startPageLoading("/")}
                      aria-busy={isPageLoading}
                    >
                      <img
                        src="/assets/img/logo/crowncut-logonb.png"
                        alt="logo"
                        width={100}
                        height={100}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "contain",
                          display: "block",
                        }}
                      />
                    </LocalizedClientLink>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-8 d-none d-lg-block">
                  <div className="main-menu menu-style-3 menu-style-4 p-relative">
                    <nav className="tp-main-menu-content">
                      <Menu
                        regions={regions}
                        isPageLoading={isPageLoading}
                        onNavigateStart={startPageLoading}
                      />
                    </nav>
                  </div>
                </div>

                <div className="col-6 d-lg-none text-end">
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

                <div className="col d-none d-lg-block"></div>
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
        .mobile-menu-trigger {
          font-size: 28px;
          line-height: 1;
          background: transparent;
          border: 0;
          color: inherit;
          min-width: 48px;
          min-height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
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
