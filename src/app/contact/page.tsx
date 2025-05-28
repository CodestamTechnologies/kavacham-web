"use client"
import { motion } from "framer-motion";
import { Poppins } from 'next/font/google';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import toast from "react-hot-toast";

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const res = await fetch('/api/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: form.email,
          customerName: form.name,
          message: form.message,
          email:form.email,
          phone: form.phone,
        })
      });
  
      const data = await res.json();
  
      if (data.success) {
        toast.success("✅ Message sent successfully!");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error("❌ Failed to send message: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("❌ Error:", err);
      toast.error("❌ Something went wrong while sending the message.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 ${poppins.className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] bg-clip-text text-transparent"
          >
            Reach Out to Kavacham
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            We're here to listen, guide, and support your astrological journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="border border-gray-200/50 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="focus-visible:ring-purple-500 dark:bg-gray-800"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      className="focus-visible:ring-purple-500 dark:bg-gray-800"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="focus-visible:ring-purple-500 dark:bg-gray-800"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message..."
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      required
                      className="focus-visible:ring-purple-500 dark:bg-gray-800"
                    />
                  </div>

                  <CardFooter className="px-0 pb-0">
                    <Button 
                      type="submit" 
                      className="bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] hover:from-[#A07CE0] hover:to-[#E58FB0] text-white"
                      disabled={isSubmitting}
                    >
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </span>
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="border border-gray-200/50 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] text-white flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Address</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Kavacham Technologies,<br />
                      2nd Floor, Triveni Complex,<br />
                      New Delhi – 110019, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] text-white flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Support Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      connect@kavachamtalks.in
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] text-white flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      +91 98765 43210
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  We typically respond within 24-48 hours.
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}