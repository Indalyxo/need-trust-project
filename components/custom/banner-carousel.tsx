"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const banners = [
  {
    title: "Khud se Jeet",
    subtitle: "Karein shuruaat samay par jaanch ke saath",
    logo: "https://www.netflix.com/favicon.ico",
    image:
      "https://scontent.fmaa1-1.fna.fbcdn.net/o1/v/t0/f2/m340/AQNHakN2Vl7QGqO3eT4aEk1aL1-cU7RA9DN49yXclV4ocmhzOcT1PRCAe4rUphEPtgDQEvvsX0sykCUr7kTJGQrp8gWR2AU78QXGfXhGvI7UjlnADRobEiFLWzRlV072bjvFfMcs-K1zZk9RjzgxvLQ9vpib.jpeg?_nc_ht=scontent.fmaa1-1.fna.fbcdn.net&_nc_gid=ftNPZOy9Kao0Dypvx0rMeQ&_nc_cat=105&_nc_oc=AdkbdrP1x4thZtB5OopyjXRwHUeKfpeYM85wlR_wmNk9Y8PgQ9aXDmd-1vpR9qMGlpc&ccb=9-4&oh=00_AfdfHisTcHY4I9PnaUvHno9y-Ix5YrfehV9pVW-dQFPlZQ&oe=68FF05CC&_nc_sid=5b3566",
    button: "Know more",
    link: "#",
  },
  {
    title: "Cancer Se Jeetna Sambhav Hai",
    subtitle: "Join the movement for a cancer-free India",
    logo: "https://www.netflix.com/favicon.ico",
    image:
      "https://scontent.fmaa1-1.fna.fbcdn.net/o1/v/t0/f2/m340/AQOZRJpdGtUwTdgFzA2I3HwgoLMAWufmEqP1KQ4vH-bJ4hGo2SzQaR_FlIwD6cQtcrJmR4jY2tRIgoRnTdP3CYZaHCDs2SQJsU10o3rtITqYI-stnUCnrlojzg9NgxUgZtzpNk0ZfkovhhKm4cWmbWIx0_Tvgw.jpeg?_nc_ht=scontent.fmaa1-1.fna.fbcdn.net&_nc_gid=JGOlcj8UohQCnXsBzfa4MA&_nc_cat=108&_nc_oc=AdknDU5Zgz016W2ZUslrHreTQLH32wX1sJ55Rbb-7lkAAscs840GZZ9X4Z2wsE1pLvM&ccb=9-4&oh=00_AfeIvgBsAw5LN3knHjoa7RtqXSyiL76jq-ATpzTpT6UfHA&oe=68FF06AF&_nc_sid=5b3566",
    button: "Learn More",
    link: "#",
  },
];

export default function BannerCarousel() {
  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
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
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent md:from-black/80 md:via-black/40 md:to-transparent" />
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
                        <a
                          href={banner.link}
                          className="inline-block bg-gradient-to-tl from-orange-600 via-orange-500 to-yellow-400 hover:from-orange-700 hover:to-yellow-500 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 shadow-2xl hover:shadow-orange-400/50 hover:scale-105 transform"
                        >
                          {banner.button}
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
      <button className="swiper-button-prev-custom absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 group">
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
      </button>

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
