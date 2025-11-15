"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight, Newspaper } from "lucide-react";
import CustomButton from "../../components/custom/custom-button";
import Navbar from "../../components/custom/navigation-menu";
import Footer from "../../components/custom/footer-section";

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

export default function LatestNews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const imageRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);

  /* --------------------------------------------------
      INITIAL ANIMATION — FIXED WITH GSAP CONTEXT
  -------------------------------------------------- */
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

  /* --------------------------------------------------
      TRANSITION ANIMATION — FULLY FIXED
  -------------------------------------------------- */
  const animateTransition = (newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
        },
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
        )
        .add(() => setCurrentIndex(newIndex)) // <-- UPDATE CONTENT ONLY AFTER OUT
        .fromTo(
          imageRef.current,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          }
        )
        .fromTo(
          [
            categoryRef.current,
            titleRef.current,
            subtitleRef.current,
            descriptionRef.current,
          ],
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
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
    animateTransition(
      (currentIndex - 1 + newsItems.length) % newsItems.length
    );
  };

  const handleDotClick = (index: number) => {
    if (!isAnimating && index !== currentIndex) {
      animateTransition(index);
    }
  };

  /* AUTO SLIDE FIX */
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  const currentNews = newsItems[currentIndex];

  return (
    <div>
      <Navbar />

      {/* YOUR UI CODE BELOW (unchanged) */}
      <section
        id="latest-news"
        className="relative py-16 overflow-hidden bg-linear-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          {/* HEADER */}
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

          {/* MAIN CARD */}
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[500px]">
              
              {/* IMAGE */}
              <div ref={imageRef} className="relative overflow-hidden bg-gray-100">
                <Image
                  src={currentNews.image}
                  alt={currentNews.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-6 left-6 z-10">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-orange-600 font-bold text-sm rounded-full shadow-lg">
                    {currentNews.category}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex flex-col justify-between p-8 md:p-10 lg:p-12">
                <div className="space-y-6">
                  <div
                    ref={categoryRef}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="text-sm text-gray-600 font-medium">
                      {currentNews.date}
                    </span>

                    <span className="font-semibold text-orange-600">
                      {currentIndex + 1}/{newsItems.length}
                    </span>
                  </div>

                  <h3
                    ref={titleRef}
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900"
                  >
                    {currentNews.title}
                  </h3>

                  <p
                    ref={subtitleRef}
                    className="text-lg sm:text-xl text-orange-600 font-semibold"
                  >
                    {currentNews.subtitle}
                  </p>

                  <p
                    ref={descriptionRef}
                    className="text-base text-gray-600 leading-relaxed"
                  >
                    {currentNews.description}
                  </p>

                  <CustomButton>Read More →</CustomButton>
                </div>

                {/* NAVIGATION */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <div className="flex gap-2">
                    {newsItems.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handleDotClick(i)}
                        className={`h-2 rounded-full transition-all ${
                          i === currentIndex
                            ? "bg-orange-600 w-8"
                            : "bg-gray-300 w-2"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button onClick={handlePrevious} className="p-2 rounded-full bg-gray-100 hover:bg-orange-600 hover:text-white transition">
                      <ChevronLeft />
                    </button>
                    <button onClick={handleNext} className="p-2 rounded-full bg-gray-100 hover:bg-orange-600 hover:text-white transition">
                      <ChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* PROGRESS BAR */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-orange-600 to-red-600 transition-all"
                style={{
                  width: `${((currentIndex + 1) / newsItems.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
