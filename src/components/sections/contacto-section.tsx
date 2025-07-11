"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/forms/contact-form";
import BallPitBackground from "@/components/ui/ball-pit-background";
import BirdsAnimation from "@/components/ui/birds-animation";
import { StarsForSection } from "@/components/ui/animated-stars";

export default function ContactoSection() {
  return (
    <section id="contacto" className="fondo-nubes-animado relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
      {/* Estrellitas animadas - Solo en modo dark */}
      <StarsForSection section="contacto" />
      
      {/* Fondo de nubes animadas */}
      <BallPitBackground />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-16 w-full max-w-6xl">
        {/* Columna Izquierda: Texto y Mapa (Arriba en mobile) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4 md:space-y-6 order-1 lg:order-1"
        >
          <motion.h2 
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className="relative inline-block bg-gradient-to-r from-[#F9A8D4] via-[#FDE68A] to-[#F9A8D4] bg-clip-text text-transparent bg-[length:200%_100%] [-webkit-text-stroke:0.8px_rgba(0,0,0,0.2)] dark:[-webkit-text-stroke:0px]"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                filter: "drop-shadow(0 0 8px rgba(249, 168, 212, 0.3))",
              }}
              whileHover={{
                scale: 1.05,
                filter: "drop-shadow(0 0 16px rgba(249, 168, 212, 0.5))",
                transition: { duration: 0.3 },
              }}
            >
              Contacto
            </motion.span>
          </motion.h2>

          <div className="space-y-3 md:space-y-4">
            <p className="font-sans text-base md:text-lg">
              Dirección:
              <br />Independencia 366, Cordoba, Argentina
            </p>
            <p className="font-sans text-base md:text-lg">
              Email:
              <br />pscieloespacioterapeutico@gmail.com
            </p>
            <p className="font-sans text-base md:text-lg">
              Teléfono:
              <br />+54 (351) 8148668
            </p>
          </div>

          {/* Contenedor del Mapa con Animación de Pajaritos */}
          <div className="relative mt-6 md:mt-8">
            {/* Animación de Pajaritos - Posicionada para que se apoyen sobre el mapa */}
            <div className="absolute -top-22.5 left-40 w-full h-24 z-20 overflow-visible">
              <BirdsAnimation />
            </div>
            
            {/* Mapa */}
            <iframe
              title="Mapa"
              src="https://maps.google.com/maps?q=Independencia%20366%20C%C3%B3rdoba%20Argentina&z=16&output=embed"
              loading="lazy"
              className="w-full h-48 sm:h-56 md:h-64 rounded-2xl grayscale transition-all duration-500 hover:grayscale-0 border-none relative z-10"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>

        {/* Columna Derecha: Formulario (Abajo en mobile) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 lg:order-2 mt-8 lg:mt-0"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
} 