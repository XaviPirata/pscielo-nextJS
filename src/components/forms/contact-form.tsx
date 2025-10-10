"use client";

import { useState, useRef, useEffect } from "react";
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
  
  // 🛡️ PROTECCIÓN ANTI-BOT #1: Timestamp de carga del formulario
  const [formLoadTime] = useState<number>(Date.now());
  
  // 🛡️ PROTECCIÓN ANTI-BOT #2: Contador de interacciones
  const [interactionCount, setInteractionCount] = useState(0);
  
  // 🛡️ PROTECCIÓN ANTI-BOT #3: Rate limiting en cliente
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

  // 🛡️ PROTECCIÓN ANTI-BOT #4: Token de sesión único
  const [sessionToken] = useState<string>(() => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  });

  // Incrementar contador cuando el usuario interactúa con los campos
  useEffect(() => {
    const inputs = formRef.current?.querySelectorAll('input, textarea');
    if (!inputs) return;

    const handleInteraction = () => {
      setInteractionCount(prev => prev + 1);
    };

    inputs.forEach(input => {
      input.addEventListener('focus', handleInteraction);
      input.addEventListener('input', handleInteraction);
    });

    return () => {
      inputs.forEach(input => {
        input.removeEventListener('focus', handleInteraction);
        input.removeEventListener('input', handleInteraction);
      });
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 🛡️ VALIDACIÓN #1: Rate Limiting (máximo 1 envío cada 30 segundos)
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    if (timeSinceLastSubmit < 30000) { // 30 segundos
      setFormMessage("Por favor, espera un momento antes de enviar otro mensaje.");
      return;
    }
    
    // 🛡️ VALIDACIÓN #2: Tiempo mínimo en la página (anti-bot rápido)
    const timeOnPage = now - formLoadTime;
    if (timeOnPage < 3000) { // Menos de 3 segundos = bot
      setFormMessage("Por favor, completa el formulario con calma.");
      return;
    }
    
    // 🛡️ VALIDACIÓN #3: Mínimo de interacciones (debe haber interactuado al menos 3 veces)
    if (interactionCount < 3) {
      setFormMessage("Por favor, completa todos los campos del formulario.");
      return;
    }

    setSending(true);
    setFormMessage("");

    // Tomo valores del formulario
    const fd = new FormData(e.currentTarget);
    
    // 🛡️ VALIDACIÓN #4: Honeypot (campo oculto)
    const honeypot = String(fd.get("company") || "");
    if (honeypot) {
      // Bot detectado - hacer como si se enviara pero no enviar nada
      await new Promise(resolve => setTimeout(resolve, 2000));
      setFormMessage("¡Mensaje enviado con éxito! Te responderemos a la brevedad.");
      formRef.current?.reset();
      setSending(false);
      return;
    }

    const data: FormFields = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      message: String(fd.get("message") || ""),
    };

    // 🛡️ VALIDACIÓN #5: Validar longitud de campos (anti-spam)
    if (data.name.length > 100 || data.message.length > 2000) {
      setFormMessage("El mensaje es demasiado largo. Por favor, sé más conciso.");
      setSending(false);
      return;
    }

    // 🛡️ VALIDACIÓN #6: Detectar patrones sospechosos (URLs múltiples, caracteres repetidos)
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const urlMatches = data.message.match(urlPattern) || [];
    if (urlMatches.length > 2) {
      setFormMessage("Mensaje sospechoso detectado. Por favor, evita múltiples enlaces.");
      setSending(false);
      return;
    }

    // Agrego el identificador de sitio + datos de seguridad
    const payload = { 
      ...data, 
      source: "pscielo",
      // 🛡️ ENVIAR DATOS DE SEGURIDAD AL BACKEND
      _security: {
        sessionToken,
        timeOnPage,
        interactionCount,
        timestamp: now,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
      }
    };

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "omit",
        cache: "no-store",
      });

      if (res.ok) {
        setFormMessage("¡Mensaje enviado con éxito! Te responderemos a la brevedad.");
        formRef.current?.reset();
        setLastSubmitTime(now); // Actualizar tiempo del último envío
        setInteractionCount(0); // Resetear contador
      } else {
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
      {/* 🛡️ HONEYPOT AVANZADO - Campo invisible para bots */}
      <input 
        type="text" 
        name="company" 
        className="absolute opacity-0 pointer-events-none" 
        tabIndex={-1} 
        autoComplete="off"
        aria-hidden="true"
      />
      
      {/* 🛡️ HONEYPOT #2 - Timestamp oculto */}
      <input 
        type="hidden" 
        name="_timestamp" 
        value={formLoadTime}
      />

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