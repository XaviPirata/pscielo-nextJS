"use client";

import { motion } from "framer-motion";
import ParticlesBackground from "@/components/ui/particles-background";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import WalkingBirds from "@/components/ui/walking-birds";
import FlyingBirds from "@/components/ui/flying-birds";
import { StarsForSection } from "@/components/ui/animated-stars";
import Image from "next/image";

export default function QuienesSomosSection() {
  return (
    <section id="quienes-somos" className="fondo-nubes-animado relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
      {/* Fondo de partículas */}
      <ParticlesBackground />
      
      {/* Estrellitas animadas - Solo en modo dark */}
      <StarsForSection section="quienes-somos" />
      
      {/* Pajaritos volando aleatorios */}
      <FlyingBirds />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
        {/* Columna izquierda: Texto */}
        <div className="w-full md:w-1/2 lg:w-5/12 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4 md:gap-6"
          >
            <AnimatedGradientText>
              <motion.h2 
                className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold relative"
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
                  Quiénes Somos
                </motion.span>
              </motion.h2>
            </AnimatedGradientText>
            
            <div className="space-y-4 md:space-y-6">
              <p className="font-sans text-base sm:text-lg md:text-xl text-muted-foreground px-2 md:px-0">
                Pscielo es más que un centro terapéutico: es un espacio que nace del deseo de acompañar vidas con profundidad, rigor y sensibilidad. Un proyecto que entrelaza ciencia y humanidad, clínica y subjetividad, técnica y presencia.
              </p>

              <p className="font-sans text-base sm:text-lg md:text-xl text-muted-foreground px-2 md:px-0">
                Trabajamos desde una psicología basada en la evidencia, integrando la terapia cognitivo-conductual y los enfoques contextuales —como ACT, FAP, RO-DBT y DBT— con una mirada ética y contemporánea.
              </p>

              <p className="font-sans text-base sm:text-lg md:text-xl text-muted-foreground px-2 md:px-0">
                Nuestra práctica se funda en el encuentro, en el cuidado real por quienes consultan, y en una escucha que reconoce la complejidad de cada experiencia.
              </p>

              <p className="font-sans text-base sm:text-lg md:text-xl text-muted-foreground px-2 md:px-0">
                Creemos en una psicoterapia que no impone moldes, sino que habilita caminos. Que no sólo busca aliviar el sufrimiento, sino también acompañar la construcción de una vida con sentido, incluso en medio de la incertidumbre.
              </p>

              <p className="font-sans text-base sm:text-lg md:text-xl text-muted-foreground px-2 md:px-0">
                Desde PsCielo brindamos atención psicológica individual . Tambien contamos con profesionales formados en procesos de evaluación neuropsicológica y evaluación psicológica para personas neurodivergentes, además de talleres grupales que abordan temas como la comunicación afectiva, la expresión emocional, el mindfulness y el acompañamiento en procesos de salud y enfermedad (psicooncología).
              </p>

            </div>
          </motion.div>
        </div>

        {/* Columna derecha: Imagen de la Casona */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: 25 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="w-full md:w-1/2 lg:w-7/12 flex items-center justify-center"
        >
          <div className="relative group">
            {/* Efecto de resplandor de fondo */}
            <motion.div
              className="absolute -inset-8 bg-gradient-to-r from-[#FDE68A]/20 via-[#F9A8D4]/20 to-[#FDE68A]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Contenedor principal de la imagen */}
            <motion.div
              className="relative z-10"
              animate={{
                y: [-8, 8, -8],
                rotate: [-1, 1, -1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                y: -12,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
            >
              {/* Sombra suave */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-black/10 dark:bg-white/10 rounded-full blur-xl opacity-60" />
              
              {/* Imagen principal */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-900/80 dark:to-gray-800/60 p-4 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-2xl">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <Image
                    src="/imagenes/casonaCartoon.png"
                    alt="Casona Pscielo - Nuestro espacio terapéutico"
                    width={600}
                    height={600}
                    className="w-full h-auto object-contain rounded-2xl filter drop-shadow-lg"
                    priority
                  />
                  
                  {/* Overlay sutil con gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 dark:to-black/5 rounded-2xl pointer-events-none" />
                </motion.div>
              </div>
              
              {/* Partículas decorativas flotantes */}
              <motion.div
                className="absolute -top-4 -right-4 w-3 h-3 bg-gradient-to-r from-[#F9A8D4] to-[#FDE68A] rounded-full opacity-70"
                animate={{
                  y: [-10, 10, -10],
                  x: [-5, 5, -5],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-2 h-2 bg-gradient-to-r from-[#FDE68A] to-[#F9A8D4] rounded-full opacity-60"
                animate={{
                  y: [10, -10, 10],
                  x: [5, -5, 5],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
              <motion.div
                className="absolute top-1/3 -left-6 w-1.5 h-1.5 bg-gradient-to-r from-[#F9A8D4] to-[#FDE68A] rounded-full opacity-50"
                animate={{
                  y: [-15, 15, -15],
                  x: [-8, 8, -8],
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Animación de Pajaritos Caminando - Al final de la sección */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <WalkingBirds />
      </div>
    </section>
  );
} 