"use client"
import { motion } from "framer-motion";
import { Poppins } from 'next/font/google';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield, Mail, Cookie, Settings, User, Lock } from 'lucide-react';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const privacySections = [
  {
    icon: <User className="w-6 h-6" />,
    title: "Information We Collect",
    points: [
      "Name, email, and message content via the contact form",
      "Technical data like IP address, browser type, and cookies",
      "Data shared voluntarily during interactions"
    ]
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "How We Use Your Data",
    points: [
      "To respond to your queries and provide support",
      "To improve our website and user experience",
      "To comply with legal obligations"
    ]
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Your Rights",
    points: [
      "Right to access your data",
      "Right to request correction or deletion",
      "Right to withdraw consent at any time"
    ]
  },
  {
    icon: <Cookie className="w-6 h-6" />,
    title: "Cookies",
    points: [
      "We use cookies to understand user behavior and improve functionality",
      "You can disable cookies in your browser settings"
    ]
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Third-Party Services",
    points: [
      "We may use tools like Google Analytics",
      "These services have their own privacy practices"
    ]
  }
];

export default function PrivacyPolicy() {
  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 ${poppins.className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] bg-clip-text text-transparent"
          >
            Privacy Policy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Kavacham values your privacy. This policy outlines how we collect, use, and safeguard your personal data.
          </motion.p>
        </div>

        {/* Privacy Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {privacySections.map((section, index) => (
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
                  <ul className="space-y-2 text-gray-600">
                    {section.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-purple-500">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Contact Card - Full Width */}
          <motion.div
            className="md:col-span-2 lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border border-gray-200/50 shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] text-white">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold">
                    Contact for Privacy Concerns
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-center gap-4 text-gray-600">
                  <span className="flex items-center gap-2">
                    <Mail className="text-purple-500" />
                    Email: support@kavacham.in
                  </span>
                </div>
                <p className="mt-4 text-gray-600">
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}