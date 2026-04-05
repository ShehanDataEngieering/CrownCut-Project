"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectFade, Navigation, Autoplay } from "swiper/modules"
import type { SwiperProps } from "swiper/react"
import Image from "next/image"
import type { StaticImageData } from "next/image"

// internal
import slider_img_1 from "@assets/img/slider/2/slider-1.png"
import slider_img_2 from "@assets/img/slider/2/slider-2.png"
import slider_img_3 from "@assets/img/slider/2/slider-3.png"

type SliderItem = {
  id: number
  subtitle: string
  title: string
  img: StaticImageData
}

// slider data
const sliderData: SliderItem[] = [
  {
    id: 1,
    subtitle: "New Arrivals 2023",
    title: "The Clothing Collection",
    img: slider_img_1,
  },
  {
    id: 2,
    subtitle: "Best Selling 2023",
    title: "The Summer Collection",
    img: slider_img_2,
  },
  {
    id: 3,
    subtitle: "Winter Has Arrived",
    title: "Amazing New designs",
    img: slider_img_3,
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
        `,
        }}
      />
      {/*
        The nav uses position:absolute (tp-header-transparent) so it overlays content.
        paddingTop on the section pushes all content below the nav (~120px on desktop).
        Store/category pages do the same via .tp-store-section { padding-top: 110px }.
      */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "600px",
        }}
      >
        {/* Left content card */}
        <div
          style={{
            backgroundColor: "#DEDED1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "130px 4rem 3rem 4rem",
            gap: "1.25rem",
          }}
        >
          <h3
            style={{
              fontFamily: "SourceSerif4ExtraLightItalic, serif",
              fontStyle: "italic",
              fontWeight: 200,
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              lineHeight: 1.3,
              color: "#1a1a1a",
              margin: 0,
              textAlign: "left",
            }}
          >
            Nature&apos;s Art, Crafted for the Heart
          </h3>
          <p
            style={{
              color: "#4b5563",
              fontSize: "0.925rem",
              lineHeight: 1.75,
              textAlign: "left",
              margin: 0,
              maxWidth: "400px",
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
              marginTop: "0.5rem",
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

        {/* Right image slider — starts from y=0, image fills full panel */}
        <div style={{ position: "relative", minHeight: "600px" }}>
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
              <SwiperSlide key={item.id} style={{ position: "relative", height: "100%" }}>
                <Image
                  src={item.img}
                  alt="slider img"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ objectFit: "cover", objectPosition: "center 20%" }}
                  priority={item.id === 1}
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
