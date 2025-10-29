"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoLoop from "../LogoLoop";
import { Handshake } from "lucide-react";
import CustomButton from "./custom-button";

gsap.registerPlugin(ScrollTrigger);

type logo = {
  src: string;
  alt: string;
  href: string;
};

const imageLogos: logo[] = [
  {
    src: "https://www.apple.com/favicon.ico",
    alt: "Apple",
    href: "https://www.apple.com",
  },
  {
    src: "https://www.google.com/favicon.ico",
    alt: "Google",
    href: "https://www.google.com",
  },
  {
    src: "https://www.netflix.com/favicon.ico",
    alt: "Netflix",
    href: "https://www.netflix.com",
  },
  {
    src: "https://www.facebook.com/favicon.ico",
    alt: "Facebook",
    href: "https://www.facebook.com",
  },
  {
    src: "https://www.amazon.com/favicon.ico",
    alt: "Amazon",
    href: "https://www.amazon.com",
  },
  {
    src: "https://www.spotify.com/favicon.ico",
    alt: "Spotify",
    href: "https://www.spotify.com",
  },
  {
    src: "https://twitter.com/favicon.ico",
    alt: "Twitter",
    href: "https://twitter.com",
  },
  {
    src: "https://www.linkedin.com/favicon.ico",
    alt: "LinkedIn",
    href: "https://www.linkedin.com",
  },
  {
    src: "https://www.youtube.com/favicon.ico",
    alt: "YouTube",
    href: "https://www.youtube.com",
  },
  {
    src: "https://www.microsoft.com/favicon.ico",
    alt: "Microsoft",
    href: "https://www.microsoft.com",
  },
  {
    src: "https://www.adobe.com/favicon.ico",
    alt: "Adobe",
    href: "https://www.adobe.com",
  },
  {
    src: "https://www.tesla.com/favicon.ico",
    alt: "Tesla",
    href: "https://www.tesla.com",
  },
];

const SponsorSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const logoRow1Ref = useRef<HTMLDivElement>(null);
  const logoRow2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Stats animation
      gsap.from(statsRef.current?.children || [], {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Logo rows animation
      gsap.from([logoRow1Ref.current, logoRow2Ref.current], {
        scrollTrigger: {
          trigger: logoRow1Ref.current,
          start: "top 90%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        scale: 0.95,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-linear-to-b from-gray-50 via-white to-gray-50 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-linear-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-linear-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-br from-orange-100/20 to-pink-100/20 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-tl from-orange-600 via-orange-500 to-yellow-400 rounded-full mb-6">
            <Handshake className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white uppercase tracking-wider">
              Our Partners
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-gray-800 to-gray-900">
            Guided by Trust
            <br />
            <span className="bg-clip-text text-transparent bg-linear-to-tl mt-4 from-orange-600 via-orange-500 to-yellow-400 ">
              United in Purpose
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Working hand in hand with communities, volunteers, and leaders to
            make a meaningful difference in the world.
          </p>
        </div>

        {/* Logo Carousel Rows */}
        <div className="space-y-4 md:space-y-3">
          {/* First Row */}
          <div ref={logoRow1Ref} className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-gray-50 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-gray-50 to-transparent z-10" />
            <LogoLoop
              logos={imageLogos}
              speed={50}
              direction="right"
              logoHeight={64}
              gap={80}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#fafafa"
              ariaLabel="Technology partners row 1"
            />
          </div>

          {/* Second Row */}
          <div ref={logoRow2Ref} className="relative">
            <LogoLoop
              logos={imageLogos}
              speed={50}
              direction="left"
              logoHeight={64}
              gap={80}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#fafafa"
              ariaLabel="Technology partners row 2"
            />
          </div>

          {/* Third Row (Optional - for more logos) */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-gray-50 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-gray-50 to-transparent z-10" />
            <LogoLoop
              logos={imageLogos}
              speed={50}
              direction="right"
              logoHeight={64}
              gap={80}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#fafafa"
              ariaLabel="Technology partners row 3"
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6 text-lg">
            Join these industry leaders
          </p>
          <CustomButton className="mx-auto">
            <span>Become a Partner</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            {/* Animated glow effect */}
            <div className="absolute inset-0 rounded-full bg-linear-to-r from-pink-400 to-purple-400 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
          </CustomButton>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(#e5e7eb 1px, transparent 1px),
            linear-gradient(90deg, #e5e7eb 1px, transparent 1px);
          background-size: 50px 50px;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
};

export default SponsorSection;
