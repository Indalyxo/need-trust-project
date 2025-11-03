"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "../../components/custom/navigation-menu";

// ✅ Local images imported directly
import Img1 from "../../public/img1.jpg";
import Img2 from "../../public/img1.jpg";
import Img3 from "../../public/img1.jpg";
import Img4 from "../../public/img1.jpg";
import Img5 from "../../public/img1.jpg";
import Img6 from "../../public/img1.jpg";

interface GalleryItem {
  id: number;
  src: any; // can be StaticImageData
  title: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: Img1,
    title: "Mountain View",
    description: "Breathtaking mountain landscape at sunset",
  },
  {
    id: 2,
    src: Img2,
    title: "Ocean Waves",
    description: "Serene ocean waves crashing on the shore",
  },
  {
    id: 3,
    src: Img3,
    title: "Forest Path",
    description: "Peaceful path through ancient forest",
  },
  {
    id: 4,
    src: Img4,
    title: "City Lights",
    description: "Vibrant city skyline at night",
  },
  {
    id: 5,
    src: Img5,
    title: "Desert Dunes",
    description: "Golden sand dunes under starry sky",
  },
  {
    id: 6,
    src: Img6,
    title: "Waterfall",
    description: "Majestic waterfall in tropical paradise",
  },
];

export default function Gallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div>
      <Navbar />
    <section className="w-full py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Gallery
          </h1>
          <p className="text-lg text-gray-600">
            Hover over images to reveal descriptions
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-lg aspect-square cursor-pointer group"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-black/70 flex flex-col items-center justify-center transition-opacity duration-300 ${
                  hoveredId === item.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="text-center px-6">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}
