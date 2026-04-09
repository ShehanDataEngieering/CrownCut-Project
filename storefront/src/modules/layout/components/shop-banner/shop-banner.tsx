"use client"

import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import type { StaticImageData } from "next/image"
// internal
import { ArrowRightLong } from "@svg"
import { resolveCategoryImage } from "@lib/data/category-image-map"
import UnifiedGemCard from "@modules/common/components/unified-gem-card"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectFade, Navigation, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/navigation"
import banner_bg_1 from "@assets/img/banner/4/banner-1.jpg"
import banner_bg_2 from "@assets/img/banner/4/banner-2.jpg"
import banner_bg_3 from "@assets/img/banner/4/banner-3.jpg"
import banner_bg_4 from "@assets/img/banner/4/banner-4.png"
import banner_bg_5 from "@assets/img/banner/4/banner-5.jpeg"
type BannerItemProps = {
  cls?: string
  bg_clr: string
  bg: StaticImageData
  content: string
  title: React.ReactNode
  isBtn?: boolean
}

// BannerItem - Swiper-based implementation (keeps same props)
function BannerItem({
  cls,
  bg_clr,
  bg,
  content,
  title,
  isBtn = false,
}: BannerItemProps) {
  const slides: StaticImageData[] = [
    banner_bg_1,
    banner_bg_2,
    banner_bg_3,
    banner_bg_4,
  ]

  return (
    <div
      className={`tp-banner-item-4 tp-banner-height-4 fix p-relative z-index-1 ${cls}`}
      data-bg-color={`#${bg_clr}`}
      style={{ backgroundColor: `#${bg_clr}` }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: `#${bg_clr}`,
          zIndex: -1,
          pointerEvents: "none",
        }}
      ></div>

      {/* Swiper slider used as the banner background */}
      <div
        className="tp-banner-thumb-4 include-bg transition-3"
        style={{ zIndex: 0 }}
      >
        <Swiper
          slidesPerView={1}
          loop={true}
          effect={"fade"}
          speed={1200}
          modules={[Navigation, EffectFade, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          className="tp-banner-swiper"
          style={{ width: "100%", height: "100%" }}
        >
          {slides.map((s, i) => (
            <SwiperSlide key={i}>
              <div
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                <Image
                  src={s}
                  alt={`banner-slide-${i}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  priority={i === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div
        className="tp-banner-content-4"
        style={{ position: "relative", zIndex: 10 }}
      >
        <span>{content}</span>
        <h3 className="tp-banner-title-4">
          <LocalizedClientLink href="/store">{title}</LocalizedClientLink>
        </h3>
        {isBtn && (
          <div className="tp-banner-btn-4">
            <LocalizedClientLink href="/store" className="tp-btn tp-btn-border">
              Shop Now <ArrowRightLong />
            </LocalizedClientLink>
          </div>
        )}
      </div>
    </div>
  )
}

type GemstoneCategory = {
  id: string
  name: string
  handle: string
  description?: string | null
}

const ShopBanner: React.FC<{ categories: GemstoneCategory[] }> = ({
  categories,
}) => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 991px) {
          .shop-banner-girl-col {
            margin-top: 24px !important;
          }
        }
      `}} />
      <section className="tp-banner-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-7">
              <div className="row">
                <div className="col-12">
                  <div style={{ paddingTop: 12 }}>
                    <h3 style={{ marginBottom: 18 }}>Gemstones</h3>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                        gap: 16,
                      }}
                    >
                      {categories.map((category) => (
                        <div key={category.id}>
                          <UnifiedGemCard
                            href={`/categories/${encodeURIComponent(category.handle)}`}
                            imageUrl={resolveCategoryImage(category.handle)}
                            imageAlt={category.name}
                            title={category.name}
                          />
                        </div>
                      ))}

                      {categories.length === 0 && (
                        <div
                          style={{
                            gridColumn: "1 / -1",
                            border: "1px solid rgb(222, 222, 209)",
                            borderRadius: 8,
                            padding: 20,
                            textAlign: "center",
                            color: "#666",
                            background: "#fff",
                          }}
                        >
                          No categories found.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-5 shop-banner-girl-col">
              <div className="tp-banner-full tp-banner-full-height fix p-relative z-index-1">
                <div
                  className="tp-banner-full-thumb include-bg black-bg transition-3"
                  style={{ backgroundImage: `url(${banner_bg_5.src})` }}
                ></div>
                <div className="tp-banner-full-content">
                  <span>Collection</span>
                  <h3 className="tp-banner-full-title">
                    <LocalizedClientLink href="/store">
                      GemStones
                    </LocalizedClientLink>
                  </h3>
                  <p style={{ margin: "14px 0 0", color: "rgba(255,255,255,0.85)", maxWidth: 360 }}>
                    Discover authentic, ethically sourced gemstones known worldwide for their brilliance and purity.
                  </p>
                  <div className="tp-banner-full-btn">
                    <LocalizedClientLink href="/store" className="tp-btn tp-btn-border">
                      Shop Now <ArrowRightLong />
                    </LocalizedClientLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ShopBanner
