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
    <div className="relative w-full bg-white lg:h-screen h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Full-screen Keywords Background */}
      <div className="absolute inset-0 z-0">
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
            className={`${gradientText} text-5xl sm:text-6xl md:text-7xl font-bold mb-2`}
          >
            Kavacham
          </h1>

          {/* Subtitle */}
          <p className="italic text-lg text-gray-600 mb-6">
            Astrology That Shields
          </p>

          {/* Tagline */}
          <p className="text-gray-700 text-base md:text-lg mb-10 max-w-2xl mx-auto">
            Discover the power of ancient wisdom blended with modern insight.
            Kavacham is your personal astrological guide—crafted with precision,
            purpose, and protection.
          </p>

          {/* App Store and Google Play buttons */}
          <div className="flex justify-center gap-4 flex-wrap items-center">
            <a href="#" aria-label="Download on App Store">
              <Image
                src="/app.webp"
                alt="Download on App Store"
                width={170}
                height={50}
                className="w-36 sm:w-40 md:w-48"
              />
            </a>
            <a href="#" aria-label="Get it on Google Play">
              <Image
                src="/play.webp"
                alt="Get it on Google Play"
                width={190}
                height={20}
                className="w-40 sm:w-44 md:w-52"
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}