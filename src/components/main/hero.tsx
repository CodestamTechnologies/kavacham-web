"use client"
import { motion } from "framer-motion";
import { ArrowDown, Sparkle } from "lucide-react";
import { Button } from "../ui/button";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function HeroSection() {
  // Sparkle animation variants
  const sparkleVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: (i: number) => ({
      opacity: [0, 1, 0],
      scale: [0, 1.2, 0],
      transition: {
        delay: i * 0.1,
        duration: 2,
        repeat: Infinity,
        repeatDelay: 2,
      },
    }),
  };

  // Arrow animation
  const arrowAnimation = {
    y: [0, 10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Sparkle positions (adjusted for mobile)
  const sparkles = [
    { top: "15%", left: "10%", mobileTop: "10%", mobileLeft: "5%" },
    { top: "25%", left: "85%", mobileTop: "20%", mobileLeft: "80%" },
    { top: "55%", left: "20%", mobileTop: "50%", mobileLeft: "15%" },
    { top: "65%", left: "70%", mobileTop: "60%", mobileLeft: "65%" },
  ];

  return (
    <section className={`relative w-full sm:overflow-hidden sm:h-screen h-auto bg-gray-50 flex flex-col items-center justify-center text-center px-4 ${poppins.className}`}
      style={{ height: 'calc(100vh - 80px)', marginTop: '80px' }}>
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/path-to-your-bg-pattern.png')] opacity-5"></div>
      </div>

      {/* Animated Sparkles */}
      {sparkles.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute text-[#B38CF9] hidden md:block"
          style={{ 
            top: pos.top, 
            left: pos.left,
          }}
          variants={sparkleVariants}
          initial="initial"
          animate="animate"
          custom={i}
        >
          <Sparkle size={24} fill="currentColor" />
        </motion.div>
      ))}

      {/* Mobile Sparkles (smaller and fewer) */}
      {sparkles.slice(0, 2).map((pos, i) => (
        <motion.div
          key={`mobile-${i}`}
          className="absolute text-[#B38CF9] md:hidden"
          style={{ 
            top: pos.mobileTop, 
            left: pos.mobileLeft,
          }}
          variants={sparkleVariants}
          initial="initial"
          animate="animate"
          custom={i}
        >
          <Sparkle size={18} fill="currentColor" />
        </motion.div>
      ))}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto space-y-6 z-10 px-4"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
          <span className="bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] bg-clip-text text-transparent">
            Your Shield of Cosmic Wisdom
          </span>
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 md:mb-8 font-light px-2">
          Discover the ancient art of astrology reimagined for modern seekers of truth, protection, and personal growth.
        </p>

        <div className="relative w-full h-px bg-gray-300 my-6 md:my-8">
          <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-16 h-px bg-gray-400"></div>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4"
        >
          <Button className="bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] text-white hover:from-[#B38CF9]/90 hover:to-[#F49AC2]/90 px-6 py-5 md:px-8 md:py-6 text-base md:text-lg font-semibold rounded-full shadow-lg w-full max-w-xs mx-auto">
            Get Your Kavacham
          </Button>
        </motion.div>
      </motion.div>

      {/* Animated Arrow - Only shows when content is scrollable */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-400 hidden md:block"
        animate={arrowAnimation}
      >
        <ArrowDown size={32} />
      </motion.div>
    </section>
  );
}