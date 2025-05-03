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

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center">
        <Link href="/" className={`${poppins.className} flex items-center  font-semibold text-gray-800 group`}>
  <Image
    src="/logo1.png" // Path to your logo
    alt="Kavacham Logo"
    width={200}
    height={22}
    className="mr-2 lg:h-12 lg:w-42 h-10 w-28 "
  />
</Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/about" className={`${poppins.className} text-gray-800 hover:text-indigo-600 transition duration-300 hover:-translate-y-0.5`}>
              About
            </Link>
            <Link href="/#service" className={`${poppins.className} text-gray-800 hover:text-indigo-600 transition duration-300 hover:-translate-y-0.5`}>
              Services
            </Link>
            <Link href="/#works" className={`${poppins.className} text-gray-800 hover:text-indigo-600 transition duration-300 hover:-translate-y-0.5`}>
              How It Works
            </Link>
            <Link href="/#testimonials" className={`${poppins.className} text-gray-800 hover:text-indigo-600 transition duration-300 hover:-translate-y-0.5`}>
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
              id="services"
              href="/#service"
              onClick={closeMenu}
              className={`${poppins.className} text-gray-800 hover:text-indigo-600 transition duration-300 hover:pl-2`}
            >
              Services
            </Link>
            <Link
              href="/#works"
              onClick={closeMenu}
              className={`${poppins.className} text-gray-800 hover:text-indigo-600 transition duration-300 hover:pl-2`}
            >
              How It Works
            </Link>
            <Link
            id="testimonals"
              href="/#testimonials"
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
