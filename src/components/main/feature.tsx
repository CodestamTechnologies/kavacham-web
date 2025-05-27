"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { Poppins } from 'next/font/google'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import toast from "react-hot-toast"

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export function CosmicWaitlist() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState("")

  // Enhanced email validation
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    if (emailError) setEmailError("") // Clear error when typing
  }

  const handleSubmit = async () => {
    // Validate email format
    if (!email) {
      setEmailError("Email is required")
      toast.error("Please enter your email address")
      return
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address")
      toast.error("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setSubmitted(true)
        toast.success("You've been added to the waitlist!")
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const particles = [
    { color: 'bg-[#838CF9]', position: 'top-4 left-4', size: 'w-2 h-2' },
    { color: 'bg-[#F49AC2]', position: 'bottom-4 right-4', size: 'w-3 h-3' },
    { color: 'bg-[#838CF9]', position: 'top-10 right-10', size: 'w-1.5 h-1.5' },
    { color: 'bg-[#F49AC2]', position: 'bottom-10 left-10', size: 'w-2 h-2' },
  ]

  return (
    <section className="w-full z-2 bg-gray-50" data-section="waitlist">
    <div className={` relative max-w-3xl w-[90vw] mx-auto p-5 ${poppins.className}`}>
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
                    onChange={handleEmailChange}
                    onBlur={() => {
                      if (email && !validateEmail(email)) {
                        setEmailError("Please enter a valid email address")
                      }
                    }}
                    placeholder="Enter your email"
                    className={`w-full px-5 py-6 rounded-lg border ${
                      emailError ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                    } focus-visible:ring-2 focus-visible:ring-[#838CF9] focus-visible:border-transparent dark:bg-gray-800/80`}
                    required
                  />
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-[#F49AC2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {emailError && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                      {emailError}
                    </p>
                  )}
                </div>
                
                <div className="flex justify-center">
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading || !email || !!emailError}
                    className="px-8 py-6 rounded-lg bg-gradient-to-r from-[#838CF9] to-[#F49AC2] text-white font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Joining...
                      </span>
                    ) : (
                      'Join Waitlist'
                    )}
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
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  A confirmation has been sent to {email}
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
    </section>
  )
}