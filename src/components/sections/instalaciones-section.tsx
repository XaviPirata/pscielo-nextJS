"use client";

import { motion } from "framer-motion";
import GaleriaInteractiva from "@/components/ui/galeria-interactiva";
import FlyingBirds from "@/components/ui/flying-birds";
import { StarsForSection } from "@/components/ui/animated-stars";

export default function InstalacionesSection() {
  return (
    <section id="instalaciones" className="fondo-nubes-animado relative min-h-screen w-full flex flex-col items-center justify-start py-8 sm:py-12 md:py-16 overflow-hidden">
      {/* Estrellitas animadas - Solo en modo dark */}
      <StarsForSection section="instalaciones" />
      
      {/* Pajaritos volando aleatorios */}
      <FlyingBirds />
      
      {/* Título y Descripción */}
      <motion.div 
        className="text-center mb-8 md:mb-16 max-w-4xl px-4"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2 
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 relative"
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
            Nuestro Espacio Terapéutico
          </motion.span>
        </motion.h2>
        <p className="font-sans text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Un ambiente cálido y profesional diseñado especialmente para tu bienestar. 
          Conoce las instalaciones donde trabajamos juntos hacia tu crecimiento personal.
        </p>
      </motion.div>

      {/* Galería Interactiva */}
      <motion.div 
        className="w-full max-w-7xl px-2 sm:px-4 md:px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        <GaleriaInteractiva />
      </motion.div>

      {/* Texto adicional */}
      <motion.div 
        className="text-center mt-8 md:mt-16 max-w-3xl px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
      </motion.div>
    </section>
  );
} 