import React from "react";
import { HeartIcon } from "@heroicons/react/24/solid"; 

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[#d4a373] to-[#b9855c] border-t mt-10">
      <div className="container mx-auto py-4 flex flex-col md:flex-row justify-between items-center text-gray-700 px-4">
        <p className="flex items-center gap-1 text-sm md:text-base text-white">
          Made  <HeartIcon className="w-4 h-4 text-red-500" /> by Ayush
        </p>
        <p className="text-sm md:text-base mt-2 md:mt-0 text-white">
          &copy; {currentYear} All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
