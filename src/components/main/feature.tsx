"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";
import { Mail, Shield } from "lucide-react";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export default function CosmicUpdates() {
  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-white ${poppins.className}`}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] bg-clip-text text-transparent">
            <span className="font-semibold">Cosmic </span>
            <span className="font-bold">Updates</span>
          </h2>
          <p className="text-gray-600 mt-3 text-base">
            Subscribe to receive free cosmic insights, astrological tips, and exclusive offers directly to your inbox.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="rounded-2xl bg-[#F9F9F9] shadow-md p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Email Input */}
              <div className="relative w-full">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 py-2"
                />
              </div>

              {/* Subscribe Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] text-white font-semibold px-6 py-2 rounded-md shadow-md hover:from-[#A27CE0] hover:to-[#E58AB0]">
                  Subscribe Now
                </Button>
              </motion.div>
            </div>

            {/* Privacy Info */}
            <div className="mt-6 flex justify-center items-center text-sm text-gray-500 dark:text-gray-400 text-center">
              <Shield className="h-4 w-4 mr-2" />
              <span>We respect your privacy. Unsubscribe at any time.</span>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
