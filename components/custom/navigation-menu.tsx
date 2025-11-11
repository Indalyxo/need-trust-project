"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import CustomButton from "./custom-button";
import { useRouter, usePathname } from "next/navigation";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Latest News", href: "/latestnews" },
  { label: "Services", href: "/works" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "#contact-us" },
];

function NavigationMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLinkClick = (link: { label: string; href: string }) => {
    setMobileMenuOpen(false);
    router.push(link.href);
  };

  const handleClick = () => {
    router.push("/donate");
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <img
              className="w-[250px] h-[60px]"
              src="need foundation trust.jpg"
              alt="need foundation logo"
            />
          </div>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center space-x-1">
            {links.map((link) => (
              <li key={link.label}>
                <span
                  onClick={() => handleLinkClick(link)}
                  className={`
                    relative px-4 py-2 text-[16px] font-medium rounded-lg transition-all duration-300 group cursor-pointer
                    ${
                      pathname === link.href
                        ? "text-pink-600"
                        : "text-gray-500 hover:text-[#f47216]"
                    }
                  `}
                >
                  {link.label}
                  <span
                    className={`
                      absolute bottom-0 left-0 w-full h-0.5 bg-[#f47216] transform origin-left transition-transform duration-300
                      ${pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                    `}
                  />
                </span>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <CustomButton onClick={handleClick}>Donate Now</CustomButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
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
              onClick={() => handleLinkClick(link)}
              className={`
                block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 cursor-pointer
                ${
                  pathname === link.href
                    ? "bg-linear-to-r from-pink-600 to-red-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-white hover:text-pink-600"
                }
              `}
            >
              {link.label}
            </a>
          ))}

          <div className="pt-4">
            <button
              onClick={handleClick}
              className="w-full px-6 py-3 bg-[#f47216] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              Get Involved
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop */}
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
