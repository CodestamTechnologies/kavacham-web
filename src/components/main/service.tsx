"use client"
import { motion } from "framer-motion";
import { Poppins } from 'next/font/google';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Clock, ThumbsUp, Settings, Star, ArrowRight } from 'lucide-react';
import { Button } from "../ui/button";

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});


const services = [
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Birth Chart Reading",
    description: "Discover your cosmic blueprint with a detailed analysis of planetary positions at your birth."
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Daily Horoscope",
    description: "Receive personalized daily guidance based on your zodiac sign and current planetary movements."
  },
  {
    icon: <ThumbsUp className="w-8 h-8" />,
    title: "Compatibility Analysis",
    description: "Understand the cosmic dynamics between you and your partner, friends, or colleagues."
  },
  {
    icon: <Settings className="w-8 h-8" />,
    title: "Personalized Kavacham",
    description: "Receive your cosmic shield with tailored remedies and practices for protection and growth."
  }
];







export default function ServicesSection() {
  return (
    <section id="service" className={`py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 ${poppins.className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how Kavacham can illuminate your path.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="relative h-full border border-gray-200/50 shadow-lg hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] text-white">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                <Button 
  variant="secondary"
  size="sm"
  className="absolute bottom-4 gap-1"
>
  Learn more
  <ArrowRight className="h-3.5 w-3.5" />
</Button>
                </CardFooter>
              </Card>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
