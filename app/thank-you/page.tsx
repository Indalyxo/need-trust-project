"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DonationThankyou() {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center space-y-8">
          {/* Animated beating & glowing heart */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isAnimating ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="flex justify-center"
          >
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
              <motion.div
                animate={
                  isAnimating ? { opacity: [0.3, 0.8, 0.3] } : { opacity: 0.3 }
                }
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                className="absolute inset-0 bg-red-500 rounded-full blur-3xl"
              />
              <motion.div
                animate={
                  isAnimating ? { opacity: [0.2, 0.6, 0.2] } : { opacity: 0.2 }
                }
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.2,
                }}
                className="absolute inset-4 bg-red-400 rounded-full blur-2xl"
              />

              {/* Heart SVG with beating animation */}
              <motion.svg
                viewBox="0 0 24 24"
                className="w-full h-full relative z-10"
                fill="currentColor"
                animate={isAnimating ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                transition={{
                  duration: 1.2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  className="text-red-500"
                />
              </motion.svg>

              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-red-400 rounded-full shadow-lg"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 0,
                    scale: 1,
                  }}
                  animate={
                    isAnimating
                      ? {
                          x: Math.cos((i / 12) * Math.PI * 2) * 100,
                          y: Math.sin((i / 12) * Math.PI * 2) * 100,
                          opacity: [0, 1, 0],
                          scale: [1, 1.5, 0],
                        }
                      : {
                          x: 0,
                          y: 0,
                          opacity: 0,
                        }
                  }
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 1.2,
                    ease: "easeOut",
                  }}
                  style={{
                    left: "50%",
                    top: "50%",
                    marginLeft: "-4px",
                    marginTop: "-4px",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isAnimating ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white text-balance leading-tight">
              Thank You for Donating
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isAnimating ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 text-balance leading-relaxed">
              Your generosity makes a real difference. Together, we're creating
              positive change in the world.
            </p>
          </motion.div>

          {/* Supporting message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isAnimating ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="pt-4"
          >
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
              A confirmation email has been sent to you with details about your
              contribution.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isAnimating ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
          >
            <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors duration-200">
              Share Your Impact
            </button>
            <button className="px-8 py-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold transition-colors duration-200">
              Return Home
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
