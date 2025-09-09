import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What types of sketches do you offer?",
    a: "We create pencil sketches, color sketches, and couple portraits. You can also request custom themes or backgrounds."
  },
  {
    q: "How do I place an order?",
    a: "Simply choose your sketch type, upload the photo, and confirm your order by paying a 50% advance."
  },
  {
    q: "How long does it take to complete a sketch?",
    a: "It usually takes 3–5 working days depending on the size and detailing of your portrait. Express delivery is also available."
  },
  {
    q: "Can I preview my artwork before final delivery?",
    a: "Yes! We send progress updates and a preview of the final sketch for your approval. Corrections can be requested."
  },
  {
    q: "What paper sizes are available?",
    a: "We offer multiple sizes – A4, A3, A2, and custom dimensions based on your request."
  },
  {
    q: "Do you provide framing with the sketch?",
    a: "Yes, framing is available at an additional cost. You can select it while placing the order."
  },
  {
    q: "How will my artwork be delivered?",
    a: "We use secure packaging and trusted courier partners to deliver your sketch safely at your doorstep."
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship sketches worldwide. Shipping charges vary depending on the country."
  },
  {
    q: "What payment options do you accept?",
    a: "We accept UPI, credit/debit cards, net banking, and cash on delivery (for select locations)."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-[#f8f4f4]">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#4a2f2f] mb-12">
          ❓ Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              layout
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 cursor-pointer border-l-4 border-[#d4a373]"
              onClick={() => toggleFAQ(index)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#4a2f2f]">{faq.q}</h3>
                <motion.span
                  className="text-[#b9855c] font-bold text-2xl"
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  +
                </motion.span>
              </div>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.p
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="mt-3 text-gray-600 leading-relaxed"
                  >
                    {faq.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
