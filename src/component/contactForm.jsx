import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Loader2,
  Navigation
} from 'lucide-react';
import imgLogoNg3 from "../assets/logo1.png";
import ReCAPTCHA from "react-google-recaptcha";

const cardMapImage =
  "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600";

export default function ContactSection() {
  const { register, handleSubmit, setValue } = useForm();
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const onSubmit = async (data) => {
    if (!captchaToken) {
      alert("Please verify captcha");
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch(import.meta.env.VITE_API_URL + "/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          captchaToken
        })
      });

      alert("Message sent successfully!");
    } catch (err) {
      alert("Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFetchLocation = () => {
    setIsFetching(true);
    setTimeout(() => {
      setValue("location", "Greater Noida, Uttar Pradesh, India");
      setIsFetching(false);
    }, 1500);
  };

  return (
    <section className="py-20 px-4 bg-white" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* LEFT CARD – SAME */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/3 bg-[#333333] text-white rounded-3xl overflow-hidden shadow-2xl relative flex flex-col justify-between min-h-[600px]"
          >
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-[#80c537]/10 rounded-full blur-3xl" />

            <div className="p-8 z-10">
              <div className="flex items-center gap-3 mb-8">
                <img src={imgLogoNg3} alt="Logo" className="h-10 w-auto brightness-0 invert" />
                <span className="text-xl font-bold tracking-wide text-[#80c537]">
                  NirwanaGrid
                </span>
              </div>

              <div className="mb-8 rounded-xl overflow-hidden h-48 w-full relative">
                <img
                  src={cardMapImage}
                  alt="Location Map"
                  className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#333] to-transparent" />
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#80c537] mt-1" />
                  <p className="font-medium">+91 78270 92040</p>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[#80c537] mt-1" />
                  <p className="font-medium text-gray-300">support@nirwanagrid.com</p>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#80c537] mt-1" />
                  <p className="font-medium text-gray-300">
                    Greater Noida Uttar Pradesh, India - 201310
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-black/20 z-10">
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#80c537] hover:text-white transition-all duration-300 text-gray-300"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* FORM – SAME FIELDS + CAPTCHA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-2/3 overflow-visible"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Let's Discuss Your Smart Space Needs
              </h2>
              <p className="text-gray-500">
                We would love to hear from you anytime
              </p>
              <div className="h-1 w-20 bg-[#80c537] mt-4 rounded-full" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <input {...register("name", { required: true })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input type="email" {...register("email", { required: true })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                </div>
              </div>

              {/* Phone + Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Contact Number</label>
                  <input {...register("phone", { required: true })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                </div>

                <div className="space-y-2 relative">
                  <label className="text-sm font-medium text-gray-700">City/Location</label>
                  <input {...register("location", { required: true })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg pr-24" />
                  <button type="button"
                    onClick={handleFetchLocation}
                    className="absolute right-2 top-9 px-3 py-1 bg-[#444] text-white text-xs rounded">
                    {isFetching ? <Loader2 size={12} className="animate-spin" /> : <Navigation size={12} />}
                  </button>
                </div>
              </div>

              {/* Selects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <select {...register("customerType")}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <option value="Home">Home</option>
                  <option value="Business">Business</option>
                </select>

                <select {...register("internet")}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <option value="Always Available">Always Available</option>
                  <option value="Sometimes">Sometimes</option>
                  <option value="Rarely">Rarely</option>
                </select>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2 pt-2">
                <input type="checkbox" required className="mt-1 accent-[#80c537]" />
                <p className="text-xs text-gray-500">
                  By submitting this form, you agree that we may use your information for marketing purposes.
                </p>
              </div>

              {/* GOOGLE CAPTCHA (replaces fake one) */}
              <div className="pt-2">
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={(token) => setCaptchaToken(token)}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3 bg-[#334e68] text-white font-bold rounded-lg hover:bg-[#80c537] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
