"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Poppins } from 'next/font/google';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

interface FormData {
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  experience: string;
  specialization: string;
  languages: string[];
  services: string[];
  about: string;
}

export default function AstrologerRegistration() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    experience: "",
    specialization: "",
    languages: [],
    services: [],
    about: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement;

    if (type === "checkbox") {
      const checked = target.checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...(prev[name as keyof FormData] as string[]), value]
          : (prev[name as keyof FormData] as string[]).filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.experience) newErrors.experience = "Experience is required";
    if (!formData.specialization) newErrors.specialization = "Specialization is required";
    if (formData.languages.length === 0) newErrors.languages = "At least one language is required";
    if (formData.services.length === 0) newErrors.services = "At least one service is required";
    if (!formData.about.trim()) newErrors.about = "About section is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('🚀 Form submission started');
    
    setIsSubmitting(true);
    if (!validateForm()) {
      console.log('❌ Form validation failed', errors);
      setIsSubmitting(false);
      setSubmitStatus({
        type: 'error',
        message: 'Please fix the errors in the form before submitting.'
      });
      return;
    }

    setSubmitStatus({ type: null, message: '' });

    try {
      console.log('📤 Sending data to API:', formData);

      const response = await fetch('/api/astrologers/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('📥 API Response status:', response.status);
      
      const result = await response.json();
      console.log('📥 API Response data:', result);

      if (response.ok && result.success) {
        console.log('✅ Registration successful');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          dob: '',
          gender: '',
          experience: '',
          specialization: '',
          languages: [],
          services: [],
          about: '',
        });
        
        setSubmitStatus({
          type: 'success',
          message: 'Your application has been submitted successfully! You will receive a confirmation email shortly.'
        });

        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
      } else {
        console.error('❌ Registration failed:', result);
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Registration failed. Please try again.'
        });
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 ${poppins.className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] bg-clip-text text-transparent"
          >
            Join Our Astrologer Network
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Share your cosmic wisdom with seekers worldwide
          </motion.p>
        </div>

        {/* Status Message */}
        {submitStatus.type && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-4 rounded-lg text-center ${
              submitStatus.type === 'success' 
                ? 'bg-green-100 border border-green-400 text-green-700 dark:bg-green-900 dark:border-green-600 dark:text-green-300'
                : 'bg-red-100 border border-red-400 text-red-700 dark:bg-red-900 dark:border-red-600 dark:text-red-300'
            }`}
          >
            <p className="font-medium">{submitStatus.message}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="border border-gray-200/50 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">1</span>
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 dark:text-white transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email*</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 dark:text-white transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number*</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 dark:text-white transition-all duration-200"
                      placeholder="+91 9876543210"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Birth*</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 dark:text-white transition-all duration-200"
                    />
                    {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
                  </div>

                  {/* Gender */}
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender*</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 dark:text-white transition-all duration-200"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Professional Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="border border-gray-200/50 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Experience */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Years of Experience*</label>
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 dark:text-white transition-all duration-200"
                      min="0"
                      placeholder="e.g., 5"
                    />
                    {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                  </div>

                  {/* Specialization */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Specialization*</label>
                    <select
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 dark:text-white transition-all duration-200"
                    >
                      <option value="">Select Specialization</option>
                      <option value="Vedic Astrology">Vedic Astrology</option>
                      <option value="Western Astrology">Western Astrology</option>
                      <option value="Numerology">Numerology</option>
                      <option value="Palmistry">Palmistry</option>
                      <option value="Tarot Reading">Tarot Reading</option>
                      <option value="Vastu">Vastu</option>
                    </select>
                    {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>}
                  </div>

                  {/* Languages */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Languages Known*</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["Hindi", "English", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati", "Other"].map((lang) => (
                        <label key={lang} className="flex items-center p-3 bg-purple-50 dark:bg-gray-800 rounded-lg hover:bg-purple-100 dark:hover:bg-gray-700 transition-colors cursor-pointer border border-purple-100 dark:border-gray-600">
                          <input
                            type="checkbox"
                            name="languages"
                            value={lang}
                            checked={formData.languages.includes(lang)}
                            onChange={handleChange}
                            className="w-4 h-4 text-purple-600 bg-white border-purple-300 rounded focus:ring-purple-500 focus:ring-2 mr-3"
                          />
                          <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{lang}</span>
                        </label>
                      ))}
                    </div>
                    {errors.languages && <p className="text-red-500 text-sm mt-2">{errors.languages}</p>}
                  </div>

                  {/* Services */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Services Offered*</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {["Birth Chart", "Horoscope", "Match Making", "Career Guidance", "Health Prediction", "Remedies"].map((service) => (
                        <label key={service} className="flex items-center p-3 bg-pink-50 dark:bg-gray-800 rounded-lg hover:bg-pink-100 dark:hover:bg-gray-700 transition-colors cursor-pointer border border-pink-100 dark:border-gray-600">
                          <input
                            type="checkbox"
                            name="services"
                            value={service}
                            checked={formData.services.includes(service)}
                            onChange={handleChange}
                            className="w-4 h-4 text-pink-600 bg-white border-pink-300 rounded focus:ring-pink-500 focus:ring-2 mr-3"
                          />
                          <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{service}</span>
                        </label>
                      ))}
                    </div>
                    {errors.services && <p className="text-red-500 text-sm mt-2">{errors.services}</p>}
                  </div>

                  {/* About */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">About Yourself*</label>
                    <textarea
                      name="about"
                      value={formData.about}
                      onChange={handleChange}
                      rows={4}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 dark:text-white transition-all duration-200 resize-none"
                      placeholder="Tell us about your astrological journey, expertise, and what makes you unique..."
                    />
                    {errors.about && <p className="text-red-500 text-sm mt-1">{errors.about}</p>}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#B38CF9] to-[#F49AC2] hover:from-[#A07CE0] hover:to-[#E58FB0] text-white relative inline-flex items-center justify-center px-12 py-4 text-lg font-semibold rounded-xl shadow-md focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">✨</span>
                      Submit Application
                      <span className="ml-2">🌟</span>
                    </>
                  )}
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Your application will be reviewed within 2-3 business days
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </form>
      </div>
    </section>
  );
}