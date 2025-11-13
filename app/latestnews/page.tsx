"use client";

import { useState } from "react";
import Image from "next/image";
import { Newspaper, Calendar, Clock } from "lucide-react";
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
  readTime?: string;
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
    readTime: "5 min read",
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
    readTime: "3 min read",
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
    readTime: "4 min read",
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
    readTime: "6 min read",
  },
];

export default function LatestNews() {
  const [selectedNews, setSelectedNews] = useState(0);

  const handleNewsSelect = (index: number) => {
    setSelectedNews(index);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Technology: "from-orange-400 to-yellow-500",
      Business: "from-yellow-500 to-orange-400",
      Environment: "from-orange-500 to-yellow-600",
      Health: "from-yellow-400 to-orange-500",
    };
    return (
      colors[category as keyof typeof colors] || "from-orange-500 to-yellow-500"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
      <Navbar />

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mb-6 shadow-lg">
              <Newspaper className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                Latest News
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Stay Updated
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
                Stay Ahead
              </span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the latest trends, insights, and breaking news that
              matter to you
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured Article - Large */}
            <div className="lg:col-span-2">
              <div className="relative h-full min-h-[600px] bg-white rounded-3xl overflow-hidden shadow-xl border border-orange-100">
                <div className="relative h-2/3">
                  <Image
                    src={newsItems[selectedNews].image}
                    alt={newsItems[selectedNews].title}
                    fill
                    className="object-cover"
                    priority
                    onError={(e) => {
                      const imgElement = e.target as HTMLImageElement;
                      imgElement.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <span
                      className={`px-4 py-2 bg-gradient-to-r ${getCategoryColor(
                        newsItems[selectedNews].category
                      )} text-white font-bold text-sm rounded-full shadow-lg`}
                    >
                      {newsItems[selectedNews].category}
                    </span>
                  </div>
                  {/* Meta Info */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-4 text-white/90 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{newsItems[selectedNews].date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{newsItems[selectedNews].readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 h-1/3 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {newsItems[selectedNews].title}
                    </h2>
                    <p className="text-lg text-orange-600 font-semibold mb-4">
                      {newsItems[selectedNews].subtitle}
                    </p>
                    <p className="text-gray-600 line-clamp-3">
                      {newsItems[selectedNews].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* News List - Right Side */}
            <div className="lg:col-span-1">
              <div className="h-full min-h-[600px] bg-white rounded-3xl p-6 shadow-xl border border-orange-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full"></div>
                  Recent Stories
                </h3>

                <div
                  className="space-y-3 overflow-y-auto"
                  style={{ maxHeight: "calc(600px - 6rem)" }}
                >
                  {newsItems.map((item, index) => (
                    <div
                      key={item.id}
                      onClick={() => handleNewsSelect(index)}
                      className={`p-3 rounded-2xl cursor-pointer border-2 ${
                        selectedNews === index
                          ? "bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-300 shadow-md"
                          : "bg-gray-50 border-transparent"
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              const imgElement = e.target as HTMLImageElement;
                              imgElement.src = "/placeholder.svg";
                            }}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`px-2 py-1 bg-gradient-to-r ${getCategoryColor(
                                item.category
                              )} text-white text-xs font-bold rounded-full`}
                            >
                              {item.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              {item.date}
                            </span>
                          </div>

                          <h4 className="font-bold text-gray-900 text-sm line-clamp-2 mb-1">
                            {item.title}
                          </h4>

                          <p className="text-xs text-gray-600 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-12 lg:col-span-3">
            <div className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-300 rounded-3xl p-8 lg:p-10 text-center shadow-2xl">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                Never Miss an Update
              </h3>
              <p className="text-gray-700 text-base mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter and get the latest news delivered
                straight to your inbox
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-2xl border-0 bg-white/60 backdrop-blur-sm text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-600"
                />
                <CustomButton className="bg-gray-900 text-white hover:bg-gray-800 font-bold">
                  Subscribe
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
