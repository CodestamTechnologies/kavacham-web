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
      }else {
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
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold text-center mb-8">Astrologer Registration</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block mb-2">Full Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2">Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2">Phone Number*</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block mb-2">Date of Birth*</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
            </div>

            {/* Gender */}
            <div>
              <label className="block mb-2">Gender*</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Professional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Experience */}
            <div>
              <label className="block mb-2">Years of Experience*</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                min="0"
              />
              {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
            </div>

            {/* Specialization */}
            <div>
              <label className="block mb-2">Specialization*</label>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Specialization</option>
                <option value="Vedic Astrology">Vedic Astrology</option>
                <option value="Western Astrology">Western Astrology</option>
                <option value="Numerology">Numerology</option>
                <option value="Palmistry">Palmistry</option>
                <option value="Tarot Reading">Tarot Reading</option>
                <option value="Vastu">Vastu</option>
              </select>
              {errors.specialization && <p className="text-red-500 text-sm">{errors.specialization}</p>}
            </div>

            {/* Languages */}
            <div className="md:col-span-2">
              <label className="block mb-2">Languages Known*</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {["Hindi", "English", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati", "Other"].map((lang) => (
                  <label key={lang} className="flex items-center">
                    <input
                      type="checkbox"
                      name="languages"
                      value={lang}
                      checked={formData.languages.includes(lang)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {lang}
                  </label>
                ))}
              </div>
              {errors.languages && <p className="text-red-500 text-sm">{errors.languages}</p>}
            </div>

            {/* Services */}
            <div className="md:col-span-2">
              <label className="block mb-2">Services Offered*</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {["Birth Chart", "Horoscope", "Match Making", "Career Guidance", "Health Prediction", "Remedies"].map((service) => (
                  <label key={service} className="flex items-center">
                    <input
                      type="checkbox"
                      name="services"
                      value={service}
                      checked={formData.services.includes(service)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {service}
                  </label>
                ))}
              </div>
              {errors.services && <p className="text-red-500 text-sm">{errors.services}</p>}
            </div>

            {/* About */}
            <div className="md:col-span-2">
              <label className="block mb-2">About Yourself*</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border rounded"
              />
              {errors.about && <p className="text-red-500 text-sm">{errors.about}</p>}
            </div>
          </div>
        </section>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
}