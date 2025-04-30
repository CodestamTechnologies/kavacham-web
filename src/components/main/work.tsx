"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";
import { User, Calendar, Star } from "lucide-react";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const steps = [
  {
    number: "1",
    title: "Sign Up",
    description: "Create your Kavacham account and choose the service that resonates with your current needs and spiritual journey.",
    icon: <User className="w-12 h-12 text-pink-300" />
  },
  {
    number: "2",
    title: "Share Birth Details",
    description: "Provide your birth date, time, and location for our astrologers to analyze your unique cosmic blueprint.",
    icon:     <Calendar className="w-12 h-12 text-pink-300 " />
  },
  {
    number: "3",
    title: "Receive Your Kavacham",
    description: "Get your personalized astrological insights, remedies, and guidance to navigate life with cosmic wisdom.",
    icon: <Star className="w-12 h-12 text-pink-300 " />
  }
];

export default function HowItWorks() {
  return (
    <div className={`bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${poppins.className}`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#B38CF9] to-[#F49AC2]">
            How It Works
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your journey to cosmic wisdom and protection is simple and transformative.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.15
              }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="h-full bg-gradient-to-br from-[#F9F9F9] to-[#FFFFFF] dark:from-[#1A1A1A] dark:to-[#2A2A2A] border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] flex items-center justify-center text-white mb-4 mx-auto"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex  items-center">
                      <span className="font-bold text-2xl">{step.number}</span>
                    </div>
                  </motion.div>
                  <CardTitle className="text-center text-xl font-semibold text-gray-800 dark:text-white">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-gray-600 dark:text-gray-300">
                  {step.description}
                </CardContent>
                <div className=" mt-1 flex items-center justify-center ">
                        {step.icon}
                      </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button 
            className="bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] text-white font-semibold py-3 px-8 rounded-full hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Begin Your Journey
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}