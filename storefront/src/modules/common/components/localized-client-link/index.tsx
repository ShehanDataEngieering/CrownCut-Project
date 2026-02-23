"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"

/**
 * Use this component to create a Next.js `<Link />` that persists the current country code in the url,
 * without having to explicitly pass it as a prop.
 */
const LocalizedClientLink = ({
  children,
  href,
  showLoadingOnNavigate = false,
  loadingText = "Loading...",
  onClick,
  ...props
}: {
  children?: React.ReactNode
  href: string
  className?: string
  showLoadingOnNavigate?: boolean
  loadingText?: string
  onClick?: (event?: React.MouseEvent<HTMLAnchorElement>) => void
  passHref?: true
  [x: string]: any
}) => {
  const { countryCode } = useParams()
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const localizedHref = `/${countryCode}${href}`

  useEffect(() => {
    if (pathname !== localizedHref && isNavigating) {
      return
    }

    setIsNavigating(false)
  }, [pathname, localizedHref, isNavigating])

  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
      }
    }
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)

    if (!showLoadingOnNavigate) {
      return
    }

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      pathname === localizedHref ||
      props?.target === "_blank"
    ) {
      return
    }

    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current)
    }

    setIsNavigating(true)
    loadingTimeoutRef.current = setTimeout(() => {
      setIsNavigating(false)
      loadingTimeoutRef.current = null
    }, 10000)
  }

  return (
    <>
      <Link
        href={localizedHref}
        aria-busy={showLoadingOnNavigate ? isNavigating : undefined}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Link>

      {showLoadingOnNavigate && isNavigating && (
        <>
          <div className="page-loading-overlay" aria-live="polite" role="status">
            <div className="page-loading-content">
              <span className="loading-spinner loading-spinner-lg" />
              <span className="page-loading-text">{loadingText}</span>
            </div>
          </div>

          <style jsx>{`
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
              animation: link-spin 0.65s linear infinite;
              flex-shrink: 0;
            }

            .loading-spinner-lg {
              width: 22px;
              height: 22px;
              border-width: 3px;
            }

            @keyframes link-spin {
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </>
      )}
    </>
  )
}

export default LocalizedClientLink
