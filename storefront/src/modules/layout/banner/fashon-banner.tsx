"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectFade, Navigation, Autoplay } from "swiper/modules"
import type { SwiperProps } from "swiper/react"

// internal
import slider_img_1 from "@assets/img/slider/2/slider-1.png"
import slider_img_2 from "@assets/img/slider/2/slider-2.png"
import slider_img_3 from "@assets/img/slider/2/slider-3.png"

type SliderItem = {
  id: number
  subtitle: string
  title: string
  img: { src: string }
  objectPosition?: string
}

// slider data
const sliderData: SliderItem[] = [
  {
    id: 1,
    subtitle: "New Arrivals 2023",
    title: "The Clothing Collection",
    img: slider_img_1,
    objectPosition: "center top",
  },
  {
    id: 2,
    subtitle: "Best Selling 2023",
    title: "The Summer Collection",
    img: slider_img_2,
    objectPosition: "center 40%",
  },
  {
    id: 3,
    subtitle: "Winter Has Arrived",
    title: "Amazing New designs",
    img: slider_img_3,
    objectPosition: "center center",
  },
]

// slider setting
const sliderSetting: SwiperProps = {
  slidesPerView: 1,
  spaceBetween: 0,
  effect: "fade",
  loop: true,
  speed: 2000,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
    waitForTransition: true,
  },
  navigation: {
    nextEl: ".tp-slider-2-button-next",
    prevEl: ".tp-slider-2-button-prev",
  },
}

const FashionBanner = () => {
  const pathname = usePathname()
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
    }, 3000)
  }

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

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @font-face {
            font-family: "SourceSerif4ExtraLightItalic";
            src: url("/assets/fonts/SourceSerif4-ExtraLightItalic.ttf") format("truetype");
            font-weight: 200;
            font-style: italic;
            font-display: swap;
          }
          @media (max-width: 767px) {
            .fashion-banner-grid {
              grid-template-columns: 1fr !important;
              padding-top: 100px;
            }
            .fashion-banner-right {
              min-height: 260px !important;
              order: -1;
            }
            .fashion-banner-left {
              padding: 1.5rem 1.25rem !important;
              min-height: unset !important;
            }
            .fashion-banner-left h3 {
              font-size: 1.25rem !important;
              margin-bottom: 0.75rem !important;
            }
            .fashion-banner-left p {
              font-size: 0.8rem !important;
              max-width: 100% !important;
              line-height: 1.6 !important;
            }
            .fashion-banner-left .fashion-banner-desc {
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .fashion-banner-left a {
              padding: 0.6rem 1.5rem !important;
              font-size: 0.8rem !important;
            }
          }
        `,
        }}
      />
      <section
        className="fashion-banner-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {/* Left content card */}
        <div
          className="fashion-banner-left flex flex-col justify-center items-center space-y-4 text-center w-full"
          style={{ backgroundColor: "#DEDED1", padding: "130px 4rem 80px 4rem", minHeight: "650px" }}
        >
          <h3
            style={{
              fontFamily: "SourceSerif4ExtraLightItalic, serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              lineHeight: 1.3,
              color: "#1a1a1a",
              margin: "0 auto",
              marginBottom: "1.5rem",
              textAlign: "center",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            Nature&apos;s Art, Crafted for the Heart
          </h3>
          <p
            className="fashion-banner-desc"
            style={{
              color: "#4b5563",
              fontSize: "0.925rem",
              lineHeight: 1.75,
              textAlign: "center",
              margin: "0 auto",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            Every gemstone holds a story of love, memory, and meaning. More than
            a sparkle, it captures emotions that last a lifetime. At CROWNCUT
            Gems International, we believe every gem is a promise and a timeless
            reflection of life&apos;s most beautiful moments. Our gems celebrate
            authenticity, elegance, and the unique stories they become part of
            whether marking a milestone, expressing love, or becoming a treasured
            heirloom for generations to come.
          </p>
          <LocalizedClientLink
            href="/categories"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#111",
              color: "#fff",
              padding: "0.75rem 2rem",
              borderRadius: "9999px",
              fontSize: "0.875rem",
              fontWeight: 500,
              textDecoration: "none",
              margin: "0.5rem auto 0",
              opacity: isPageLoading ? 0.8 : 1,
              pointerEvents: isPageLoading ? "none" : "auto",
            }}
            aria-busy={isPageLoading}
            onClick={() => startPageLoading("/categories")}
          >
            {isPageLoading && (
              <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            Shop Collection
          </LocalizedClientLink>
        </div>

        {/* Right image slider */}
        <div className="fashion-banner-right tp-slider-area relative w-full" style={{ minHeight: "650px", alignSelf: "stretch", height: "100%" }}>
          <Swiper
            {...sliderSetting}
            modules={[Navigation, EffectFade, Autoplay]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              waitForTransition: true,
            }}
            style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
          >
            {sliderData.map((item) => (
              <SwiperSlide key={item.id} style={{ height: "100%" }}>
                <img
                  src={item.img.src}
                  alt="slider img"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: item.objectPosition ?? "center center", display: "block" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  )
}

export default FashionBanner
