import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { motion } from "framer-motion"; 
import ganesha from "../../assets/beginning.jpeg";
import grow from "../../assets/grow.jpeg";
import nitanshi from "../../assets/nitanshi.jpeg";

export default function OurStoryPage() {
  useEffect(() => {
    document.title = "ShejalArt - Our Story";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-16">
        {/* Page Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-center text-gray-800 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Story
        </motion.h1>

        {/* Story Sections */}
        <div className="flex flex-col gap-16">
          {/* Section 1 - Humble Beginnings */}
          <motion.div
            className="flex flex-col md:flex-row items-center gap-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
          <img
  src={ganesha}
  alt="First Sketch"
  className="w-full md:w-1/2 h-80 rounded-xl  object-contain"
/>
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                First Step into Sketching
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                My journey began with the divine — my very first sketch of{" "}
                <strong>Shree Ganesha</strong>. That simple pencil stroke opened 
                the doors to the world of art, and since then, every drawing has 
                carried a piece of my soul.
              </p>
            </div>
          </motion.div>

          {/* Section 2 - Growth */}
          <motion.div
            className="flex flex-col md:flex-row-reverse items-center gap-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
          <img
  src={grow}
  alt="Growth with Love"
  className="w-full md:w-1/2 h-80 rounded-xl  object-contain"
/>
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Growing with Love & Support
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                With <strong>all your love and encouragement</strong>, I kept 
                creating, experimenting, and evolving. Every sketch I made was 
                a reflection of the bond I share with this art form — and with 
                all of you who believed in me.
              </p>
            </div>
          </motion.div>

          {/* Section 3 - Vision for the Future */}
          <motion.div
            className="flex flex-col md:flex-row items-center gap-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
          <img
  src={nitanshi}
  alt="Future Inspiration"
  className="w-full md:w-1/2 h-80 rounded-xl  object-contain "
/>
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Inspiration for the Future
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                One of the turning points was when I created{" "}
                <strong>Phool Kumari – Nitanshi Goel Ma’am</strong>. When she 
                appreciated and commented on my artwork, it gave me a new wave 
                of motivation. That moment made me realize — art has the power 
                to touch hearts, and this is just the beginning of a bigger journey.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
