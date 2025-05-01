"use client";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function HeroSection() {
  const gradientText =
    "bg-gradient-to-r from-[#838CF9] to-[#F49AC2] bg-clip-text text-transparent";

  return (
    <section
      className={`relative h-[70vh] lg:h-[90vh] py-20 px-4 text-center overflow-hidden ${poppins.className}`}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/bghero.avif')",
          opacity: 0.25, // Adjust this value (0 to 1) for desired transparency
          zIndex: 0,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Main Title */}
        <h1
          className={` sm:mt-8 ${gradientText} text-4xl md:text-5xl font-bold text-black mb-2`}
        >
          Kavacham
        </h1>

        {/* Subtitle */}
        <p className="italic text-lg text-gray-600 mb-6">Astrology That Shields</p>

        {/* Tagline */}
        <p className="text-gray-700 text-base md:text-lg mb-10">
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
            />
          </a>
          <a href="#" aria-label="Get it on Google Play">
            <Image
              src="/play.webp"
              alt="Get it on Google Play"
              width={190}
              height={20}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
