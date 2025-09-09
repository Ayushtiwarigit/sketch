
import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { motion } from "framer-motion"; 
import { useEffect } from "react";


export default function OurStoryPage() {
      useEffect(() => {
        document.title = "SketchWebsite - Our Story";
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
          {/* Section 1 */}
          <motion.div
            className="flex flex-col md:flex-row items-center gap-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
              alt="Beginning"
              className="w-full md:w-1/2 rounded-xl shadow-lg object-cover"
            />
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Humble Beginnings
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our journey started with a simple idea and a lot of passion. We
                wanted to bring quality products to our customers with honesty
                and dedication.
              </p>
            </div>
          </motion.div>

          {/* Section 2 */}
          <motion.div
            className="flex flex-col md:flex-row-reverse items-center gap-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
              alt="Growth"
              className="w-full md:w-1/2 rounded-xl shadow-lg object-cover"
            />
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Growing Together
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Through challenges and victories, we grew as a team. Every step
                was driven by our commitment to excellence and customer
                satisfaction.
              </p>
            </div>
          </motion.div>

          {/* Section 3 */}
          <motion.div
            className="flex flex-col md:flex-row items-center gap-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
              alt="Future"
              className="w-full md:w-1/2 rounded-xl shadow-lg object-cover"
            />
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Vision for the Future
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                We are constantly innovating and expanding, aiming to bring our
                story and products to more people worldwide, while staying true
                to our values.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
