import { Button } from "@/components/ui/button";
import { Heart, Shield, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/10 to-background py-16 text-center">
        <h1 className="text-5xl font-bold text-foreground mb-2">About Us</h1>
      </div>

      {/* Hero Section - Image Left, Content Right */}
      <section className="max-w-6xl mx-auto px-4 py-16 pt-3.5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="flex justify-center">
            <img
              src="aboutus.webp"
              alt="Our team working together"
              className="rounded-lg shadow-lg w-full max-w-xl object-cover"
            />
          </div>

          {/* Right - Content */}
          <div className="space-y-6 text-xl">
            <div>
              {/* <h2 className="text-3xl font-bold text-foreground mb-4"> 
                Who We Are
              </h2> */}
              <p className="text-foreground/80 leading-relaxed mb-4">
                We are a dedicated team committed to making a positive impact in
                our community. With years of experience and passion for
                excellence, we strive to deliver exceptional value to everyone
                we serve.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Our commitment to transparency, integrity, and innovation drives
                everything we do. We believe in building lasting relationships
                based on trust and mutual respect.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">
                    Trusted by Thousands
                  </h3>
                  <p className="text-sm text-foreground/70">
                    Join our growing community of satisfied users
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Expert Team</h3>
                  <p className="text-sm text-foreground/70">
                    Dedicated professionals with proven track records
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">
                    Community Focused
                  </h3>
                  <p className="text-sm text-foreground/70">
                    Supporting causes that matter to us
                  </p>
                </div>
              </div>
            </div>

            {/* Donate Button */}
            <div className="pt-4">
              <Button className="bg-gradient-to-tl from-orange-600 via-orange-500 to-yellow-400 hover:from-orange-700 hover:to-yellow-500 text-white px-3 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 shadow-2xl hover:shadow-orange-400/50 hover:scale-105 transform">
                <Heart className="w-5 h-5 mr-2" />
                Donate now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-secondary/5 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-foreground mb-12">
            Our Vision & Mission
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                {/* <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">M</span>
                </div> */}
                <div className="border-b-2 border-orange-500">
                  <h3 className="text-2xl font-bold text-foreground">
                    Mission
                  </h3>
                </div>
              </div>

              <p className="text-foreground/80 leading-relaxed">
                To empower individuals and organizations by providing innovative
                solutions that drive positive change. We are committed to
                excellence, sustainability, and creating meaningful impact in
                everything we do.
              </p>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center gap-2 text-foreground/70">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Deliver exceptional quality
                </li>
                <li className="flex items-center gap-2 text-foreground/70">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Foster innovation and growth
                </li>
                <li className="flex items-center gap-2 text-foreground/70">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Build sustainable solutions
                </li>
              </ul>
            </div>

            {/* Vision Card */}
            <div className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                {/* <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">V</span>
                </div> */}
                <div className="border-b-2 border-orange-500">
                  <h3 className="text-2xl font-bold text-foreground">Vision</h3>
                </div>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                To be a global leader in our industry, recognized for our
                unwavering commitment to quality, innovation, and social
                responsibility. We envision a world where our solutions make a
                tangible difference in people's lives.
              </p>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center gap-2 text-foreground/70">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Global impact and reach
                </li>
                <li className="flex items-center gap-2 text-foreground/70">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Continuous improvement
                </li>
                <li className="flex items-center gap-2 text-foreground/70">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Positive social change
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
    </main>
  );
}
