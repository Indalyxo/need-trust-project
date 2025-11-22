"use client";

import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-700 text-gray-300 py-10" id="contact-us">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">

        {/* About Section */}
        <div>
          {/* ✅ Logo added here */}
          <div className="mb-4">
            <Image
              src="/Logo.jpg"  // ✅ Correct: images in /public can be used like this
              alt="Trust Logo"
              width={300}
              height={250}
              className="rounded-lg object-contain"
            />
          </div>

          <h2 className="text-xl font-semibold text-white mb-4">About Our Trust</h2>
          <p className="text-sm leading-6">
            We are a non-profit organization dedicated to serving the community through
            education, healthcare, and social welfare initiatives.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/work" className="hover:text-white transition">Works</a></li>
            <li><a href="/donate" className="hover:text-white transition">Donate</a></li>

          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
          <p className="text-sm">
            TS No.75/1A,1B,
            Sri Selva Vinayagar Complex
            60 Ft, STC,Scheme Road<br />
            Perumalpuram,
            Tirunelveli 627 007
          </p>
          <p className="text-sm mt-2">
            Email: <a href="mailto:info@yourtrust.org" className="hover:text-white">nellaiconnectad@gmail.com </a>
          </p>
          <p className="text-sm">
            Phone: <a href="tel:+919876543210" className="hover:text-white">+91 99525 41141</a>
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Managing Team</h2>
          <div className="grid space-x-4">
            <p className=" text-white ">Gomathy Akilandam <br />
              Trustee</p><br/>
            <p className=" text-white ">E.SA.Agilantam
             <br/> Managing Trustee</p>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Need Foundation Trust. All rights reserved.
      </div>
    </footer>
  );
}
