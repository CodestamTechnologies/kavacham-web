"use client";
import { useState, useEffect } from 'react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { Button } from '../ui/button';

const poppins = Poppins({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
});

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center">
          {/* Logo with Gradient Star */}
          <Link href="/" className={`${poppins.className} flex items-center text-2xl font-semibold text-gray-800 group`}>
            <svg
              className="mr-2 h-8 w-8 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="url(#star-gradient)"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d1b3ff" />
                  <stop offset="100%" stopColor="#ffb3d1" />
                </linearGradient>
              </defs>
              <path
                d="M12 2L14.9 8.63L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L9.1 8.63L12 2Z"
                fill="url(#star-gradient)"
              />
            </svg>
            <span>Kavacham</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/about" className={`${poppins.className} text-gray-800 hover:text-indigo-600 transition duration-300 hover:-translate-y-0.5`}>
              About
            </Link>
            <Link href="/services" className={`${poppins.className} text-gray-800 hover:text-indigo-600 transition duration-300 hover:-translate-y-0.5`}>
              Services
            </Link>
            <Link href="/how-it-works" className={`${poppins.className} text-gray-800 hover:text-indigo-600 transition duration-300 hover:-translate-y-0.5`}>
              How It Works
            </Link>
            <Link href="/testimonials" className={`${poppins.className} text-gray-800 hover:text-indigo-600 transition duration-300 hover:-translate-y-0.5`}>
              Testimonials
            </Link>
            <Button
              asChild
              variant="default"
              className={`${poppins.className} bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition duration-300 hover:scale-105`}
            >
              <Link href="/contact">Contact</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span className={`absolute block h-0.5 w-6 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-3' : 'top-1'}`} />
              <span className={`absolute block h-0.5 w-6 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'top-3'}`} />
              <span className={`absolute block h-0.5 w-6 bg-gray-800 transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-3' : 'top-5'}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu with Background */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out rounded-xl ${isMenuOpen ? 'max-h-96 mt-4 bg-gradient-to-r from-[#F3D8FF] to-[#FFD6E9] p-4 shadow-md' : 'max-h-0'}`}>
          <nav className="flex flex-col space-y-4">
            <Link
              href="/about"
              onClick={closeMenu}
              className={`${poppins.className} text-gray-800 hover:text-indigo-600 transition duration-300 hover:pl-2`}
            >
              About
            </Link>
            <Link
              href="/services"
              onClick={closeMenu}
              className={`${poppins.className} text-gray-800 hover:text-indigo-600 transition duration-300 hover:pl-2`}
            >
              Services
            </Link>
            <Link
              href="/how-it-works"
              onClick={closeMenu}
              className={`${poppins.className} text-gray-800 hover:text-indigo-600 transition duration-300 hover:pl-2`}
            >
              How It Works
            </Link>
            <Link
              href="/testimonials"
              onClick={closeMenu}
              className={`${poppins.className} text-gray-800 hover:text-indigo-600 transition duration-300 hover:pl-2`}
            >
              Testimonials
            </Link>
            <Button
              asChild
              variant="default"
              className={`${poppins.className} w-full bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}
            >
              <Link href="/contact" onClick={closeMenu}>
                Contact
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
