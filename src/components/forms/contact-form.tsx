"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null); // Referencia segura al formulario

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setFormMessage("");

    const endpoint = "https://psicodelcielo.com/submit";

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const dataWithSource = { ...data, source: "pscielo" };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataWithSource),
      });

      if (response.ok) {
        setFormMessage("¡Mensaje enviado con éxito! Gracias por tu consulta.");
        // Usamos la referencia para resetear, evitando el error
        formRef.current?.reset();
      } else {
        setFormMessage("Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error en el formulario:", error);
      setFormMessage("Error de conexión. No se pudo contactar al servidor.");
    } finally {
      setSending(false);
    }
  };

  // El resto del componente visual es el mismo
  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full space-y-3 sm:space-y-4 pb-4 md:pb-0"
      // ...
    >
      {/* ... tus inputs, textarea y botón ... */}
       <div>
        <input type="text" name="name" placeholder="Nombre" required className="w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-[#F9A8D4] focus:border-[#F9A8D4] outline-none transition-all duration-300" />
      </div>
      <div>
        <input type="email" name="email" placeholder="Email" required className="w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-[#F9A8D4] focus:border-[#F9A8D4] outline-none transition-all duration-300" />
      </div>
      <div>
        <input type="tel" name="phone" placeholder="Teléfono (Opcional)" className="w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-[#F9A8D4] focus:border-[#F9A8D4] outline-none transition-all duration-300" />
      </div>
      <div className="relative z-30">
        <textarea name="message" placeholder="Mensaje" required rows={4} className="w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-[#F9A8D4] focus:border-[#F9A8D4] outline-none resize-none relative z-50 transition-all duration-300"></textarea>
      </div>
      <div className="pt-2 flex flex-col items-start">
        <motion.button type="submit" whileHover={{ scale: 1.05 }} className="w-full sm:w-auto relative inline-block px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-heading text-base sm:text-lg text-[#1d1d1d] bg-[#FDE68A] hover:bg-[#F9A8D4] transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden pulse-glow" disabled={sending}>
          {sending ? "Enviando..." : "Enviar Mensaje"}
        </motion.button>
        {formMessage && <p className="mt-4 text-sm font-semibold">{formMessage}</p>}
      </div>
    </motion.form>
  );
}