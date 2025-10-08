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
    title: "Psicóloga clínica. Creadora y coordinadora general de PsCielo.",
    imageSrc: "/imagenes/professional-1.jpeg",
    bio: `Psicóloga clínica con diez años de ejercicio en la práctica clínica, formada en evaluación, diagnóstico y terapias innovadoras.
Licenciada en Psicología por la Universidad Nacional de Córdoba (MP 9911). 
Máster Internacional en Neuropsicología Clínica Infanto-Juvenil. 
Diplomada Internacional en Terapia Comportamental Contextual, con especialización en DBT, ACT y FAP. 
Diplomada en Trastornos del Espectro Autista a lo largo del ciclo vital (Universidad Favaloro). 

Formación en niñas y mujeres dentro del espectro autista (Universidad CAECE). Posgrado anual de especialización en Terapia Cognitivo-Conductual. Diplomado en Evaluación y Diagnóstico Psicológico.

Posee gran experiencia en el diagnóstico y acompañamiento de personas neurodivergentes, así como en evaluaciones neuropsicológicas y diagnóstico de autismo y TDAH en adolescentes y adultos. Certificada oficialmente en el uso clínico de ADOS-2 (entrenamiento avalado por la Universidad de California, San Francisco). 

Actualmente cursa la Maestría en Psicooncología en la Universidad Favaloro.

A lo largo de su trayectoria ha desarrollado espacios que integran clínica, comunidad y creatividad. 
Concibe la psicología como un puente entre el conocimiento científico y la sensibilidad humana, trabajando con un enfoque integrativo, respetuoso de la diversidad y centrado en las necesidades singulares de cada persona.

Su recorrido se sostiene en la solidez académica, pero también en la convicción de que la psicología necesita humanidad, creatividad y comunidad para transformarse en un verdadero espacio de cuidado.
`
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
    imageSrc: "/imagenes/professional-4.JPEG",
    bio: `Psicóloga con diez años de ejercicio en la práctica clínica, formada en Terapia Cognitivo-Conductual y Terapias Contextuales (Mindfulness y ACT). 
    Cuenta con formación en Neuropsicología Clínica, lo que le permite integrar recursos actualizados para la evaluación, el diagnóstico y la intervención en jóvenes y adultos.
    
    Posee amplia experiencia en procesos de evaluación psicológica y neuropsicológica, acompañando a personas con dificultades cognitivas, emocionales y conductuales, y brindando orientaciones precisas para el abordaje clínico y el fortalecimiento del bienestar.

    Su práctica se centra en combinar la solidez técnica con una mirada cercana y empática, construyendo vínculos terapéuticos basados en el respeto, la confianza y el acompañamiento genuino. 
    Considera que cada proceso clínico requiere escucha activa, sensibilidad y herramientas personalizadas que ayuden a cada persona a desplegar sus recursos y afrontar los desafíos de su vida cotidiana.`
  },
  {
    name: "Lic. Wilson Batista",
    title: "Psicólogo clínico",
    imageSrc: "/imagenes/professional-2.JPEG",
    bio: `Profesor (ISARM-Misiones) y Licenciado en Psicología (UNC) MP 15340. 
    Actualmente se especializa en terapias contextuales o de tercera ola, entre ellas la Terapia Dialéctico Conductual (DBT) y la Terapia de Aceptación y Compromiso (ACT). 
    Durante su formación de grado integró proyectos de investigación y docencia en el Instituto de Investigaciones Psicológicas (IIPsi-UNC), estudiando aspectos vinculados al rendimiento académico e inteligencia en estudiantes universitarios.
    
    Cuenta con experiencia en tratamientos basados en DBT y ACT, así como en el abordaje de adicciones en jóvenes y adultos.
    
    Su práctica profesional está orientada a acompañar procesos de cambio y promover el bienestar psicológico desde un enfoque ético, empático y basado en la evidencia. Considera al vínculo terapéutico como herramienta central de transformación, y busca generar espacios seguros, respetuosos y genuinos para cada persona.`
  },
  {
    name: "Lic. Mauricio Palamedi Nazabal",
    title: "Psicólogo clínico.",
    imageSrc: "/imagenes/professional-5.JPEG",
    bio: `Psicólogo con enfoque integrativo y experiencia en el acompañamiento de jóvenes y adultos en procesos de cambio y crecimiento personal. 
    Su trabajo se orienta a brindar un espacio empático, seguro y flexible, donde cada persona pueda sentirse escuchada, comprendida y contenida.
    
    Aborda problemáticas como ansiedad, ataques de pánico, duelos, separaciones, crisis vitales, terapia de pareja y adaptación a migraciones, siempre desde una perspectiva integral que considera tanto los aspectos emocionales como los contextuales de cada situación. 
    Además, cuenta con formación en evaluaciones psicológicas y realización de aptos psicológicos, ofreciendo informes claros y rigurosos para diferentes fines clínicos y administrativos.
    
    Su objetivo profesional es acompañar a las personas en el proceso de comprender lo que sienten, resignificar sus experiencias y desplegar recursos que les permitan alcanzar una vida más equilibrada y plena. Trabaja desde un enfoque integrativo, respetuoso y cercano, combinando herramientas actualizadas de la psicología con una mirada humana, orientada al cuidado y al bienestar.`
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
            Conoce a Nuestros Profesionales
          </motion.span>
        </motion.h2>
        <p className="font-sans text-base sm:text-lg text-muted-foreground mt-2 md:mt-4 max-w-3xl mx-auto px-2 md:px-0">
          Un equipo dedicado de expertos en salud mental, comprometidos con tu crecimiento y bienestar.
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