"use client"
import { Poppins } from 'next/font/google';
import { motion } from 'framer-motion';
import { 
  Home, Users, Star, MessageSquare, BookOpen, 
  Phone, Mail, MapPin,
  Twitter, Instagram, Facebook, Youtube, Linkedin,
  Lock
} from 'lucide-react';
import Link from 'next/link';

const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
});

const Footer = () => {
  const hoverAnimation = {
    scale: 1.05,
    transition: { duration: 0.2 }
  };

  return (
    <footer className={`bg-gray-50 text-gray-800 ${poppins.className} border-t border-gray-200`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Kavacham Branding */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Kavacham
            </h2>
            <p className="text-gray-600">
              Your shield of cosmic wisdom in life's journey.
            </p>
            
            {/* Social Media Handles */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">CONNECT WITH US</h4>
              <div className="flex gap-4">
                {[
                  { icon: <Twitter className="text-gray-600 hover:text-purple-500 transition-colors" />, href: "#" },
                  { icon: <Instagram className="text-gray-600 hover:text-purple-500 transition-colors" />, href: "#" },
                  { icon: <Facebook className="text-gray-600 hover:text-purple-500 transition-colors" />, href: "#" },
                  { icon: <Youtube className="text-gray-600 hover:text-purple-500 transition-colors" />, href: "#" },
                  { icon: <Linkedin className="text-gray-600 hover:text-purple-500 transition-colors" />, href: "#" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="hover:text-purple-500"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { icon: <Home size={16} className="text-gray-500" />, text: 'Home', href: '/' },
                { icon: <Users size={16} className="text-gray-500" />, text: 'About Us', href: '/about' },
                { icon: <Star size={16} className="text-gray-500" />, text: 'Services', href: '/#service' },
                { icon: <MessageSquare size={16} className="text-gray-500" />, text: 'Testimonials', href: '/#testimonials' },
                { icon: <Lock size={16} className="text-gray-500" />, text: 'Privacy-Policy', href: '/privacy' },
              ].map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={hoverAnimation}
                >
                  <Link href={link.href} className="flex items-center gap-2 text-gray-600 hover:text-purple-500 transition-colors">
                    {link.icon}
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Our Services */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-900">Our Services</h3>
            <ul className="space-y-2">
              {[
                'Birth Chart Reading',
                'Daily Horoscope',
                'Compatibility Analysis',
                'Personalized Kavacham',
                'Astrology Consultation'
              ].map((service, index) => (
                <motion.li 
                  key={index}
                  whileHover={hoverAnimation}
                  className="text-gray-600 hover:text-purple-500 transition-colors cursor-text"
                >
                  {service}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Us */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
            <ul className="space-y-3">
              <motion.li 
                whileHover={hoverAnimation}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-500 transition-colors"
              >
                <Mail size={16} className="text-gray-500" />
                support@kavacham.in
              </motion.li>
              <motion.li 
                whileHover={hoverAnimation}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-500 transition-colors"
              >
                <Phone size={16} className="text-gray-500" />
                +91 98765 43210
              </motion.li>
              <motion.li 
                whileHover={hoverAnimation}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-500 transition-colors"
              >
                <MapPin size={16} className="text-gray-500" />
                Kavacham Technologies,
 2nd Floor, Triveni Complex,
 New Delhi – 110019, India
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          className="my-8 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"
        />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 text-sm"
          >
            © Kavacham. All rights reserved.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-6"
          >
            <Link href="/privacy" className="text-gray-500 hover:text-purple-500 text-sm transition-colors">
              Privacy-Policy
            </Link>
            {/* <Link href="/support" className="text-gray-500 hover:text-purple-500 text-sm transition-colors">
              Support
            </Link> */}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;