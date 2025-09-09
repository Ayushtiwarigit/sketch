import React from "react";
import bann from '../../../assets/bann.webp';

export default function Banner() {
  return (
    <div className="relative w-full h-[80vh]"> 
      {/* Background Image */}
      <img
        src={bann}
        alt="Banner Background"
        className="w-full h-full object-cover object-center" 
      />

      {/* Centered Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-dark text-4xl md:text-6xl font-bold text-center drop-shadow-lg">
          Welcome to SketchLogo
        </h1>
      </div>
    </div>
  );
}
