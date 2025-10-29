"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import CustomButton from "./custom-button";

const links = [
  { label: "About Us", href: "#about" },
  { label: "Our Team", href: "#team" },
  { label: "Our Campaigns", href: "#campaigns" },
  { label: "Our Projects", href: "#projects" },
  { label: "Our Partners", href: "#partners" },
  { label: "Contact Us", href: "#contact" },
];

function NavigationMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (label: string) => {
    setActiveLink(label);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Brand */}
          <div className="flex items-center shrink-0">
            <img
              className="w-[250px] h-[60px]"
              src="need foundation logo.webp"
              alt="need foundation logo"
            />
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-1">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => handleLinkClick(link.label)}
                  className={`
                    relative px-4 py-2 text-[16px] font-medium rounded-lg transition-all duration-300 group
                    ${
                      activeLink === link.label
                        ? "text-pink-600"
                        : "text-gray-500 hover:text-[#f47216]"
                    }
                  `}
                >
                  {link.label}
                  {/* Animated Underline */}
                  <span
                    className={`
                      absolute bottom-0 left-0 w-full h-0.5 bg-[#f47216] transform origin-left transition-transform duration-300
                      ${
                        activeLink === link.label
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }
                    `}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button (Desktop) */}
          <div className="hidden lg:block">
            <CustomButton>Donate Now</CustomButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`
          lg:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 bg-gray-50 border-t border-gray-200">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => handleLinkClick(link.label)}
              className={`
                block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200
                ${
                  activeLink === link.label
                    ? "bg-linear-to-r from-pink-600 to-red-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-white hover:text-pink-600"
                }
              `}
            >
              {link.label}
            </a>
          ))}

          {/* Mobile CTA Button */}
          <div className="pt-4">
            <button className="w-full px-6 py-3 bg-[#f47216] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
              Get Involved
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden -z-10"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}

export default NavigationMenu;
