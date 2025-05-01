"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedSun() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="relative w-full h-full min-h-[600px] ">
      <motion.div
        className="absolute right-[10%] top-1/2 -translate-y-1/2" // Changed to right positioning
        animate={{
          x: ["0%", "3%", "0%", "-3%", "0%"], // Adjusted to move around the right position
          y: ["-50%", "-47%", "-50%", "-53%", "-50%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="absolute -inset-12 rounded-full bg-pink-400/30 blur-2xl"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#838CF9] to-[#F49AC2] blur-lg opacity-90"
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
          <div className="absolute inset-0 rounded-full bg-white/20 blur-md" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full bg-gradient-to-br from-[#F49AC2] to-[#838CF9] blur-md opacity-95"
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
          <div className="absolute top-1/4 left-1/4 w-24 h-24 rounded-full bg-white/30 blur-sm" />
        </motion.div>

        <motion.div
          className="absolute top-0 left-1/2 w-5 h-5 rounded-full bg-pink-400/40 blur-sm"
          animate={{
            y: [0, 60, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-4 h-4 rounded-full bg-pink-400/40 blur-sm"
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
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