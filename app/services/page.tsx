"use client";
import { motion } from "framer-motion";
import React from "react";

// --- Services Data ---
const services = [
  {
    title: "Women Empowerment Program",
    description:
      "Empowering women through skill development, financial literacy, and entrepreneurship initiatives to build independent livelihoods.",
    tagline: "Focus Areas: Training • Employment • Awareness",
    url: "https://react.dev/",
  },
  {
    title: "Child Education Initiative",
    description:
      "Providing access to quality education and learning resources for underprivileged children to promote equal opportunities.",
    tagline: "Focus Areas: Education • Literacy • Growth",
    url: "https://nellaiconnect.in",
  },
  {
    title: "Healthcare & Awareness Camps",
    description:
      "Organizing free medical checkups, health awareness drives, and blood donation camps to improve community well-being.",
    tagline: "Focus Areas: Health • Awareness • Well-being",
    url: "https://needfoundation.org/healthcare-camps",
  },
];

// --- Impact Data ---
const impacts = [
  {
    title: "Empowering 5,000+ Women",
    description:
      "Through vocational training, micro-financing, and mentorship, over 5,000 women have started sustainable small businesses.",
    tagline: "Result: 80% increased income levels",
    image:
      "https://images.unsplash.com/photo-1581091215367-59ab6f63a6b6?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Educating 2,000+ Children",
    description:
      "Our education programs have helped children in rural communities gain access to better schooling, digital literacy, and mentorship.",
    tagline: "Result: 95% school retention rate",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Improving Rural Health Access",
    description:
      "By conducting medical camps and health awareness drives, we’ve reached over 10,000 people with essential healthcare services.",
    tagline: "Result: 70% improvement in preventive care awareness",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ServicesSection() {
  return (
    <>
      {/* --- Services Section --- */}
      <section className="bg-white bg-cover bg-center bg-no-repeat min-h-screen py-20 px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ amount: 0.4 }}
            className="text-center text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-gray-800 to-gray-900"
          >
            Services
          </motion.h2>

          {/* Service Cards */}
          <div className="flex flex-col gap-12">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  x: i % 2 === 0 ? -120 : 120, // alternate slide direction
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
                viewport={{ amount: 0.4 }}
                className="relative rounded-2xl p-0.5"
              >
                <div className="bg-gray-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                  {/* Title */}
                  <h3 className="text-2xl font-semibold text-indigo-700 mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Embedded Website */}
                  <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-inner">
                    <iframe
                      src={service.url}
                      title={service.title}
                      className="w-full h-[400px] md:h-[500px]"
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Impact Section --- */}
      <section className="bg-white py-20 px-4 md:px-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ amount: 0.4 }}
            className="text-center text-4xl sm:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-linear-to-r from-indigo-800 via-blue-700 to-indigo-900"
          >
            Our Impact in Action
          </motion.h2>

          <div className="flex flex-col gap-24">
            {impacts.map((impact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ amount: 0.4 }}
                className={`flex flex-col md:flex-row ${
                  i % 2 !== 0 ? "md:flex-row-reverse" : ""
                } items-center gap-10`}
              >
                {/* Text Section */}
                <div className="md:w-1/2 space-y-4">
                  <h3 className="text-3xl font-semibold text-indigo-800">
                    {impact.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {impact.description}
                  </p>
                  <p className="text-sm text-indigo-600 font-medium uppercase tracking-wide">
                    {impact.tagline}
                  </p>
                </div>

                {/* Image Section */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="md:w-1/2 relative overflow-hidden rounded-2xl shadow-xl group"
                >
                  <img
                    src={impact.image}
                    alt={impact.title}
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
