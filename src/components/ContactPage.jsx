// src/pages/ContactPage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { sendContactMessage, clearContactState } from "../redux/slices/contactSlice";
import { toast } from "react-toastify";

export default function ContactPage() {
  const dispatch = useDispatch();
  const { loading, successMessage, error } = useSelector((state) => state.contact);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = "SketchWebsite - Contact Us";
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setName("");
      setEmail("");
      setMessage("");
      dispatch(clearContactState());
    }
    if (error) {
      toast.error(error);
    }
  }, [successMessage, error, dispatch]);

  const validateEmail = (email) => {
    // Basic email regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateName = (name) => {
    // Only letters and spaces, min 2 chars
    const re = /^[A-Za-z\s]{2,}$/;
    return re.test(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!validateName(name)) {
      toast.error("Please enter a valid name (letters and spaces only, min 2 characters)");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (message.trim().length < 5) {
      toast.error("Message must be at least 5 characters long");
      return;
    }

    dispatch(sendContactMessage({ name, email, message }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12 sm:py-16 lg:px-8">
        {/* Page Heading */}
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-8  sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </motion.h1>

        {/* Contact Info + Form */}
        <motion.div
          className="grid gap-8 sm:gap-10 md:grid-cols-2 items-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Contact Info */}
          <div className="flex flex-col gap-6 mt-5 ">
            <motion.p
              className="text-gray-700 text-sm sm:text-base md:text-lg"
              whileHover={{ scale: 1.02 }}
            >
              We'd love to hear from you! Reach out via email, phone, or follow our social media channels for updates.
            </motion.p>

            <div className="flex flex-col gap-2">
              <p className="font-semibold text-gray-800">Email:</p>
              <p className="text-gray-700 break-words text-sm sm:text-base">contact@yourcompany.com</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-semibold text-gray-800">Phone:</p>
              <p className="text-gray-700 text-sm sm:text-base">+91 123 456 7890</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-4 flex-wrap">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
                whileHover={{ scale: 1.2 }}
              >
                <FaFacebookF size={18} />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition"
                whileHover={{ scale: 1.2 }}
              >
                <FaInstagram size={18} />
              </motion.a>
              <motion.a
                href="https://youtube.com"
                target="_blank"
                className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition"
                whileHover={{ scale: 1.2 }}
              >
                <FaYoutube size={18} />
              </motion.a>
            </div>
          </div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white p-6 sm:p-8 md:p-10 mt-5  rounded-xl shadow-lg flex flex-col gap-4 sm:gap-5 w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#b9855c] w-full"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#b9855c] w-full"
              required
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#b9855c] w-full resize-none"
              required
            ></textarea>
            <motion.button
              type="submit"
              className="bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-white py-3 rounded-lg font-medium hover:opacity-90 transition w-full text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </motion.form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
