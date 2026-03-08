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
    imageWebp: "/imagenes/professional-1.webp",
    bio: `MP 9911

Psicóloga clínica con diez años de ejercicio en la práctica clínica, formada en evaluación, diagnóstico y terapias innovadoras.
Licenciada en Psicología por la Universidad Nacional de Córdoba. 
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
    title: "Co-coordinadora de PsCielo.",
    imageSrc: "/imagenes/professional-3.jpeg",
    imageWebp: "/imagenes/professional-3.webp",
    bio: `MP 8716

    Psicóloga con más de  diez años de ejercicio en la clínica, especialista en Terapia Cognitivo-Conductual y Terapias Contextuales. Acompaña a jóvenes y adultos en diferentes momentos vitales, ofreciendo un espacio de escucha, cuidado y trabajo conjunto. 

    Integra recursos de la TCC, las terapias contextuales (ACT, FAP y DBT) y enfoques actualizados, adaptándose a las necesidades y objetivos de cada persona.

    También cuenta con experiencia en procesos de orientación vocacional, acompañando a jóvenes en la toma de decisiones sobre sus proyectos de estudio y trabajo. Asimismo, ha trabajado en el abordaje de dinámicas familiares, y en el acompañamiento de duelos y crisis vitales, favoreciendo la comunicación, el entendimiento y la construcción de vínculos más saludables
    Su práctica se centra en construir un vínculo terapéutico basado en el respeto, la confianza y el acompañamiento genuino, favoreciendo un espacio seguro para explorar, comprender y desplegar nuevas herramientas para el bienestar.
`,
  },
  {
    name: "Lic. Andrea Ruiz",
    title: "Especialista en Mindfulness y Terapia de Aceptación",
    imageSrc: "/imagenes/professional-4.jpeg",
    bio: `MP 8569

    Psicóloga con diez años de ejercicio en la práctica clínica, formada en Terapia Cognitivo-Conductual y Terapias Contextuales (Mindfulness y ACT). 
    Cuenta con formación en Neuropsicología Clínica, lo que le permite integrar recursos actualizados para la evaluación, el diagnóstico y la intervención en jóvenes y adultos.
    
    Posee amplia experiencia en procesos de evaluación psicológica y neuropsicológica, acompañando a personas con dificultades cognitivas, emocionales y conductuales, y brindando orientaciones precisas para el abordaje clínico y el fortalecimiento del bienestar.

    Su práctica se centra en combinar la solidez técnica con una mirada cercana y empática, construyendo vínculos terapéuticos basados en el respeto, la confianza y el acompañamiento genuino. 
    Considera que cada proceso clínico requiere escucha activa, sensibilidad y herramientas personalizadas que ayuden a cada persona a desplegar sus recursos y afrontar los desafíos de su vida cotidiana.`
  },
  {
    name: "Lic. Wilson Batista",
    title: "Psicólogo clínico",
    imageSrc: "/imagenes/professional-2.jpeg",
    bio: `MP 15340
    
    Profesor (ISARM-Misiones) y Licenciado en Psicología (UNC). 
    Actualmente se especializa en terapias contextuales o de tercera ola, entre ellas la Terapia Dialéctico Conductual (DBT) y la Terapia de Aceptación y Compromiso (ACT). 
    Durante su formación de grado integró proyectos de investigación y docencia en el Instituto de Investigaciones Psicológicas (IIPsi-UNC), estudiando aspectos vinculados al rendimiento académico e inteligencia en estudiantes universitarios.
    
    Cuenta con experiencia en tratamientos basados en DBT y ACT, así como en el abordaje de adicciones en jóvenes y adultos.
    
    Su práctica profesional está orientada a acompañar procesos de cambio y promover el bienestar psicológico desde un enfoque ético, empático y basado en la evidencia. Considera al vínculo terapéutico como herramienta central de transformación, y busca generar espacios seguros, respetuosos y genuinos para cada persona.`
  },
  {
    name: "Lic. Mauricio Palamedi Nazabal",
    title: "Psicólogo clínico.",
    imageSrc: "/imagenes/professional-5.jpeg",
    bio: `MP 13124
    
    Psicólogo con enfoque integrativo y experiencia en el acompañamiento de jóvenes y adultos en procesos de cambio y crecimiento personal. 
    Su trabajo se orienta a brindar un espacio empático, seguro y flexible, donde cada persona pueda sentirse escuchada, comprendida y contenida.
    
    Aborda problemáticas como ansiedad, ataques de pánico, duelos, separaciones, crisis vitales, terapia de pareja y adaptación a migraciones, siempre desde una perspectiva integral que considera tanto los aspectos emocionales como los contextuales de cada situación. 
    Además, cuenta con formación en evaluaciones psicológicas y realización de aptos psicológicos, ofreciendo informes claros y rigurosos para diferentes fines clínicos y administrativos.
    
    Su objetivo profesional es acompañar a las personas en el proceso de comprender lo que sienten, resignificar sus experiencias y desplegar recursos que les permitan alcanzar una vida más equilibrada y plena. Trabaja desde un enfoque integrativo, respetuoso y cercano, combinando herramientas actualizadas de la psicología con una mirada humana, orientada al cuidado y al bienestar.`
  },
  {
    name: "Lic. Rocío N. Lopez Valazza",
    title: "Licenciada en Psicología – Psicoterapeuta cognitivo-conductual.",
    imageSrc: "/imagenes/ROC%C3%8DO%20N.%20LOPEZ%20VALAZZA.jpeg",
    imageWebp: "/imagenes/ROC%C3%8DO%20N.%20LOPEZ%20VALAZZA.webp",
    bio: `MP 13004

