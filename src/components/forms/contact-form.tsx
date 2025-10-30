"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";

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
  
  // 🛡️ TURNSTILE: Token de verificación
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [turnstileStatus, setTurnstileStatus] = useState<string>("Inicializando verificación de seguridad...");
  const [turnstileWidgetKey, setTurnstileWidgetKey] = useState(0);
  const turnstileRetryTimeout = useRef<number | null>(null);
  
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

  // Preconexión al dominio de Cloudflare para acelerar la carga del widget
  useEffect(() => {
    const ensureLink = (rel: string, href: string) => {
      if (typeof document === "undefined") return;
      const selector = `link[rel="${rel}"][href="${href}"]`;
      if (!document.head.querySelector(selector)) {
        const link = document.createElement("link");
        link.rel = rel;
        link.href = href;
        document.head.appendChild(link);
      }
    };

    ensureLink("preconnect", "https://challenges.cloudflare.com");
    ensureLink("dns-prefetch", "https://challenges.cloudflare.com");

    return () => {
      if (turnstileRetryTimeout.current) {
        window.clearTimeout(turnstileRetryTimeout.current);
        turnstileRetryTimeout.current = null;
      }
    };
  }, []);

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

  const scheduleWidgetReload = useCallback((delay = 1500) => {
    if (turnstileRetryTimeout.current) {
      window.clearTimeout(turnstileRetryTimeout.current);
    }
    turnstileRetryTimeout.current = window.setTimeout(() => {
      setTurnstileToken("");
      setTurnstileReady(false);
      setTurnstileStatus("Reintentando verificación de seguridad...");
      setTurnstileWidgetKey(prev => prev + 1);
      turnstileRetryTimeout.current = null;
    }, delay);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 🛡️ VALIDACIÓN #0: Cloudflare Turnstile Token (MÁXIMA PRIORIDAD)
    if (!turnstileToken) {
      setFormMessage("Por favor, espera un momento mientras validamos tu sesión de seguridad.");
      return;
    }
    
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
      // 🛡️ CLOUDFLARE TURNSTILE TOKEN
      turnstileToken,
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
        // 🚀 Notificar a Google Tag Manager con TODAS las variables
        if (typeof window !== 'undefined') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).dataLayer = (window as any).dataLayer || [];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).dataLayer.push({
            event: "form_submit",
            form_id: "contact-form-pscielo",
            form_name: "Contacto PsCielo",
            form_target: "_self",
            form_text: "Enviando...",
            form_url: window.location.href,
            form_status: "success",
            timestamp: Date.now(),
          });
        }

        setFormMessage("¡Mensaje enviado con éxito! Te responderemos a la brevedad.");
        formRef.current?.reset();
        setLastSubmitTime(now);
        setInteractionCount(0);
        setTurnstileToken("");
        setTurnstileReady(false);
        setTurnstileStatus("Validación completada. Preparando una nueva sesión de seguridad...");
        scheduleWidgetReload(1000);
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

  const handleTurnstileSuccess = useCallback((token: string) => {
    setTurnstileToken(token);
    setTurnstileReady(true);
    setTurnstileStatus("Verificación completada correctamente.");
  }, []);

  const handleTurnstileError = useCallback((errorCode?: string) => {
    if (process.env.NODE_ENV === "development") {
      console.error("Turnstile error", errorCode);
    }
    setTurnstileToken("");
    setTurnstileReady(false);
    setTurnstileStatus("No pudimos validar la seguridad. Reintentando...");
    scheduleWidgetReload();
  }, [scheduleWidgetReload]);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken("");
    setTurnstileReady(false);
    setTurnstileStatus("La verificación caducó. Renovando token...");
    scheduleWidgetReload(500);
  }, [scheduleWidgetReload]);

  return (
    <motion.form
      id="contact-form-pscielo"
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

      {/* 🛡️ CLOUDFLARE TURNSTILE - Verificación anti-bot */}
      <div className="relative z-20 flex flex-col items-center gap-3 text-center">
        <div className="relative w-full max-w-[320px]">
          {!turnstileReady && (
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white/80 p-4 text-sm text-gray-600 shadow-sm">
              <span className="mb-2 inline-flex h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-b-transparent" aria-hidden="true" />
              {turnstileStatus}
            </div>
          )}
          <Turnstile
            key={turnstileWidgetKey}
            siteKey="0x4AAAAAAB6OCiGsQXF5yb3e"
            onSuccess={handleTurnstileSuccess}
            onError={handleTurnstileError}
            onExpire={handleTurnstileExpire}
            onWidgetLoad={() => {
              setTurnstileStatus("Listo para verificar seguridad.");
              setTurnstileReady(true);
            }}
            options={{
              appearance: "always",
              retry: "auto",
              retryInterval: 3000,
              refreshExpired: "auto",
              refreshTimeout: "auto",
              feedbackEnabled: false,
              theme: "auto",
              size: "normal"
            }}
            scriptOptions={{
              defer: false,
              async: true,
              appendTo: "head",
              onError: () => handleTurnstileError("script-load"),
              id: "cf-turnstile-script"
            }}
            className={`transition-opacity duration-300 ${turnstileReady ? "opacity-100" : "opacity-0"}`}
          />
        </div>
        <p className="text-sm" aria-live="polite">
          {turnstileStatus}
        </p>
      </div>

      <div className="pt-1">
        <motion.button
          type="submit"
          whileHover={{ scale: sending ? 1 : 1.03 }}
          className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-gray-900 bg-amber-200 hover:bg-pink-300 transition-all shadow disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={sending || !turnstileToken}
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