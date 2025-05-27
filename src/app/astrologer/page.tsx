"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
  const router = useRouter();
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
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.experience) newErrors.experience = "Experience is required";
    if (!formData.specialization) newErrors.specialization = "Specialization is required";
    if (formData.languages.length === 0) newErrors.languages = "At least one language is required";
    if (formData.services.length === 0) newErrors.services = "At least one service is required";
    if (!formData.about.trim()) newErrors.about = "About is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("dob", formData.dob);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("experience", formData.experience);
      formDataToSend.append("specialization", formData.specialization);
      formDataToSend.append("languages", JSON.stringify(formData.languages));
      formDataToSend.append("services", JSON.stringify(formData.services));
      formDataToSend.append("about", formData.about);

      const response = await fetch("/api/astrologers/register", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
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
        
        toast.success('Your application has been submitted successfully!');
      } else {
        const errorData = await response.json();
        toast.error(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Join Our Astrologer Network
          </h1>
          <p className="text-gray-600 text-lg">Share your cosmic wisdom with seekers worldwide</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-purple-100">
            <h2 className="text-2xl font-semibold text-purple-800 mb-6 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">1</span>
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number*</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="+91 9876543210"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Date of Birth*</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
              </div>

              {/* Gender */}
              <div className="md:col-span-1">
                <label className="block text-gray-700 font-medium mb-2">Gender*</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>
            </div>
          </section>

          <section className="bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-purple-100">
            <h2 className="text-2xl font-semibold text-purple-800 mb-6 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
              Professional Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Experience */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Years of Experience*</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  min="0"
                  placeholder="e.g., 5"
                />
                {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
              </div>

              {/* Specialization */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Specialization*</label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
                <label className="block text-gray-700 font-medium mb-3">Languages Known*</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["Hindi", "English", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati", "Other"].map((lang) => (
                    <label key={lang} className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        name="languages"
                        value={lang}
                        checked={formData.languages.includes(lang)}
                        onChange={handleChange}
                        className="w-4 h-4 text-purple-600 bg-white border-purple-300 rounded focus:ring-purple-500 focus:ring-2 mr-3"
                      />
                      <span className="text-gray-700 font-medium">{lang}</span>
                    </label>
                  ))}
                </div>
                {errors.languages && <p className="text-red-500 text-sm mt-2">{errors.languages}</p>}
              </div>

              {/* Services */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-3">Services Offered*</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["Birth Chart", "Horoscope", "Match Making", "Career Guidance", "Health Prediction", "Remedies"].map((service) => (
                    <label key={service} className="flex items-center p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        name="services"
                        value={service}
                        checked={formData.services.includes(service)}
                        onChange={handleChange}
                        className="w-4 h-4 text-indigo-600 bg-white border-indigo-300 rounded focus:ring-indigo-500 focus:ring-2 mr-3"
                      />
                      <span className="text-gray-700 font-medium">{service}</span>
                    </label>
                  ))}
                </div>
                {errors.services && <p className="text-red-500 text-sm mt-2">{errors.services}</p>}
              </div>

              {/* About */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">About Yourself*</label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell us about your astrological journey, expertise, and what makes you unique..."
                />
                {errors.about && <p className="text-red-500 text-sm mt-1">{errors.about}</p>}
              </div>
            </div>
          </section>

          <div className="text-center pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative inline-flex items-center justify-center px-12 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-105 active:scale-95"
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
            <p className="text-gray-500 text-sm mt-4">
              Your application will be reviewed within 2-3 business days
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}