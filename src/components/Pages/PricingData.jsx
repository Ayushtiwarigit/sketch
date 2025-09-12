import React from "react";
import WhatsAppOrderButton from "../Button/WhatsAppOrderButton";

const pricingData = [
  {
    category: "Pencil Sketch",
    plans: [
      { size: "A4 ", price: "₹500" },
      { size: "A3", price: "₹1000" },
      // { size: "A2 (16.5 × 23.4 in)", price: "₹4,499" },
    ],
  },
  {
    category: "Color Sketch",
    plans: [
      { size: "A4 ", price: "₹899" },
      { size: "A3", price: "₹1299" },
      // { size: "A2 (16.5 × 23.4 in)", price: "₹6,999" },
    ],
  },
  {
    category: "Couple Portrait",
    plans: [
      { size: "A4 ", price: "₹700" },
      { size: "A3", price: "₹1499" },
      // { size: "A2 (16.5 × 23.4 in)", price: "₹8,499" },
    ],
  },
];

export default function PricingSection() {
  return (
    <>
      {/* Custom CSS for running border animation */}
      <style jsx>{`
        @keyframes runningBorder {
          0% {
            stroke-dashoffset: 200;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .running-border {
          position: relative;
          background: white;
          border-radius: 1rem;
          border: 2px solid transparent;
        }

        .running-border::before {
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border-radius: 1rem;
          padding: 2px;
          background: linear-gradient(
            45deg,
            #d4a373,
            #3d2b2b,
            #d4a373,
            #f4a460,
            #d4a373,
            #3d2b2b
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: exclude;
          mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask-composite: exclude;
          animation: runningBorder 3s linear infinite;
          background-size: 300% 300%;
        }

        .running-border:hover::before {
          animation-duration: 1.5s;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .running-border::before {
          animation: gradientShift 3s ease infinite;
        }

        .running-border:hover::before {
          animation: gradientShift 1.5s ease infinite;
        }
      `}</style>

      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#faf7f5] to-[#f1ece9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-[#3d2b2b] mt-12 sm:mb-16 tracking-tight">
            🎨 Our Pricing
          </h2>

          {/* Grid */}
          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3 mt-5">
            {pricingData.map((category, idx) => (
              <div
                key={idx}
                className="running-border shadow-md hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 md:p-10 flex flex-col items-center hover:scale-105 transform"
              >
                {/* Category Title */}
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-[#3d2b2b] mb-6 text-center">
                  {category.category}
                </h3>

                {/* Plans */}
                <ul className="w-full space-y-3 sm:space-y-4">
                  {category.plans.map((plan, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-[#fafafa] rounded-lg px-4 py-2 sm:px-5 sm:py-3 shadow-sm hover:shadow-md transition"
                    >
                      <span className="text-gray-700 font-medium text-sm sm:text-base">
                        {plan.size}
                      </span>
                      <span className="text-[#d4a373] font-semibold text-base sm:text-lg">
                        {plan.price}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="mt-4 sm:mt-6 flex justify-center w-full">
                  <WhatsAppOrderButton className="w-full sm:w-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
