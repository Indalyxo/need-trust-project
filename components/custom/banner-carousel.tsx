"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import CustomButton from "./custom-button";

const banners = [
  {
    title: "Khud se Jeet",
    subtitle: "Karein shuruaat samay par jaanch ke saath",
    logo: "https://www.netflix.com/favicon.ico",
    image:
      "https://res.cloudinary.com/dhpzmqznv/image/upload/v1761636626/ratan-tata-2025_kdrnaz.webp",
    link: "#",
  },
  {
    title: "Cancer Se Jeetna Sambhav Hai",
    subtitle: "Join the movement for a cancer-free India",
    logo: "https://www.netflix.com/favicon.ico",
    image:
      "https://res.cloudinary.com/dhpzmqznv/image/upload/v1761636708/tata-trusts-horizons-october-2025_ziviu3.webp",
    link: "#",
  },
];

export default function BannerCarousel() {
  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active bg-white",
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        className="h-full w-full"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Background Image - Full Width & Height */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={banner.image || "/placeholder.svg"}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay for Better Text Readability */}
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-transparent md:from-black/80 md:via-black/40 md:to-transparent" />
              </div>

              {/* Content Container */}
              <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left Section - Text Content */}
                    <div className="text-white space-y-4 sm:space-y-6 max-w-2xl">
                      {/* Logo */}
                      <div className="mb-4">
                        <img
                          src={banner.logo || "/placeholder.svg"}
                          alt="Logo"
                          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
                        />
                      </div>

                      {/* Title */}
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight drop-shadow-2xl">
                        {banner.title}
                      </h1>

                      {/* Subtitle */}
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-100 drop-shadow-lg max-w-xl">
                        {banner.subtitle}
                      </p>

                      {/* CTA Button */}
                      <div className="pt-4">
                        <a href={banner.link}>
                          <CustomButton>Donate Now</CustomButton>
                        </a>
                      </div>
                    </div>

                    {/* Right Section - Empty on desktop for image visibility */}
                    <div className="hidden lg:block" />
                  </div>
                </div>
              </div>

              {/* Mobile: Additional semi-transparent card for better readability */}
              <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 sm:p-8">
                {/* Content already shown above, this just adds extra contrast on mobile */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      {/* <button className="swiper-button-prev-custom absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 group">
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button className="swiper-button-next-custom absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 group">
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button> */}

      {/* Custom Styles for Swiper Pagination */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 20px !important;
        }

        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s;
        }

        .swiper-pagination-bullet-active {
          width: 32px;
          border-radius: 6px;
          background: white !important;
        }

        @media (min-width: 640px) {
          .swiper-pagination {
            bottom: 30px !important;
          }

          .swiper-pagination-bullet {
            width: 14px;
            height: 14px;
          }

          .swiper-pagination-bullet-active {
            width: 40px;
          }
        }

        /* Hide default Swiper navigation buttons */
        .swiper-button-next,
        .swiper-button-prev {
          display: none;
        }
      `}</style>
    </div>
  );
}
