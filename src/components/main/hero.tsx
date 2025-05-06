"use client";
import { Poppins } from "next/font/google";
import Image from "next/image";
import KeywordsBackground from "../ui/animatedSun";


const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function HeroSection() {
  const gradientText =
    "bg-gradient-to-r from-[#838CF9] to-[#F49AC2] bg-clip-text text-transparent";

  return (
    <div className="sticky top-0 -z-1 w-full bg-white lg:h-screen h-[80vh] flex items-center justify-center overflow-hidden">
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
            className={`${gradientText} text-5xl sm:text-6xl md:text-8xl font-bold mb-2 cursor-text`}
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
        
         
          
          
        </div>
      </section>
    </div>
  );
}