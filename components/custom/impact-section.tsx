"use client";
import "../../app/globals.css";

const impactStats = [
  {
    icon: "restaurant",
    number: "4mn+",
    label: "Number of meals provided",
  },
  {
    icon: "groups",
    number: "90000+",
    label: "Number of Migrants Supported",
  },
  {
    icon: "airwave",
    number: "300+",
    label: "Oxygen Concentrators",
  },
  {
    icon: "child_care",
    number: "100+",
    label: "Paediatric Support Initiatives",
  },
];

export default function ImpactSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:py-28 lg:px-8 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Impact Created
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our efforts have made a tangible difference in communities. Here's a look at the numbers.
        </p>
      </div>

      {/* Scrolling container */}
      <div className="overflow-hidden">
        <div className="flex gap-8 animate-scroll-slow w-max">
          {[...impactStats, ...impactStats].map((item, index) => (
            <div
              key={index}
              className="min-w-[250px] bg-white rounded-xl shadow-md flex flex-col items-center text-center p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-6 border-2 border-cyan-200 rounded-lg p-4 flex flex-col items-center justify-center gap-3">
                <div className="bg-cyan-100 rounded-full p-6 flex items-center justify-center">
                  <span className="material-symbols-outlined text-cyan-600 text-5xl">
                    {item.icon}
                  </span>
                </div>
              </div>
              <p className="text-5xl sm:text-6xl font-bold text-gray-900 mb-2">
                {item.number}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
