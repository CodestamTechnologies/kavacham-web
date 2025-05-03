"use client"
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AnimatedSunWithOverlappingImage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="  relative w-full   h-full min-h-[400px] flex items-center justify-center sm:min-h-[600px] sm:ml-10 sm:mt-56">
      {/* Outer container for positioning */}
      <motion.div
        className="sm:ml-15 ml:0    sm:mt-0 mt-30 overflow-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: ["-50%", "-53%", "-50%", "-47%", "-50%"],
          y: ["-50%", "-47%", "-50%", "-53%", "-50%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
     >
        {/* Pink glow border */}
        <motion.div
          className="absolute -inset-8 sm:-inset-12 rounded-full bg-pink-400/30 blur-xl sm:blur-2xl z-0"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Larger back circle - responsive sizing */}
        <motion.div
          className="w-[250px] h-[250px] sm:w-[340px] sm:h-[340px] rounded-full bg-gradient-to-br from-[#838CF9] to-[#F49AC2] blur-md sm:blur-lg opacity-90 z-0"
          animate={{
            scale: [1, 1.03, 1],
            opacity: [0.9, 0.95, 0.9],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-full bg-white/20 blur-sm sm:blur-md" />
        </motion.div>

        {/* Smaller front circle - responsive sizing */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] rounded-full bg-gradient-to-br from-[#F49AC2] to-[#838CF9] blur-sm sm:blur-md opacity-95 z-0"
          animate={{
            scale: [1, 1.02, 1],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        >
          {/* Subtle inner highlight */}
          <div className="absolute top-1/4 left-1/4 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-white/30 blur-xs sm:blur-sm" />
        </motion.div>

        {/* Revolving Image - responsive positioning */}
        <motion.div
          className="absolute -bottom-20 -right-20 sm:-bottom-25 sm:-right-40 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] z-20"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Image
            src="/img90.png"
            alt="Revolving symbol"
            width={400}
            height={400}
            className="object-contain drop-shadow-lg"
          />
        </motion.div>

        {/* Pink border glow particles - responsive sizing */}
        <motion.div
          className="absolute top-0 left-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-pink-400/40 blur-xs sm:blur-sm z-10"
          animate={{
            y: [0, 40, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-pink-400/40 blur-xs sm:blur-sm z-10"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </motion.div>
    </div>
  );
}