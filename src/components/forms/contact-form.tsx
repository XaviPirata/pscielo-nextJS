"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    // Fake delay to simulate sending
    setTimeout(() => {
      setSending(false);
      alert("¡Mensaje enviado! (simulado)");
      e.currentTarget.reset();
    }, 1500);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full space-y-3 sm:space-y-4 pb-4 md:pb-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          required
          className="w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-[#F9A8D4] focus:border-[#F9A8D4] outline-none transition-all duration-300"
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-[#F9A8D4] focus:border-[#F9A8D4] outline-none transition-all duration-300"
        />
      </div>
      <div>
        <input
          type="tel"
          name="phone"
          placeholder="Teléfono"
          className="w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-[#F9A8D4] focus:border-[#F9A8D4] outline-none transition-all duration-300"
        />
      </div>
      <div className="relative z-30">
        <textarea
          name="message"
          placeholder="Mensaje"
          required
          rows={4}
          className="w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-[#F9A8D4] focus:border-[#F9A8D4] outline-none resize-none relative z-50 transition-all duration-300"
          style={{ 
            pointerEvents: 'auto',
            position: 'relative',
            zIndex: 50
          }}
        ></textarea>
      </div>
      <div className="pt-2">
        <motion.button
          type="submit"
          whileHover={{ 
            scale: 1.08,
            rotateZ: -1,
            transition: { 
              duration: 0.2, 
              ease: "easeOut",
              type: "spring",
              stiffness: 300
            }
          }}
          animate={{
            rotateZ: [0, 0.5, 0, -0.5, 0],
            scale: [1, 1.02, 1, 1.02, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            type: "tween"
          }}
          style={{
            transformOrigin: "center",
            willChange: "transform"
          }}
          className="w-full sm:w-auto relative inline-block px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-heading text-base sm:text-lg text-[#1d1d1d] bg-[#FDE68A] hover:bg-[#F9A8D4] transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden pulse-glow"
          disabled={sending}
        >
          {sending ? "Enviando..." : "Enviar Mensaje"}
        </motion.button>
      </div>
    </motion.form>
  );
} 