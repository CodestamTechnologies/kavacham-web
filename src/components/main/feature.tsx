"use client"
import { motion } from "framer-motion";
import { useState } from "react";

export function CosmicWaitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Here you would typically send the email to your backend
  //   console.log("Submitted email:", email);
  //   setSubmitted(true);
  //   setEmail("");
  // };

  return (
    <div className="relative lg:w-[60vw] w-[90vw] m-auto my-12 p-0.5 rounded-xl bg-gradient-to-r from-[#838CF9] to-[#F49AC2]">
      {/* Gradient border */}
      <div className="relative bg-white dark:bg-gray-900 rounded-xl p-8 sm:p-10">
        {/* Floating celestial elements */}
        <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-[#F49AC2]/30 blur-sm" />
        <div className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-[#838CF9]/30 blur-sm" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#838CF9] to-[#F49AC2] bg-clip-text text-transparent mb-2">
            Cosmic Connection Awaits
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join our waitlist to get connected with 60+ top famous psychics when we launch
          </p>

          {!submitted ? (
            <form  className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-[#838CF9] focus:border-transparent dark:bg-gray-800"
                />
                <div className="absolute top-0 right-0 h-full flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-[#F49AC2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-[#838CF9] to-[#F49AC2] text-white font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Join Waitlist
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-lg bg-[#F49AC2]/10 border border-[#F49AC2]/30"
            >
              <p className="text-[#838CF9] font-medium">
                ✨ Thank you! We'll contact you when we launch. ✨
              </p>
            </motion.div>
          )}

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Coming soon to illuminate your cosmic journey
          </p>
        </motion.div>
      </div>

      {/* Animated cosmic particles */}
      <div className="absolute -top-4 -right-4 w-3 h-3 rounded-full bg-[#838CF9] animate-pulse" />
      <div className="absolute -bottom-4 -left-4 w-2 h-2 rounded-full bg-[#F49AC2] animate-pulse delay-300" />
    </div>
  );
}