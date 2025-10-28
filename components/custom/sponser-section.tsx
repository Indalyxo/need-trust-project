import React from "react";
import LogoLoop from "../LogoLoop";

const imageLogos = [
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
];

const SponserSection = () => {
  return (
    <section className="relative py-16 bg-linear-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Decorative blurred linear */}
      <div className="absolute inset-0 bg-linear-to-r from-indigo-100 via-white to-pink-100 opacity-40 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-5xl font-semibold text-gray-800 mb-8">
          Trusted by Industry Leaders
        </h2>

        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Our technology and design partners help us deliver exceptional
          experiences. We’re proud to collaborate with the world’s top brands.
        </p>

        <div className="flex flex-col gap-8">
          <LogoLoop
            logos={imageLogos}
            speed={70}
            direction="right"
            logoHeight={56}
            gap={60}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Technology partners row 1"
          />
          <LogoLoop
            logos={imageLogos}
            speed={70}
            direction="left"
            logoHeight={56}
            gap={60}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Technology partners row 2"
          />
        </div>
      </div>
    </section>
  );
};

export default SponserSection;
