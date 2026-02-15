"use client"

import Link from "next/link"
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
    delay: 1000,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
    waitForTransition: true,
  },
  navigation: {
    nextEl: ".tp-slider-2-button-next",
    prevEl: ".tp-slider-2-button-prev",
  },
}

const FashionBanner = () => {
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
          }
        `,
        }}
      />
      <div className="flex flex-col w-full h-full p-1"></div>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-0 py-20 px-6 lg:px-20 bg-gray-50 auto-rows-fr">
        <div
          className="flex flex-col justify-center items-center space-y-6 text-center w-full h-full p-6"
          style={{ backgroundColor: "#DEDED1" }}
        >
          <h3
            className="text-lg font-bold text-gray-900"
            style={{
              fontFamily: "SourceSerif4ExtraLightItalic, serif",
              fontStyle: "italic",
              fontWeight: 200,
              fontSize: "33px",
            }}
          >
            Nature&apos;s Art, Crafted for the Heart
          </h3>
          <p className="text-gray-600 max-w-md">
            Every gemstone holds a story of love, memory, and meaning. More than
            a sparkle, it captures emotions that last a lifetime. At CROWNCUT
            Gems International, we believe every gem is a promise and a timeless
            reflection of life&apos;s most beautiful moments.
          </p>
          <Link
            href="/shop"
            className="tp-btn tp-btn-border inline-block bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-all text-sm w-fit"
          >
            Shop Collection
          </Link>
          <div className="flex flex-col w-full h-full p-6"></div>
        </div>
        <div className="flex flex-col w-full h-full">
          <div className="tp-slider-area relative z-10 w-full h-full">
            <Swiper
              {...sliderSetting}
              modules={[Navigation, EffectFade, Autoplay]}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
                waitForTransition: true,
              }}
              className="tp-slider-active-2 swiper-container w-full"
              style={{ height: "100%", width: "100%" }}
            >
              {sliderData.map((item) => (
                <SwiperSlide key={item.id} className="h-full">
                  <div className="tp-slider-item-2 relative bg-gray-100 flex items-center justify-center rounded-none overflow-hidden w-full h-full">
                    <img
                      src={item.img.src}
                      alt="slider img"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  )
}

export default FashionBanner
