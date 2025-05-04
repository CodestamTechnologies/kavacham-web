"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Poppins } from "next/font/google"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const poppins = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
})

const testimonials = [
  {
    id: 1,
    quote: "Kavacham's birth chart reading was incredibly accurate and insightful. It helped me understand patterns in my life that I've been struggling with for years. The personalized remedies have brought a sense of peace I haven't felt before.",
    name: "Aanya Mehta",
    role: "Entrepreneur",
    rating: 5,
    avatar: "/avatars/aanya.jpg"
  },
  {
    id: 2,
    quote: "The energy healing session was transformative. I felt immediate relief from my chronic anxiety and have been sleeping better than ever.",
    name: "Rahul Sharma",
    role: "Software Engineer",
    rating: 4,
    avatar: "/avatars/rahul.jpg"
  },
  {
    id: 3,
    quote: "The astrological guidance helped me make crucial career decisions with confidence. The predictions were remarkably accurate!",
    name: "Priya Patel",
    role: "Marketing Director",
    rating: 5,
    avatar: "/avatars/priya.jpg"
  }
]

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [direction, setDirection] = useState<"left" | "right">("right")

  const nextTestimonial = () => {
    setDirection("right")
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    )
  }

  const prevTestimonial = () => {
    setDirection("left")
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    )
  }

  const goToTestimonial = (index: number) => {
    setDirection(index > currentTestimonial ? "right" : "left")
    setCurrentTestimonial(index)
  }

  const variants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 50 : -50,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.33, 1, 0.68, 1]
      }
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -50 : 50,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.33, 1, 0.68, 1]
      }
    })
  }

  return (
    <section 
      id="testimonials" 
      className={`py-12 md:py-20 px-4 sm:px-6 lg:px-8 ${poppins.className} bg-gray-50 dark:bg-gray-900`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#838CF9] to-[#F49AC2]">
            Client Experiences
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Transformative journeys shared by those who've embraced cosmic guidance
          </p>
        </motion.div>

        <div className="relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={testimonials[currentTestimonial].id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <Card className="w-full border-0 shadow-sm dark:shadow-none bg-white dark:bg-gray-800 overflow-hidden">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                      <div className="flex-shrink-0 flex justify-center">
                        <Avatar className="h-20 w-20 md:h-24 md:w-24 border-2 border-purple-500/30">
                          <AvatarImage src={testimonials[currentTestimonial].avatar} />
                          <AvatarFallback className="bg-gradient-to-r from-[#838CF9] to-[#F49AC2] text-white">
                            {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      
                      <div className="text-center md:text-left">
                        <div className="flex justify-center md:justify-start mb-4">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon 
                              key={i} 
                              filled={i < testimonials[currentTestimonial].rating} 
                            />
                          ))}
                        </div>
                        
                        <blockquote className="text-lg md:text-xl italic text-gray-700 dark:text-gray-300 mb-6">
                          "{testimonials[currentTestimonial].quote}"
                        </blockquote>
                        
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-lg">
                            {testimonials[currentTestimonial].name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonials[currentTestimonial].role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <Button 
              onClick={prevTestimonial}
              variant="ghost" 
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 h-12 w-12 rounded-full shadow-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </Button>
            
            <Button 
              onClick={nextTestimonial}
              variant="ghost" 
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 h-12 w-12 rounded-full shadow-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation & Indicators */}
        <div className="mt-8 flex flex-col items-center">
          <div className="flex gap-2 mb-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentTestimonial === index 
                    ? 'w-6 bg-gradient-to-r from-[#838CF9] to-[#F49AC2]' 
                    : 'w-2 bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="flex gap-4">
            <Button 
              onClick={prevTestimonial}
              variant="outline" 
              size="icon"
              className="rounded-full"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <Button 
              onClick={nextTestimonial}
              variant="outline" 
              size="icon"
              className="rounded-full"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={`h-5 w-5 ${filled ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current dark:text-gray-600'}`}
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  )
}