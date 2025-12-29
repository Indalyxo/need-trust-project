"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/custom/navigation-menu";
import { ExternalLink, TrendingUp, Users, Heart, Award, GraduationCap, } from "lucide-react";
import Footer from "@/components/custom/footer-section";

// --- Services Data ---
const services = [
  {
    title: "Nellai Connect Platform",
    description:
      "Nellai Connect bridges Tirunelveli's people, services, and businesses through a smart digital platform. Connecting communities, simplifying access, and empowering local growth.",
    tagline: "Focus Areas: Training • Employment • Awareness",
    url: "https://nellaiconnect.in",
    icon: <TrendingUp className="w-8 h-8" />,
  },
];

interface Impact {
  id: number;
  title: string;
  description: string;
  imagePath: string;
  icon: string;
  statsValue: string;
  statsLabel: string;
}

const iconMap: { [key: string]: React.ReactNode } = {
  Users: <Users className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  Award: <Award className="w-6 h-6" />,
  GraduationCap: <GraduationCap className="w-6 h-6" />,
};

export default function ServicesSection() {
  const [impacts, setImpacts] = useState<Impact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImpacts = async () => {
      try {
        const res = await fetch("/api/impacts");
        const json = await res.json();
        if (json.success) {
          setImpacts(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch impacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImpacts();
  }, []);
  return (
    <>
      <div>
        <Navbar />

        {/* --- Services Section --- */}
        <section
          id="services"
          className="relative bg-gradient-to-br from-orange-50 via-yellow-50 to-white min-h-screen py-12 px-4 md:px-12 overflow-hidden"
        >
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ amount: 0.4, once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full mb-6">
                <Heart className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-semibold text-orange-600 uppercase tracking-wider">
                  Our Services
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Works We Do
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Empowering communities through innovative digital solutions and
                sustainable initiatives
              </p>
            </motion.div>

            {/* Service Cards */}
            <div className="flex flex-col gap-12">
              {services.map((service, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    x: i % 2 === 0 ? -80 : 80,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  viewport={{ amount: 0.4, once: true }}
                  className="relative group"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-orange-100 hover:border-orange-200">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                          {service.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-orange-600 font-semibold">
                          <span>{service.tagline}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                      {service.description}
                    </p>

                    {/* Embedded Website */}
                    <div className="relative rounded-xl overflow-hidden border-4 border-orange-100 shadow-xl">
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-yellow-500 p-3 flex items-center justify-between z-10">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-white/80" />
                            <div className="w-3 h-3 rounded-full bg-white/80" />
                            <div className="w-3 h-3 rounded-full bg-white/80" />
                          </div>
                          <span className="text-white text-sm font-medium ml-3 truncate">
                            {service.url}
                          </span>
                        </div>
                        <a
                          href={service.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 text-white" />
                        </a>
                      </div>
                      <div className="pt-12">
                        <iframe
                          src={service.url}
                          title={service.title}
                          className="w-full h-[400px] md:h-[500px] bg-white"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-6 flex justify-center">
                      <a
                        href={service.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        Visit Platform
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Impact Section --- */}
        <section className="relative bg-white py-20 px-4 md:px-12 border-t-4 border-orange-200">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(#fb923c 1px, transparent 1px), linear-gradient(90deg, #fb923c 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ amount: 0.4, once: true }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full mb-6">
                <Award className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-semibold text-orange-600 uppercase tracking-wider">
                  Making a Difference
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Our Impact in Action
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Real stories of transformation and positive change in our
                communities
              </p>
            </motion.div>

            {/* Impact Cards */}
            <div className="flex flex-col gap-24">
              {loading ? (
                <div className="text-center text-gray-600">Loading impacts...</div>
              ) : impacts.length === 0 ? (
                <div className="text-center text-gray-600">No impacts available</div>
              ) : (
                impacts.map((impact, i) => (
                  <motion.div
                    key={impact.id}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ amount: 0.3, once: true }}
                    className={`flex flex-col md:flex-row ${i % 2 !== 0 ? "md:flex-row-reverse" : ""
                      } items-center gap-10 md:gap-16`}
                  >
                    {/* Text Section */}
                    <div className="md:w-1/2 space-y-6">
                      {/* Icon and Stats Badge */}
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl shadow-lg">
                          {iconMap[impact.icon] || <Award className="w-6 h-6" />}
                        </div>
                        <div className="px-4 py-2 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border-2 border-orange-200">
                          <p className="text-2xl font-bold text-orange-600">
                            {impact.statsValue}
                          </p>
                          <p className="text-xs text-gray-600 font-medium">
                            {impact.statsLabel}
                          </p>
                        </div>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {impact.title}
                      </h3>

                      <p className="text-gray-700 leading-relaxed text-lg">
                        {impact.description}
                      </p>
                    </div>

                    {/* Image Section */}
                    <motion.div
                      whileHover={{ scale: 1.03, rotateY: 2 }}
                      transition={{ duration: 0.4 }}
                      className="md:w-1/2 relative group"
                    >
                      <img
                        src={impact.imagePath}
                        alt={impact.title}
                        className="w-full h-80 md:h-96 object-contain object-cover rounded-2xl"
                      />

                      {/* Decorative Elements */}
                      <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                    </motion.div>

                  </motion.div>
                ))
              )}
            </div>

            {/* Call to Action */}
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ amount: 0.4, once: true }}
              className="text-center mt-20"
            >
              <p className="text-gray-700 mb-6 text-lg">
                Want to be part of our journey?
              </p>
              <button className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Join Our Mission
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </motion.div> */}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}