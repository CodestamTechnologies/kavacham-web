"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const poppins = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
});

const testimonials = [
  {
    id: 1,
    quote: "Kavacham's birth chart reading was incredibly accurate and insightful. It helped me understand patterns in my life that I've been struggling with for years. The personalized remedies have brought a sense of peace I haven't felt before.",
    name: "Aanya Mehta",
    role: "Entrepreneur",
    rating: 5
  },
  {
    id: 2,
    quote: "The energy healing session was transformative. I felt immediate relief from my chronic anxiety and have been sleeping better than ever.",
    name: "Rahul Sharma",
    role: "Software Engineer",
    rating: 4
  },
  {
    id: 3,
    quote: "The astrological guidance helped me make crucial career decisions with confidence. The predictions were remarkably accurate!",
    name: "Priya Patel",
    role: "Marketing Director",
    rating: 5
  }
];

export default function TestimonialsPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${poppins.className}`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#B38CF9] to-[#F49AC2]">
            What Our Clients Say
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Hear from those who have experienced the transformative power of Kavacham's cosmic guidance.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            key={testimonials[currentTestimonial].id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8 sm:mb-0"
          >
            <Card className="bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] p-0.5 rounded-lg shadow-lg w-full max-w-2xl">
              <CardContent className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-lg">
                <div className="flex flex-col items-center text-center sm:text-left sm:flex-row gap-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                  >
                    {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                  </motion.div>
                  
                  <div>
                    <div className="flex justify-center sm:justify-start mb-3">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon 
                          key={i} 
                          filled={i < testimonials[currentTestimonial].rating} 
                        />
                      ))}
                    </div>
                    
                    <blockquote className="text-base sm:text-lg italic text-gray-700 dark:text-gray-300 mb-4">
                      "{testimonials[currentTestimonial].quote}"
                    </blockquote>
                    
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
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

          {/* Desktop Navigation buttons (sides) */}
          <div className="hidden sm:block">
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 sm:-left-12 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-[#B38CF9]" />
            </button>
            
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 sm:-right-12 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-[#F49AC2]" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation buttons (below) */}
        <div className="flex justify-center items-center gap-4 sm:hidden mt-6">
          <button 
            onClick={prevTestimonial}
            className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-[#B38CF9]" />
          </button>
          
          {/* Mobile indicators */}
          <div className="flex mx-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 mx-1 rounded-full ${currentTestimonial === index ? 'bg-[#B38CF9]' : 'bg-gray-300'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            onClick={nextTestimonial}
            className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-[#F49AC2]" />
          </button>
        </div>
      </div>
    </div>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={`w-5 h-5 ${filled ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}`}
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}