"use client"

import Link from "next/link"
import useSticky from "@hooks/use-sticky"
import NavRegionCurrency from "@modules/layout/components/nav-region-currency"
import CartButton from "@modules/layout/components/cart-button"
import { Suspense, memo } from "react"
import type { HttpTypes } from "@medusajs/types"
import Menu from "./nav-componets/menu"

function StickyNav({ regions }: { regions: HttpTypes.StoreRegion[] | null }) {
  const { sticky } = useSticky()

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
                    <Link href="/">
                      <img
                        src={"/assets/img/logo/crowncut-logonb.png"}
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
                    </Link>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-8 d-none d-lg-block">
                  <div className="main-menu menu-style-3 menu-style-4 p-relative">
                    <nav className="tp-main-menu-content">
                      <Menu regions={regions} />
                    </nav>
                  </div>
                </div>

                <div className="col"></div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

// Memoize to prevent unnecessary re-renders
export default memo(StickyNav)
