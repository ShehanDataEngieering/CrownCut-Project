"use client"

import React from "react"
import Link from "next/link"
import type { StaticImageData } from "next/image"
// internal
import { ArrowRightLong } from "@svg"
import { resolveCategoryImage } from "@lib/data/category-image-map"
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
                <img
                  src={s.src}
                  alt={`banner-slide-${i}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
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
          <Link href="/shop">{title}</Link>
        </h3>
        {isBtn && (
          <div className="tp-banner-btn-4">
            <Link href="/shop" className="tp-btn tp-btn-border">
              Shop Now <ArrowRightLong />
            </Link>
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
      <section className="tp-banner-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-7">
              <div className="row">
                <div className="col-12">
                  <h3 style={{ marginBottom: 18 }}>Gemstones</h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: 16,
                    }}
                  >
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/store?category=${encodeURIComponent(category.handle)}`}
                        className="tp-gem-card"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <div
                          style={{
                            borderRadius: 8,
                            overflow: "hidden",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                            background: "#fff",
                            border: "1.5px solid rgb(222, 222, 209)",
                            height: "100%",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: 120,
                              overflow: "hidden",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "rgb(250, 250, 245)",
                            }}
                          >
                            <img
                              src={resolveCategoryImage(category.handle)}
                              alt={category.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                objectPosition: "center",
                                display: "block",
                                padding: 8,
                              }}
                            />
                          </div>
                          <div style={{ padding: 12 }}>
                            <h6 className="mb-1">{category.name}</h6>
                            {category.description && (
                              <p className="mb-0 text-muted small">
                                {category.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
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
            <div className="col-xl-6 col-lg-5">
              <div className="tp-banner-full tp-banner-full-height fix p-relative z-index-1">
                <div
                  className="tp-banner-full-thumb include-bg black-bg transition-3"
                  style={{ backgroundImage: `url(${banner_bg_5.src})` }}
                ></div>
                <div className="tp-banner-full-content">
                  <span>Collection</span>
                  <h3 className="tp-banner-full-title">
                    <Link href="/shop">
                      GemStones from <br /> Sri Lanka
                    </Link>
                  </h3>
                  <div className="tp-banner-full-btn">
                    <Link href="/shop" className="tp-btn tp-btn-border">
                      Shop Now <ArrowRightLong />
                    </Link>
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
