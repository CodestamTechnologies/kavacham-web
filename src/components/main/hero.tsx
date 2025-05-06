"use client";
import { Poppins } from "next/font/google";
import Image from "next/image";
import KeywordsBackground from "../ui/animatedSun";
import { motion } from "framer-motion";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function HeroSection() {
  const gradientText =
    "bg-gradient-to-r from-[#838CF9] to-[#F49AC2] bg-clip-text text-transparent";

  return (
    <div className="sticky top-0 -z-30 w-full bg-white lg:h-screen h-[80vh] flex items-center justify-center overflow-hidden">
    {/* Full-screen Background Image */}
    <div className="absolute inset-0 z-0">
  <div className="relative w-full h-full">
    <Image
      src="/kav23.png"
      alt="Background"
      fill
      className="object-cover opacity-100" 
      quality={100}
      priority
    />
    {/* Enhanced overlay for better text contrast */}
    {/* <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30"></div> */}
  </div>
</div>
  
    {/* Full-screen Keywords Background */}
    <div className="absolute inset-0 z-1">
      <KeywordsBackground />
    </div>
  
    {/* Content Container - Centered */}
    <section
      className={`relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${poppins.className}`}
    >
      {/* Centered Content */}
      <div className="relative z-20 w-full flex flex-col items-center text-center">
        {/* Main Title */}
        <h1
          className={`${gradientText} text-5xl sm:text-6xl md:text-8xl font-bold mb-2`}
        >
          Kavacham
        </h1>
  
        {/* Subtitle */}
        <p className="italic text-2xl text-black lg:text-3xl mb-6 drop-shadow-md">
          Astrology That Shields
        </p>
  
        {/* Tagline */}
        <p className="text-black text-xl md:text-xl mb-10 max-w-2xl mx-auto drop-shadow-md">
          Discover the power of ancient wisdom blended with modern insight.
          Kavacham is your personal astrological guide—crafted with precision,
          purpose, and protection.
        </p>
      

 <p className="text-2xl">Astrologers</p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="px-8 py-3 rounded-full bg-gradient-to-r from-[#838CF9] to-[#F49AC2] text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-500 hover:to-purple-500"
    >
      Apply Now
    </motion.button>
           

        {/* App Store and Google Play buttons */}
        {/* <div className="flex lg:flex-row flex-col justify-center gap-4 flex-wrap items-center">
          <a href="#" aria-label="Download on App Store">
            <Image
              src="/app.webp"
              alt="Download on App Store"
              width={170}
              height={50}
              className="w-36 sm:w-40 md:w-48 drop-shadow-lg"
            />
          </a>
          <a href="#" aria-label="Get it on Google Play">
            <Image
              src="/play.webp"
              alt="Get it on Google Play"
              width={200}
              height={20}
              className="w-42 sm:w-46 md:w-56 drop-shadow-lg"
            />
          </a>
        </div> */}
      </div>
    </section>
  </div>
  );
}