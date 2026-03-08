"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WhatsAppIcon } from "./whatsapp-icon";

export default function WhatsAppButton() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // TODO: Reemplaza este número con tu número de WhatsApp real.
  const phoneNumber = "5493518148668";
  const message = "Hola, me gustaría saber más sobre sus servicios.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  // Función de tracking para GTM
  const handleWhatsAppClick = () => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "whatsapp_click",
        click_url: whatsappUrl,
        click_text: "WhatsApp Button",
        timestamp: Date.now(),
      });
    }
  };

  // No renderizar hasta que el componente esté montado en el cliente
  if (!isMounted) {
    return null;
  }

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleWhatsAppClick}
      className="fixed right-4 bottom-8 md:bottom-6 md:right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] transition-colors duration-300 rounded-full p-2 md:p-3 shadow-lg flex items-center justify-center text-white"
      initial={{ scale: 0, y: 100 }}
      animate={{
        scale: 1,
        y: [0, -15, 0],
        transition: {
          scale: { delay: 0.5, type: "spring", stiffness: 200, damping: 20 },
          y: {
            delay: 1.5,
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "loop",
          },
        },
      }}
      whileHover={{ scale: 1.15, y: -5, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.95 }}
    >
      <WhatsAppIcon className="w-8 h-8 md:w-9 md:h-9" />
    </motion.a>
  );
} 