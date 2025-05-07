"use client";
import { useState, useEffect } from 'react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';

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

  // Close menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu when user clicks outside
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && event.target && !(event.target as HTMLElement).closest('header')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo1.png"
              alt="Kavacham Logo"
              width={150}
              height={40}
              className="h-9 sm:h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6">
            <Link href="/about" className={`${poppins.className} text-gray-700 hover:text-gray-900 transition-colors text-sm lg:text-base relative group`}>
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/#service" className={`${poppins.className} text-gray-700 hover:text-gray-900 transition-colors text-sm lg:text-base relative group`}>
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/#works" className={`${poppins.className} text-gray-700 hover:text-gray-900 transition-colors text-sm lg:text-base relative group`}>
              How It Works
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/#testimonials" className={`${poppins.className} text-gray-700 hover:text-gray-900 transition-colors text-sm lg:text-base relative group`}>
              Testimonials
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <div className="flex items-center gap-2 ml-1">
              <Button
                asChild
                variant="default"
                className={`${poppins.className} bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] text-white shadow-md hover:shadow-lg text-xs lg:text-sm px-3 py-1 h-9 rounded-md transition-shadow`}
              >
                <Link href="/contact">Contact</Link>
              </Button>
              <Button
                asChild
                variant="default"
                className={`${poppins.className} bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] text-white shadow-md hover:shadow-lg text-xs lg:text-sm px-3 py-1 h-9 rounded-md transition-shadow`}
              >
                <Link href="/astrologer">Astrologers</Link>
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none p-2 rounded-lg hover:bg-gray-100/80 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <div className="relative w-6 h-5">
              <span className={`absolute block h-0.5 w-6 bg-gray-800 rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-2' : 'top-0'}`} />
              <span className={`absolute block h-0.5 w-6 bg-gray-800 rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'top-2'}`} />
              <span className={`absolute block h-0.5 w-6 bg-gray-800 rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-2' : 'top-4'}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-16 bg-white/95 backdrop-blur-sm shadow-lg rounded-b-xl z-40 max-h-[calc(100vh-4rem)] overflow-auto">
            <nav className="flex flex-col p-4">
              <Link
                href="/about"
                onClick={closeMenu}
                className={`${poppins.className} flex items-center text-gray-700 hover:text-gray-900 py-3 px-2 hover:bg-gray-50 rounded-lg transition-colors`}
              >
                <span>About</span>
              </Link>
              <Link
                href="/#service"
                onClick={closeMenu}
                className={`${poppins.className} flex items-center text-gray-700 hover:text-gray-900 py-3 px-2 hover:bg-gray-50 rounded-lg transition-colors`}
              >
                <span>Services</span>
              </Link>
              <Link
                href="/#works"
                onClick={closeMenu}
                className={`${poppins.className} flex items-center text-gray-700 hover:text-gray-900 py-3 px-2 hover:bg-gray-50 rounded-lg transition-colors`}
              >
                <span>How It Works</span>
              </Link>
              <Link
                href="/#testimonials"
                onClick={closeMenu}
                className={`${poppins.className} flex items-center text-gray-700 hover:text-gray-900 py-3 px-2 hover:bg-gray-50 rounded-lg transition-colors`}
              >
                <span>Testimonials</span>
              </Link>
              <div className="grid grid-cols-1 gap-2 mt-3 px-2">
                <Button
                  asChild
                  variant="default"
                  className={`${poppins.className} bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] text-white font-medium py-2 rounded-md shadow-md w-full`}
                >
                  <Link href="/contact" onClick={closeMenu}>
                    Contact
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="default"
                  className={`${poppins.className} bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] text-white font-medium py-2 rounded-md shadow-md w-full mt-2`}
                >
                  <Link href="/astrologer" onClick={closeMenu}>
                    Astrologers
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        nav > a:active, button:active {
          transform: scale(0.98);
        }
      `}</style>
    </header>
  );
}
