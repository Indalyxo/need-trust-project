"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentNews = newsItems[currentIndex];

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <h1 className=" text-center text-2xl md:text-5xl font-bold text-[#fc5a00]">
            Latest News
          </h1>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-card rounded-2xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[500px]">
            {/* Image Section */}
            <div className="relative overflow-hidden bg-muted">
              <div className="relative w-full h-full min-h-[450px] md:min-h-[550px]">
                <Image
                  src={currentNews.image}
                  alt={currentNews.title}
                  fill
                  className="object-cover transition-opacity duration-500"
                  priority
                  quality={75}
                  onError={(e) => {
                    const imgElement = e.target as HTMLImageElement;
                    imgElement.src = "/placeholder.svg";
                  }}
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-between p-8 md:p-10">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xm font-semibold text-primary uppercase tracking-wider">
                    {currentNews.category}
                  </span>
                  <span className="text-xm text-muted-foreground">
                    {currentNews.date}
                  </span>
                </div>

                <h3 className="text-4xl md:text-3xl font-bold text-foreground mb-3 leading-tight">
                  {currentNews.title}
                </h3>

                <p className="text-lg text-primary font-semibold mb-4">
                  {currentNews.subtitle}
                </p>

                <p className="text-base text-muted-foreground leading-relaxed">
                  {currentNews.description}
                </p>
              </div>

              {/* Navigation Indicators */}
              <div className="flex items-center justify-center mt-8 pt-6 border-t border-border">
                <div className="flex gap-2">
                  {newsItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentIndex(index);
                      }}
                      className={`h-2 rounded-full transition-all ${
                        index === currentIndex
                          ? "bg-primary w-8"
                          : "bg-border w-2 hover:bg-muted-foreground"
                      }`}
                      aria-label={`Go to news ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
