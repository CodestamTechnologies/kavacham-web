"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { Poppins } from 'next/font/google'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export function CosmicWaitlist() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  // Fixed positions for particles to avoid SSR issues
  const particles = [
    { color: 'bg-[#838CF9]', position: 'top-4 left-4', size: 'w-2 h-2' },
    { color: 'bg-[#F49AC2]', position: 'bottom-4 right-4', size: 'w-3 h-3' },
    { color: 'bg-[#838CF9]', position: 'top-10 right-10', size: 'w-1.5 h-1.5' },
    { color: 'bg-[#F49AC2]', position: 'bottom-10 left-10', size: 'w-2 h-2' },
  ]

  return (
    <div className={`relative max-w-3xl w-[90vw] mx-auto my-12 ${poppins.className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Gradient border */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#838CF9] to-[#F49AC2] p-[1px]">
          <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-xl blur-sm opacity-30" />
        </div>

        <Card className="relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden border-0">
          {/* Static particles */}
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.5
              }}
              className={`absolute rounded-full ${particle.color} ${particle.position} ${particle.size}`}
            />
          ))}
          
          <CardContent className="relative z-10 p-8 sm:p-10">
            <CardHeader className="text-center p-0 mb-6">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <CardTitle className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#838CF9] to-[#F49AC2] bg-clip-text text-transparent mb-3">
                  Cosmic Connection Awaits
                </CardTitle>
              </motion.div>
              <CardDescription className="text-gray-600 dark:text-gray-300 text-lg">
                Join our waitlist to get connected with 60+ top famous psychics when we launch
              </CardDescription>
            </CardHeader>

            {!submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="relative max-w-md mx-auto">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-5 py-6 rounded-lg border border-gray-300 dark:border-gray-700 focus-visible:ring-2 focus-visible:ring-[#838CF9] focus-visible:border-transparent dark:bg-gray-800/80"
                  />
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-[#F49AC2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button
                    onClick={() => setSubmitted(true)}
                    className="px-8 py-6 rounded-lg bg-gradient-to-r from-[#838CF9] to-[#F49AC2] text-white font-medium shadow-lg hover:shadow-xl transition-all"
                  >
                    Join Waitlist
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-lg bg-gradient-to-r from-[#838CF9]/10 to-[#F49AC2]/10 border border-[#F49AC2]/30 max-w-md mx-auto text-center"
              >
                <div className="text-4xl mb-4">✨</div>
                <p className="text-[#838CF9] font-medium text-lg">
                  Thank you! We'll contact you when we launch.
                </p>
              </motion.div>
            )}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400"
            >
              Coming soon to illuminate your cosmic journey
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}