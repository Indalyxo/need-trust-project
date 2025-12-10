"use client";

import { Heart, Shield, Telescope, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  <style jsx global>{`
  @media (max-width: 640px) {
    /* Page padding */
    #about-us {
      margin-top: 2rem !important;
      padding-left: 1rem;
      padding-right: 1rem;
    }

    /* Heading */
    #about-us h2 {
      font-size: 1.9rem !important;
      line-height: 2.4rem !important;
    }

    /* Sub-heading paragraph */
    #about-us p {
      font-size: 1rem !important;
    }

    /* Image grid */
    #about-us .mobile-image {
      height: 180px !important;
      object-fit: cover !important;
      border-radius: 12px !important;
    }

    /* Reduce text section spacing */
    #about-us .content-section {
      margin-top: 1.5rem !important;
    }

    /* Trust indicator items spacing */
    #about-us .trust-item {
      margin-top: 1rem !important;
    }

    /* Cards responsive */
    #about-us .vision-card,
    #about-us .mission-card {
      padding: 1.5rem !important;
      margin-bottom: 1rem !important;
    }

    /* Reduce heading inside cards */
    #about-us .vision-card h3,
    #about-us .mission-card h3 {
      font-size: 1.3rem !important;
    }
  }
`}</style>

  return (
    <main id="about-us" className="min-h-screen bg-background mt-10">

      {/* ---------------- HEADER ---------------- */}
      <div className="text-center mb-12 px-4">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-tl from-orange-600 via-orange-500 to-yellow-400 rounded-full mb-6 shadow-lg"
        >
          <Heart className="w-4 h-4 text-white" />
          <span className="text-sm font-semibold text-white uppercase tracking-wider">
            About Us
          </span>
        </motion.div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-gray-800 to-gray-900">
          Who We Are
          <br />
          <span className="bg-clip-text text-transparent bg-linear-to-tl from-orange-600 via-orange-500 to-yellow-400">
            Our Story
          </span>
        </h2>

        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover our journey, values, and commitment to making a difference in the world.
        </p>
      </div>

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT IMAGES */}
          <div className="grid grid-rows-2 gap-4">
            <img
              src="https://res.cloudinary.com/dkbtx5r9v/image/upload/v1763547690/WhatsApp_Image_2025-11-17_at_10.06.48_ec861cb5-removebg-preview_v3smzw.png"
              className="w-full h-auto object-cover rounded-lg shadow-lg bg-white p-4"
              alt="Founder"
            />
            <img
              src="https://res.cloudinary.com/dkbtx5r9v/image/upload/v1763547383/about_kq6w4v.jpg"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
              alt="Team"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-6 text-center md:text-left">
            
            {/* Managing Trustee */}
            <div>
              <h3 className="text-2xl font-bold">E.SA. Agilantam</h3>
              <p className="text-base text-gray-600">Managing Trustee</p>

              <div className="text-foreground/80 leading-relaxed mt-4">
                <h4 className="text-xl font-semibold mb-2">Academic Background</h4>
                <p>M.Phil (Entrepreneurship) – Madurai Kamaraj University.</p>
                <p>FDP (Entrepreneurship) – EDI Ahmedabad.</p>
                <p>MBA – Thiagarajar School of Management.</p>
                <p>BBA – Sourashtra College.</p>
              </div>

              <div className="text-foreground/80 leading-relaxed mt-6">
                <h4 className="text-xl font-semibold mb-2">Skills</h4>
                
•	Completed Mediation Training and Certified Mediator <br/>
•	Motivated professional with an experience in Entrepreneurship Development, Corporate <br/>
•	Training, Employee Development, Customer service, Sales, New Business Development experience in the various Industries.<br/>
•	Ability to make a positive impact in any business environment that has been demonstrated by my employment record.<br/>

              </div>
            </div>
            <hr/>

            {/* Trustee */}
            <div className="pt-6">
              <h3 className="text-2xl font-bold">Gomathy Akilandam</h3>
              <p className="text-base text-gray-600">Trustee</p>

              <p className="text-foreground/80 leading-relaxed mt-4">
                We are a dedicated team committed to creating positive impact and improving
                the lives of individuals through meaningful service and initiatives.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="space-y-4 pt-4">

              <div className="flex items-start gap-3 justify-center md:justify-start">
                <Shield className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Trusted by Thousands</h3>
                  <p className="text-sm text-foreground/70">A growing community that believes in us</p>
                </div>
              </div>

              <div className="flex items-start gap-3 justify-center md:justify-start">
                <Users className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Expert Team</h3>
                  <p className="text-sm text-foreground/70">Professionals with proven experience</p>
                </div>
              </div>

              <div className="flex items-start gap-3 justify-center md:justify-start">
                <Heart className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Community Focused</h3>
                  <p className="text-sm text-foreground/70">Supporting causes that matter</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ---------------- VISION & MISSION ---------------- */}
      <section className="bg-secondary/5 py-16 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Section Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-tl from-orange-600 via-orange-500 to-yellow-400 rounded-full mb-6">
              <Telescope className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white uppercase tracking-wider">
                Vision & Mission
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-gray-800 to-gray-900">
              Vision & Mission That Inspires
            </h2>

            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Our vision is to build a society where compassion meets innovation and creates
              meaningful, lasting change.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Mission */}
            <div className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold mb-3 border-b-2 border-orange-500 inline-block">
                Mission
              </h3>
              <p className="text-foreground/80 leading-relaxed">
                Need Foundation Trust is an Inner-Faith Organisation committed to serving
                people without discrimination. We ensure resources are used in an
                effective and efficient manner to meet the highest standards of service.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold mb-3 border-b-2 border-orange-500 inline-block">
                Vision
              </h3>
              <p className="text-foreground/80 leading-relaxed">
                We aim to develop a socially conscious and value-driven society. Our vision
                is to build a people-centric charity that implements strong values and
                achieves outstanding results for the community.
              </p>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}
