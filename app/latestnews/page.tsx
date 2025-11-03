"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Award, ChevronLeft, ChevronRight, Newspaper } from "lucide-react";
import CustomButton from "../../components/custom/custom-button";
import Navbar from "../../components/custom/navigation-menu";

interface NewsItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  date: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Breaking: New Technology Revolutionizes Industry",
    subtitle: "Innovation Meets Reality",
    description:
      "Discover how cutting-edge technology is transforming the way we work and live. Industry leaders are embracing this revolutionary change.",
    image: "/modern-tech-innovation.png",
    category: "Technology",
    date: "Oct 28, 2025",
  },
  {
    id: 2,
    title: "Global Markets Show Strong Growth",
    subtitle: "Economic Outlook Brightens",
    description:
      "Financial analysts report optimistic trends across major markets. Investors are showing renewed confidence in emerging opportunities.",
    image: "/financial-markets-growth.jpg",
    category: "Business",
    date: "Oct 27, 2025",
  },
  {
    id: 3,
    title: "Sustainability Initiatives Gain Momentum",
    subtitle: "Green Future Ahead",
    description:
      "Companies worldwide are committing to environmental goals. This shift represents a fundamental change in corporate responsibility.",
    image: "/sustainable-environment-green.jpg",
    category: "Environment",
    date: "Oct 26, 2025",
  },
  {
    id: 4,
    title: "Healthcare Advances Save Lives",
    subtitle: "Medical Breakthroughs",
    description:
      "Recent developments in medical science are providing new hope for patients. Researchers celebrate major achievements in treatment options.",
    image: "/healthcare-medical-research.png",
    category: "Health",
    date: "Oct 25, 2025",
  },
];

export default  function LatestNews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);

  // Initial animation on mount
  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
      .from(
        imageRef.current,
        {
          x: -100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .from(
        [
          categoryRef.current,
          titleRef.current,
          subtitleRef.current,
          descriptionRef.current,
        ],
        {
          x: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.7"
      );
  }, []);

  const animateTransition = (newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(newIndex);
        setIsAnimating(false);
      },
    });

    // Animate out
    tl.to(imageRef.current, {
      scale: 1.1,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    })
      .to(
        [
          categoryRef.current,
          titleRef.current,
          subtitleRef.current,
          descriptionRef.current,
        ],
        {
          x: -30,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.in",
        },
        "-=0.3"
      )
      // Animate in
      .set(imageRef.current, { scale: 0.9, x: 0 })
      .to(imageRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      })
      .fromTo(
        [
          categoryRef.current,
          titleRef.current,
          subtitleRef.current,
          descriptionRef.current,
        ],
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4"
      );
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % newsItems.length;
    animateTransition(newIndex);
  };

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + newsItems.length) % newsItems.length;
    animateTransition(newIndex);
  };

  const handleDotClick = (index: number) => {
    if (index !== currentIndex) {
      animateTransition(index);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  const currentNews = newsItems[currentIndex];

  return (
    <div>
        <Navbar />
    <section id="latest-news" className="relative py-16 overflow-hidden bg-linear-to-b from-gray-50 to-white">
        
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-tl from-orange-600 via-orange-500 to-yellow-400 rounded-full mb-6">
            <Newspaper className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white uppercase tracking-wider">
              Latest News
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-gray-800 to-gray-900">
            Fresh Updates,
            <br />
            <span className="bg-clip-text text-transparent bg-linear-to-tl mt-4 from-orange-600 via-orange-500 to-yellow-400 ">
              Straight from Us
            </span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[500px]">
            {/* Image Section */}
            <div
              ref={imageRef}
              className="relative overflow-hidden bg-gray-100"
            >
              <div className="relative w-full h-full min-h-[400px] lg:min-h-[550px]">
                <Image
                  src={currentNews.image}
                  alt={currentNews.title}
                  fill
                  className="object-cover"
                  priority
                  quality={85}
                  onError={(e) => {
                    const imgElement = e.target as HTMLImageElement;
                    imgElement.src = "/placeholder.svg";
                  }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent lg:bg-linear-to-r lg:from-transparent lg:to-black/10" />
              </div>

              {/* Category Badge on Image */}
              <div className="absolute top-6 left-6 z-10">
                <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-orange-600 font-bold text-sm rounded-full shadow-lg">
                  {currentNews.category}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div
              ref={contentRef}
              className="flex flex-col justify-between p-8 md:p-10 lg:p-12"
            >
              <div className="space-y-6">
                {/* Meta Info */}
                <div ref={categoryRef} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-1 w-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-full" />
                    <span className="text-sm text-gray-600 font-medium">
                      {currentNews.date}
                    </span>
                  </div>
                  {/* Counter */}
                  <div className="text-center text-sm text-gray-600">
                    <span className="font-semibold text-orange-600">
                      {currentIndex + 1}
                    </span>
                    {" / "}
                    <span>{newsItems.length}</span>
                  </div>
                </div>

                {/* Title */}
                <h3
                  ref={titleRef}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
                >
                  {currentNews.title}
                </h3>

                {/* Subtitle */}
                <p
                  ref={subtitleRef}
                  className="text-lg sm:text-xl text-orange-600 font-semibold"
                >
                  {currentNews.subtitle}
                </p>

                {/* Description */}
                <p
                  ref={descriptionRef}
                  className="text-base text-gray-600 leading-relaxed"
                >
                  {currentNews.description}
                </p>

                {/* Read More Button */}
                <CustomButton>
                  Read More
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </CustomButton>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                {/* Dot Indicators */}
                <div className="flex gap-2">
                  {newsItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      disabled={isAnimating}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "bg-gradient-to-r from-orange-600 to-red-600 w-8"
                          : "bg-gray-300 w-2 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to news ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Arrow Navigation */}
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevious}
                    disabled={isAnimating}
                    className="p-2 rounded-full bg-gray-100 hover:bg-orange-600 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                    aria-label="Previous news"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={isAnimating}
                    className="p-2 rounded-full bg-gray-100 hover:bg-orange-600 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                    aria-label="Next news"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div
              className="h-full bg-gradient-to-r from-orange-600 to-red-600 transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / newsItems.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
