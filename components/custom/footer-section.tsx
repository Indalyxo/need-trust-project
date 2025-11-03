"use client";

import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-700 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">

        {/* About Section */}
        <div>
          {/* ✅ Logo added here */}
          <div className="mb-4">
            <Image
              src="/Need Foundation trust.jpg"  // ✅ Correct: images in /public can be used like this
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
            <li><a href="/projects" className="hover:text-white transition">Our Projects</a></li>
            <li><a href="/donate" className="hover:text-white transition">Donate</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
          <p className="text-sm">
            123 Charity Street<br />Chennai, Tamil Nadu, India
          </p>
          <p className="text-sm mt-2">
            Email: <a href="mailto:info@yourtrust.org" className="hover:text-white">info@yourtrust.org</a>
          </p>
          <p className="text-sm">
            Phone: <a href="tel:+919876543210" className="hover:text-white">+91 98765 43210</a>
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-white"><FaFacebook size={20} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-white"><FaTwitter size={20} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-white"><FaInstagram size={20} /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white"><FaLinkedin size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Your Trust Name. All rights reserved.
      </div>
    </footer>
  );
}
