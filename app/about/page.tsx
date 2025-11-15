import { Button } from "@/components/ui/button";
import { Heart, Shield, Telescope, Users } from "lucide-react";
import CustomButton from "../../components/custom/custom-button";
import Navbar from "../../components/custom/navigation-menu";
import Footer from "../../components/custom/footer-section";
export default function AboutPage() {
  return (
    
    <main id="about-us" className="min-h-screen bg-background ">
      <Navbar/>
      {/* Header */}
      {/* <div className="bg-gradient-to-b from-primary/10 to-background py-16 text-center">
        <h1 className="text-5xl font-bold text-foreground mb-2">About Us</h1>
      </div> */}

      <div className="text-center mb-12 mt-15">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-tl from-orange-600 via-orange-500 to-yellow-400 rounded-full mb-6">
          <Heart className="w-4 h-4 text-white" />
          <span className="text-sm font-semibold text-white uppercase tracking-wider">
            About Us
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-gray-800 to-gray-900">
          Who We Are
          <br />
          <span className="bg-clip-text text-transparent bg-linear-to-tl mt-4 from-orange-600 via-orange-500 to-yellow-400 ">
            Our Story
          </span>
        </h2>

        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Discover our journey, values, and commitment to making a difference in
          the world.
        </p>
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
          <div className="space-y-6 text-xl w-full">
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
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-secondary/5 py-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* <h2 className="text-4xl font-bold text-center text-foreground mb-12">
            Our Vision & Mission
          </h2> */}

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-tl from-orange-600 via-orange-500 to-yellow-400 rounded-full mb-6">
              <Telescope className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white uppercase tracking-wider">
                Vision & Mission
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-gray-800 to-gray-900">
              Vision & Mission That
              <br />
              <span className="bg-clip-text text-transparent bg-linear-to-tl mt-4 from-orange-600 via-orange-500 to-yellow-400 ">
                Inspires
              </span>
            </h2>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Our vision is to create a world where innovation and compassion
              come together to drive meaningful change. 
            </p>
          </div>
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
               Need Foundation Trust is an Inner Faith Organisation. All services should reach everyone. 
             We strive to achieve the desired results by using resources properly both efficient
              and effective manner.
              Our work standard should meet the highest level by fulfilling the objectives
              </p>
            
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
                Need Foundation Trust focus on social consciousness and developing an organised society.
               Our Vision is People Centric Charity Organisation and to build an outstanding social service 
               to the society.We bring the best results in the society by implementing 
               values in each stage of work. 
              </p>
             
            </div>
          </div>
        </div>
      </section>
      <Footer/>

      {/* CTA Section */}
    </main>
  );
}
