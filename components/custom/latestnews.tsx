"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight, Newspaper } from "lucide-react";
import CustomButton from "./custom-button";
import VerticalAd from "./vertical-ad";

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

export function LatestNews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const imageRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);

  /* --------------------------------------------
      INITIAL MOUNT ANIMATION (SAFE WITH CONTEXT)
    -------------------------------------------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
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
    });

    return () => ctx.revert();
  }, []);

  /* --------------------------------------------
      SAFE TRANSITION ANIMATION USING CONTEXT
    -------------------------------------------- */
  const animateTransition = (newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false),
      });

      // Animate OUT
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
          "-=0.2"
        );

      // Swap content AFTER out animation
      tl.add(() => setCurrentIndex(newIndex));

      // Animate IN
      tl.fromTo(
        imageRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        }
      ).fromTo(
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
    });

    return () => ctx.revert();
  };

  const handleNext = () => {
    animateTransition((currentIndex + 1) % newsItems.length);
  };

  const handlePrevious = () => {
    animateTransition((currentIndex - 1 + newsItems.length) % newsItems.length);
  };

  const handleDotClick = (index: number) => {
    if (index !== currentIndex) animateTransition(index);
  };

  /* Auto-slide every 6 seconds */
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  const currentNews = newsItems[currentIndex];

  return (
    <section id="latest-news" className="relative py-16 overflow-hidden bg-linear-to-b from-gray-50 to-white w-full">
      <div className="w-full">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-12 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-tl from-orange-600 via-orange-500 to-yellow-400 rounded-full mb-6">
            <Newspaper className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white uppercase tracking-wider">
              Latest News
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
            Fresh Updates,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-400">
              Straight from Us
            </span>
          </h2>
        </div>

        {/* Main Content with Vertical Ads */}
        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center px-4">
          {/* Left Vertical Ad */}
          <div className="hidden lg:block flex-shrink-0">
            <VerticalAd position="left" />
          </div>

          {/* Carousel Container */}
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100 flex-1 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 max-h-[600px]">
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

            {/* Content */}
            <div className="p-10 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Meta */}
                <div ref={categoryRef} className="flex justify-between">
                  <span className="text-gray-600">{currentNews.date}</span>
                  <span className="text-orange-600 font-semibold">
                    {currentIndex + 1} / {newsItems.length}
                  </span>
                </div>

                {/* Title */}
                <h3 ref={titleRef} className="text-3xl font-bold">
                  {currentNews.title}
                </h3>

                {/* Subtitle */}
                <p ref={subtitleRef} className="text-xl text-orange-600 font-semibold">
                  {currentNews.subtitle}
                </p>

                {/* Description */}
                <p ref={descriptionRef} className="text-gray-600">
                  {currentNews.description}
                </p>

                <CustomButton>Read More →</CustomButton>
              </div>

              {/* Controls */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                {/* Dots */}
                <div className="flex gap-2">
                  {newsItems.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleDotClick(i)}
                      disabled={isAnimating}
                      className={`h-2 rounded-full transition-all ${
                        i === currentIndex
                          ? "w-8 bg-orange-600"
                          : "w-2 bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Arrows */}
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevious}
                    disabled={isAnimating}
                    className="p-2 bg-gray-100 rounded-full hover:bg-orange-600 hover:text-white transition"
                  >
                    <ChevronLeft />
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={isAnimating}
                    className="p-2 bg-gray-100 rounded-full hover:bg-orange-600 hover:text-white transition"
                  >
                    <ChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-gray-200">
            <div
              className="h-full bg-gradient-to-r from-orange-600 to-yellow-400 transition-all"
              style={{
                width: `${((currentIndex + 1) / newsItems.length) * 100}%`,
              }}
            />
          </div>
        </div>

          {/* Right Vertical Ad */}
          <div className="hidden lg:block flex-shrink-0">
            <VerticalAd position="right" />
          </div>
        </div>
      </div>
    </section>
  );
}
