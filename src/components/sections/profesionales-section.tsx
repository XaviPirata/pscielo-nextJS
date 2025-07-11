"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProfessionalCard } from "@/components/content/professional-card";
import { ProfessionalModal } from "@/components/ui/professional-modal";
import FlyingBirds from "@/components/ui/flying-birds";
import { StarsForSection } from "@/components/ui/animated-stars";

const professionalsData = [
  {
    name: "Lic. Rocio Del Cielo Barros",
    title: "Psicóloga clínica experta en evaluación, diagnóstico y terapias innovadoras",
    imageSrc: "/imagenes/professional-1.jpg",
    bio: `Licenciada en psicología en universidad nacional de Córdoba.
Mter. internacional en neuropsicología clínica.
Diplomado internacional en terapia comportamental contextual. Con especialidad en DBT y ACT. FAP.
Diplomado en trastornos del espectro autista a lo largo del ciclo vital.
Programa de formación en niñas y mujeres dentro del espectro autista.
Posgrado de especialización anual en terapia cognitivo conductual.
Diplomado en evaluación y diagnóstico psicológico.
Evaluaciones neuropsicológicas.
Diagnóstico de Autismo en niños, adolescentes y adultos. Certificada para uso clínico en ADOS2. Otorgado por entrenadora certificada Carmen Ruiz Moreno Formadora de ADOS2 por la universidad de California, San Francisco, STAR Center. EEUU.`
  },
  {
    name: "Lic.Melina Hasicic",
    title: "Especializada en Psicoterapias Conductuales Contextuales",
    imageSrc: "/imagenes/professional-2.jpeg",
    bio: `Psicóloga, egresada de la Universidad Nacional de Córdoba. Especializada en Psicoterapias Conductuales Contextuales, trabaja con modelos como la Terapia de Aceptación y Compromiso (ACT) y Mindfulness. 
    
    Su trabajo se basa en acompañar a las personas a desarrollar mayor flexibilidad psicológica, aprender a relacionarse de manera constructiva con sus pensamientos y emociones, y desarrollar una vida con sentido, alineada con lo que realmente valoran.`
  },
  {
    name: "Lic.María Laura Teillagorry",
    title: "Especialista en terapia cognitivo-conductual, terapias contextuales",
    imageSrc: "/imagenes/professional-3.jpeg",
    bio: `Psicóloga.
Acompaña a jóvenes y adultos en diferentes momentos de su recorrido vital, ofreciendo un espacio de escucha, cuidado y trabajo conjunto. Cada proceso es único, y por eso integra distintas herramientas terapéuticas que permiten adaptarse a las necesidades, los tiempos y los objetivos de cada persona.

Su formación se basa en la terapia cognitivo-conductual, las terapias contextuales (ACT, FAP y DBT) y enfoques actualizados que brindan recursos concretos para afrontar dificultades emocionales, vinculares, transiciones vitales o situaciones de malestar.

Laura cree en la importancia de construir un vínculo terapéutico basado en el respeto, la confianza y el acompañamiento genuino, generando un espacio seguro donde cada persona pueda explorar, comprenderse y desplegar nuevas herramientas para su bienestar.`,
  },
  {
    name: "Lic. Andrea Ruiz",
    title: "Especialista en Mindfulness y Terapia de Aceptación",
    imageSrc: "/imagenes/professional-4.jpeg",
    bio: "Especializada en terapias contextuales ( terapia de aceptación y compromiso y mindfulness) y terapia cognitivo conductual."
  },
  {
    name: "Lic. Lucila Gondra",
    title: "Psicóloga en ACT y Psicooncología: acompañamiento empático.",
    imageSrc: "/imagenes/professional-5.jpeg",
    bio: `Me formé como psicóloga en la Universidad de Mendoza, sede Río Cuarto, y me especialicé en Terapias Contextuales, en particular en la Terapia de Aceptación y Compromiso (ACT), un enfoque que busca ayudar a las personas a desarrollar una vida con sentido, aprendiendo a relacionarse de forma más flexible con sus pensamientos y emociones difíciles.

Además, me formé en Psicooncología, acompañando a pacientes con diagnóstico oncológico y a sus familias en distintas etapas del proceso.

Trabajo desde una mirada cálida, empática y centrada en la singularidad de cada persona. Acompaño a quienes atraviesan momentos de crisis, cambios vitales o desean conocerse más profundamente, siempre respetando sus tiempos, valores y objetivos.

Creo profundamente en el valor del encuentro terapéutico como espacio de cuidado, autenticidad y transformación.`
  }
];

export default function ProfesionalesSection() {
  const [selectedProfessional, setSelectedProfessional] = useState<typeof professionalsData[0] | null>(null);

  return (
    <section id="profesionales" className="fondo-nubes-animado relative min-h-screen w-full flex flex-col items-center justify-start py-8 sm:py-12 md:justify-center md:py-8 p-4 sm:p-6 md:p-8 overflow-hidden">
      {/* Estrellitas animadas - Solo en modo dark */}
      <StarsForSection section="profesionales" />
      
      {/* Pajaritos volando aleatorios */}
      <FlyingBirds />
      
      {/* Título y Descripción */}
      <motion.div 
        className="text-center mb-6 md:mb-12 max-w-4xl"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
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
            Conoce a Nuestras Profesionales
          </motion.span>
        </motion.h2>
        <p className="font-sans text-base sm:text-lg text-muted-foreground mt-2 md:mt-4 max-w-3xl mx-auto px-2 md:px-0">
          Un equipo dedicado de expertas en salud mental, comprometidas con tu crecimiento y bienestar.
        </p>
      </motion.div>

      {/* Grid de Tarjetas - Mobile en columna vertical */}
      <div className="w-full max-w-7xl flex flex-col md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 px-2 sm:px-4 md:px-0">
        {professionalsData.map((prof, index) => (
          <motion.div 
            key={prof.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="w-full max-w-sm mx-auto md:max-w-none"
          >
            <ProfessionalCard
              name={prof.name}
              title={prof.title}
              imageSrc={prof.imageSrc}
              layoutId={`card-container-${prof.name}`}
              onClick={() => setSelectedProfessional(prof)}
            />
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <ProfessionalModal
        professional={selectedProfessional}
        onClose={() => setSelectedProfessional(null)}
      />
    </section>
  );
} 