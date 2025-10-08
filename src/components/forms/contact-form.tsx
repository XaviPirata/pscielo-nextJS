"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

type FormFields = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

const ENDPOINT = "https://psicodelcielo.com/submit"; // API en tu VPS

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [formMessage, setFormMessage] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setFormMessage("");

    // Tomo valores del formulario
    const fd = new FormData(e.currentTarget);
    const data: FormFields = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      message: String(fd.get("message") || ""),
    };

    // Agrego el identificador de sitio
    const payload = { ...data, source: "pscielo" };

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        // importantísimo: JSON plano
        body: JSON.stringify(payload),
        // no enviamos cookies ni credenciales cruzadas
        credentials: "omit",
        cache: "no-store",
      });

      if (res.ok) {
        setFormMessage("¡Mensaje enviado con éxito! Te responderemos a la brevedad.");
        formRef.current?.reset();
      } else {
        // intento leer el mensaje que devolvió la API (si lo hay)
        let apiMsg = "";
        try {
          const j = await res.json();
          apiMsg = j?.message || "";
        } catch {}
        setFormMessage(
          apiMsg || "Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo."
        );
      }
    } catch (err) {
      // Error de red - mantener en producción para monitoreo
      if (process.env.NODE_ENV === 'development') {
        console.error("Error de red:", err);
      }
      setFormMessage("Error de conexión. No se pudo contactar al servidor.");
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full space-y-4 relative z-20"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Anti-spam muy básico (honeypot) */}
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="relative z-20">
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Nombre"
          required
          className="w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 p-3 focus:ring-2 focus:ring-pink-300 outline-none transition-all"
        />
      </div>

      <div className="relative z-20">
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 p-3 focus:ring-2 focus:ring-pink-300 outline-none transition-all"
        />
      </div>

      <div className="relative z-20">
        <input
          id="phone"
          type="tel"
          name="phone"
          placeholder="Teléfono (opcional)"
          className="w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 p-3 focus:ring-2 focus:ring-pink-300 outline-none transition-all"
        />
      </div>

      <div className="relative z-20">
        <textarea
          id="message"
          name="message"
          placeholder="Mensaje"
          required
          rows={4}
          className="w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 p-3 focus:ring-2 focus:ring-pink-300 outline-none resize-none transition-all"
        />
      </div>

      <div className="pt-1">
        <motion.button
          type="submit"
          whileHover={{ scale: sending ? 1 : 1.03 }}
          className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-gray-900 bg-amber-200 hover:bg-pink-300 transition-all shadow"
          disabled={sending}
        >
          {sending ? "Enviando..." : "Enviar mensaje"}
        </motion.button>

        {formMessage && (
          <p className="mt-3 text-sm font-medium">
            {formMessage}
          </p>
        )}
      </div>
    </motion.form>
  );
}