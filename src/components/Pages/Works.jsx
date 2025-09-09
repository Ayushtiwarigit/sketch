import React from "react";
import artbeniwal1 from '../../assets/artbeniwal1.avif';   
import artbeniwal2 from '../../assets/artbeniwal2.webp';
import artbeniwal3 from '../../assets/artbeniwal3.avif';
import artbeniwal4 from '../../assets/artbeniwal4.avif';        

const steps = [
  {
    id: 1,
    title: "Place Your Order",
    desc: "Confirm your order by depositing just a 50% advance payment along with the photo you'd like us to sketch.",
    image: artbeniwal1,
  },
  {
    id: 2,
    title: "Portrait Starts",
    desc: "Your pencil portrait begins within 24 hours of placing your order. We'll share progress photos throughout the process.",
    image: artbeniwal2,
  },
  {
    id: 3,
    title: "Preview & Approve",
    desc: "Preview your final sketch before it's shipped and request any necessary corrections until you're completely satisfied.",
    image: artbeniwal3,
  },
  {
    id: 4,
    title: "Receive your Artwork",
    desc: "Finalize your payment while your drawing is prepared for delivery. We'll send it with the fastest available option.",
    image: artbeniwal4,
  },
];

export default function HowItWorks() {
  return (
    <>
      {/* Add custom CSS for running border animation */}
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
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: exclude;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          animation: gradientShift 3s ease infinite;
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
      `}</style>

      <section className="py-20 bg-gradient-to-b from-[#f9f6f6] to-[#f3efef] ">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Heading */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#3d2b2b] mb-14 tracking-tight">
            How it works?
          </h2>

          {/* Steps Grid */}
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 mt-5">
            {steps.map((step) => (
              <div
                key={step.id}
                className="running-border shadow-md hover:shadow-2xl transition-all duration-300 p-8 text-center flex flex-col items-center hover:scale-105 transform"
              >
                {/* Image */}
                <div className="relative w-28 h-28 mb-6">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-28 h-28 object-cover rounded-full border-4 border-[#f8f4f4] shadow-md"
                  />
                  <span className="absolute -top-2 -right-2 bg-[#d4a373] text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold shadow-md">
                    {step.id}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-xl text-[#3d2b2b] mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-base leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}