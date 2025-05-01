"use client"
import { motion } from "framer-motion";
import { Poppins } from 'next/font/google';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield, Eye, Target, Star, BookOpen, HeartHandshake,Calendar } from 'lucide-react';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const aboutSections = [
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Our Vision",
    content: "To make astrology accessible, transparent, and truly helpful for every Indian seeking direction in life—be it health, career, relationships, or spirituality."
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Our Mission",
    content: "To provide insightful astrological tools, expert guidance, and meaningful content that genuinely makes a difference."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Our Philosophy",
    content: "\"Astrology That Shields\" — This phrase embodies our belief that astrology is not merely predictive, but protective. It's a guiding light—one that helps you understand yourself, make informed decisions, and shield against life's uncertainties."
  }
];

const offerings = [
  {
    icon: <Star className="w-5 h-5" />,
    text: "Personalized astrological insights"
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    text: "Birth chart analysis"
  },
  {
    icon: <HeartHandshake className="w-5 h-5" />,
    text: "Compatibility reports"
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    text: "Daily, monthly & yearly forecasts"
  },
  {
    icon: <Shield className="w-5 h-5" />,
    text: "Remedies and rituals based on authentic Vedic practices"
  }
];

const values = [
  "Authenticity over sensationalism",
  "Privacy and discretion",
  "Simplicity and clarity",
  "Empowerment through knowledge"
];

export default function AboutPage() {
  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 ${poppins.className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] bg-clip-text text-transparent"
          >
            The Kavacham Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-4xl mx-auto"
          >
            Kavacham is more than just astrology—it's a shield. In Sanskrit, Kavacham means armour, and our vision is to empower individuals with the protective knowledge of Vedic astrology.
          </motion.p>
        </div>

        {/* Vision, Mission, Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {aboutSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border border-gray-200/50 shadow-lg hover:shadow-xl transition-all">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] text-white">
                    {section.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold">
                      {section.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* What We Offer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] bg-clip-text text-transparent">
              What We Offer
            </h2>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200/50">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {offerings.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <span className="text-purple-500 mt-0.5">{item.icon}</span>
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] bg-clip-text text-transparent">
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border border-gray-200/50 shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-6 text-center">
                    <p className="font-medium text-gray-800">{value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}