Psicoterapeuta cognitivo-conductual.
Especialización en Psicoterapia Cognitiva Integrativa (Fundación Aiglé).
Diplomada en Trastornos de la Conducta Alimentaria (TCC).
Atención a jóvenes y adultos (modalidad online y presencial).`
  },
  {
    name: "Lic. Andrés Murua",
    title: "Terapia de parejas · Terapias contextuales · DBT",
    imageSrc: "/imagenes/LIC.%20ANDRES%20MURUA.jpeg",
    imageWebp: "/imagenes/LIC.%20ANDRES%20MURUA.webp",
    imagePosition: "center 20%",
    bio: `MP 14228

Terapia de parejas desde el enfoque y formación en Terapia Integral de Parejas (IBCT).
Psicólogo formado en terapias contextuales, DBT, intervención en crisis y abordaje de conductas de riesgo.
Trabajo desde un enfoque centrado en la dignidad humana.
Experiencia con personas que sufren de desregulación emocional y problemáticas asociadas. TLP, autolesiones, depresión.
Experiencia en coordinación de grupos terapéuticos para personas con desregulación emocional, adicciones o dificultades comunicativas y sus familiares. Entrenamiento de habilidades.`
  },
  {
    name: "Lic. Carla Lescano",
    title: "Psicología y Danza Movimiento Terapeuta · Enfoque Humanista Gestalt",
    imageSrc: "/imagenes/Carla%20Lescano.jpeg",
    imageWebp: "/imagenes/Carla%20Lescano.webp",
    bio: `MP 11261

Lic. en Psicología y Danza Movimiento Terapeuta.
Enfoque Humanista Gestalt y Neurociencia integrativa.
Psicoterapia en Movimiento.
Atención a personas jóvenes y adultas, individual y grupal.`
  }
];

export default function ProfesionalesSection() {
  const [selectedProfessional, setSelectedProfessional] = useState<typeof professionalsData[0] | null>(null);

  return (
    <section id="profesionales" className="fondo-nubes-animado relative w-full flex flex-col items-center justify-start py-6 sm:py-8 md:justify-center md:min-h-screen md:py-6 p-3 sm:p-4 md:p-6 overflow-hidden">
      {/* Estrellitas animadas - Solo en modo dark */}
      <StarsForSection section="profesionales" />

      {/* Pajaritos volando aleatorios */}
      <FlyingBirds />

      {/* Título y Descripción - Compactos */}
      <motion.div
        className="text-center mb-4 md:mb-6 max-w-4xl"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold relative"
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
        <p className="font-sans text-sm sm:text-base text-muted-foreground mt-1 md:mt-2 max-w-3xl mx-auto px-2 md:px-0">
          Un equipo dedicado de expertos en salud mental, comprometidos con tu crecimiento y bienestar.
        </p>
      </motion.div>

      {/* Desktop: Grid 2 filas × 4 columnas */}
      <div className="w-full max-w-7xl hidden md:grid md:grid-cols-4 gap-3 lg:gap-4 px-2 lg:px-4">
        {professionalsData.map((prof, index) => (
          <motion.div
            key={prof.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.07 }}
            className="w-full aspect-[3/4] max-h-[38vh]"
          >
            <ProfessionalCard
              name={prof.name}
              title={prof.title}
              imageSrc={prof.imageSrc}
              imageWebp={prof.imageWebp}
              imagePosition={prof.imagePosition}
              onClick={() => setSelectedProfessional(prof)}
            />
          </motion.div>
        ))}
      </div>

      {/* Mobile: Grid 2 columnas compacto */}
      <div className="w-full md:hidden grid grid-cols-2 gap-2 px-2">
        {professionalsData.map((prof, index) => (
          <motion.div
            key={prof.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="w-full aspect-[3/4]"
          >
            <ProfessionalCard
              name={prof.name}
              title={prof.title}
              imageSrc={prof.imageSrc}
              imageWebp={prof.imageWebp}
              imagePosition={prof.imagePosition}
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