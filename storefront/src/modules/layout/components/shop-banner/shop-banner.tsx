"use client"

import React from "react"
import Link from "next/link"
import type { StaticImageData } from "next/image"
// internal
import { ArrowRightLong } from "@svg"
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

const ShopBanner: React.FC = () => {
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
                    <Link
                      href="/categories"
                      className="tp-gem-card"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        style={{
                          borderRadius: 8,
                          overflow: "hidden",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                          background: "#fff",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: 120,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src="/assets/img/product/gem-1.jpg"
                            alt="Sapphire-Blue"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            padding: "10px 8px",
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          Sapphire-Blue
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/shop?gem=alexandrite"
                      className="tp-gem-card"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        style={{
                          borderRadius: 8,
                          overflow: "hidden",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                          background: "#fff",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: 120,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src="/assets/img/product/gem-2.jpg"
                            alt="Sapphire-Yellow"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            padding: "10px 8px",
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          Sapphire-Yellow
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/shop?gem=almandine-garnet"
                      className="tp-gem-card"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        style={{
                          borderRadius: 8,
                          overflow: "hidden",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                          background: "#fff",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: 120,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src="/assets/img/product/gem-3.jpg"
                            alt="Sapphire-White"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            padding: "10px 8px",
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          Sapphire-White
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/shop?gem=amethyst"
                      className="tp-gem-card"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        style={{
                          borderRadius: 8,
                          overflow: "hidden",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                          background: "#fff",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: 120,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src="/assets/img/product/gem-4.jpg"
                            alt="Sapphire-Bi"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            padding: "10px 8px",
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          Sapphire-Bi
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/shop?gem=ametrine"
                      className="tp-gem-card"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        style={{
                          borderRadius: 8,
                          overflow: "hidden",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                          background: "#fff",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: 120,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src="/assets/img/product/gem-5.jpg"
                            alt="Sapphire-Green"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            padding: "10px 8px",
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          Sapphire-Green
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/shop?gem=andalusite"
                      className="tp-gem-card"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        style={{
                          borderRadius: 8,
                          overflow: "hidden",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                          background: "#fff",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: 120,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src="/assets/img/product/gem-6.jpg"
                            alt="Sapphire-Pink"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            padding: "10px 8px",
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          Sapphire-Pink
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/shop?gem=aquamarine"
                      className="tp-gem-card"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        style={{
                          borderRadius: 8,
                          overflow: "hidden",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                          background: "#fff",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: 120,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src="/assets/img/product/gem-7.jpg"
                            alt="Sapphire-Purple"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            padding: "10px 8px",
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          Sapphire-Purple
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/shop?gem=beryl"
                      className="tp-gem-card"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        style={{
                          borderRadius: 8,
                          overflow: "hidden",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                          background: "#fff",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: 120,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src="/assets/img/product/gem-8.jpg"
                            alt="Sapphirenatxta"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            padding: "10px 8px",
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          Sapphirenatxta
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/shop?gem=carnelian"
                      className="tp-gem-card"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        style={{
                          borderRadius: 8,
                          overflow: "hidden",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                          background: "#fff",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: 120,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src="/assets/img/product/spinel.jpg"
                            alt="Spinel"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            padding: "10px 8px",
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          Spinel
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/shop?gem=chrome-diopside"
                      className="tp-gem-card"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        style={{
                          borderRadius: 8,
                          overflow: "hidden",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                          background: "#fff",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: 120,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src="/assets/img/product/garnet.jpg"
                            alt="Garnet"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            padding: "10px 8px",
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          Garnet
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/shop?gem=chrysoberyl"
                      className="tp-gem-card"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        style={{
                          borderRadius: 8,
                          overflow: "hidden",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                          background: "#fff",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: 120,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src="/assets/img/product/Spessartite.jpg"
                            alt="Chrysoberyl"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            padding: "10px 8px",
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          Spessartite
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/shop?gem=citrine"
                      className="tp-gem-card"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        style={{
                          borderRadius: 8,
                          overflow: "hidden",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                          background: "#fff",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: 120,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src="/assets/img/product/topaz.jpg"
                            alt="Citrine"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            padding: "10px 8px",
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          Topaz
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/shop?gem=coral"
                      className="tp-gem-card"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        style={{
                          borderRadius: 8,
                          overflow: "hidden",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                          background: "#fff",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: 120,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src="/assets/img/product/quarts.jpg"
                            alt="Quarts"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            padding: "10px 8px",
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          Quarts
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/shop?gem=demantoid-garnet"
                      className="tp-gem-card"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        style={{
                          borderRadius: 8,
                          overflow: "hidden",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                          background: "#fff",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: 120,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src="/assets/img/product/aquamarine.jpg"
                            alt="Aquamarine"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            padding: "10px 8px",
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          Aquamarine
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/shop?gem=fluorite"
                      className="tp-gem-card"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        style={{
                          borderRadius: 8,
                          overflow: "hidden",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                          background: "#fff",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: 120,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src="/assets/img/product/chrysoberyl.jpg"
                            alt="Chrysoberyl"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            padding: "10px 8px",
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          Chrysoberyl
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/shop?gem=garnet"
                      className="tp-gem-card"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        style={{
                          borderRadius: 8,
                          overflow: "hidden",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                          background: "#fff",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: 120,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src="/assets/img/product/zircon.jpg"
                            alt="zircon"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            padding: "10px 8px",
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          Zircon
                        </div>
                      </div>
                    </Link>
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
