"use client";
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import AnimatedSunWithOverlappingImage from '../ui/SunImageAnimation';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function AboutSection() {
  const gradientText = "bg-gradient-to-r from-[#838CF9] to-[#F49AC2] bg-clip-text text-transparent";

  return (
    <section className={`py-5 sm:pt-10 pt-25 px-4 sm:px-6 lg:px-8 max-w-7xl bg-white mx-auto ${poppins.className}`}>
      <div className="relative flex flex-col lg:flex-row items-center gap-1 lg:gap-16">
        {/* Left Column - Image (Centered on mobile) */}
        <div className="w-full  flex justify-center  lg:w-1/2 lg:block">
          <div className="relative  w-full max-w-[400px] lg:max-w-none">
            <AnimatedSunWithOverlappingImage />
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="w-full lg:w-1/2 space-y-8 mt-8 lg:mt-0">
          <h2 className={`text-4xl sm:text-5xl font-bold ${gradientText}`}>
            About Kavacham
          </h2>

          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            <span className={`font-semibold ${gradientText}`}>Kavacham</span>, meaning "shield" in Sanskrit, is your <span className="italic">cosmic armor</span> in life's journey. We blend ancient astrological wisdom with modern insights to create personalized guidance that protects, empowers, and illuminates your path.
          </p>

          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            Our mission is to make the profound wisdom of the cosmos accessible and practical for everyday life. Through careful analysis of celestial patterns and energies, we provide you with the knowledge to navigate life's challenges with confidence and grace.
          </p>
          <i> "The cosmos speaks to those who listen." </i>

          <div className="relative h-px bg-gradient-to-r from-transparent via-[#838CF9] to-transparent my-8" />

          {/* Static decorative elements */}
          <div className="relative overflow-hidden h-0">
            {[1, 2, 3].map((i) => (
              <div
                key={`content-orb-${i}`}
                className="absolute rounded-full bg-[#838CF9]/30"
                style={{
                  width: `${8 + i * 2}px`,
                  height: `${8 + i * 2}px`,
                  left: `${20 + i * 30}%`,
                  top: `${10 + i * 10}%`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}