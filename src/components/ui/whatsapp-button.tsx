"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WhatsAppIcon } from "./whatsapp-icon";

export default function WhatsAppButton() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // TODO: Reemplaza este número con tu número de WhatsApp real, incluyendo el código de país sin el símbolo '+' o ceros iniciales.
  const phoneNumber = "5493518148668";
  const message = "Hola, me gustaría saber más sobre sus servicios.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  // No renderizar hasta que el componente esté montado en el cliente
  if (!isMounted) {
    return null;
  }

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
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