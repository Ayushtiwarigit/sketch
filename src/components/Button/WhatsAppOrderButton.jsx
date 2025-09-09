import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppOrderButton({ productId, productName }) {
  const whatsappNumber = "8982893647";
  
  // Default message with optional product info
  const message = productId
    ? `Hello, I want to place an order for ${productName || "this product"} (ID: ${productId}).`
    : "Hello, I want to place an order.";

  const handleClick = () => {
    window.open(
      `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center gap-2 px-6 py-3 
                 bg-gradient-to-r from-[#d4a373] to-[#b9855c] 
                 text-white font-semibold rounded-full 
                 shadow-lg hover:opacity-90 transition-all duration-300"
    >
      <FaWhatsapp size={22} className="text-white" />
      Order Now
    </button>
  );
}
