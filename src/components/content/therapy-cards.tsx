"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TherapyModal, TherapyData } from "@/components/ui/therapy-modal";

const therapyCards: TherapyData[] = [
  {
    title: "Terapia Cognitivo-Conductual",
    src: "/imagenes/Pscielo.png",
    description: "La Terapia Cognitivo-Conductual (TCC) es un enfoque terapéutico basado en la evidencia que se centra en identificar y modificar patrones de pensamiento y comportamiento que contribuyen al malestar emocional. Esta terapia se basa en la premisa de que nuestros pensamientos, emociones y comportamientos están interconectados.",
    benefits: [
      "Reducción significativa de síntomas de ansiedad y depresión",
      "Desarrollo de habilidades de afrontamiento efectivas",
      "Mejora en la autoestima y confianza personal",
      "Herramientas prácticas para manejar situaciones estresantes",
      "Cambios duraderos en patrones de pensamiento negativos"
    ],
    approach: "Utilizamos técnicas estructuradas y orientadas a objetivos, incluyendo reestructuración cognitiva, exposición gradual, y entrenamiento en habilidades de relajación. El trabajo se centra en el aquí y ahora, identificando pensamientos automáticos y creencias disfuncionales.",
    duration: "Típicamente entre 12-20 sesiones, con sesiones semanales de 50 minutos. La duración puede variar según la complejidad del caso y los objetivos terapéuticos."
  },
  {
    title: "Psicoanálisis",
    src: "/imagenes/professional-1.jpeg",
    description: "El psicoanálisis es un método terapéutico profundo que explora el inconsciente para comprender cómo las experiencias pasadas influyen en el comportamiento actual. Se enfoca en traer a la conciencia conflictos reprimidos y patrones relacionales.",
    benefits: [
      "Comprensión profunda de patrones inconscientes",
      "Resolución de conflictos emocionales de larga data",
      "Mejora en las relaciones interpersonales",
      "Mayor autoconocimiento y insight personal",
      "Transformación duradera de la personalidad"
    ],
    approach: "Utilizamos técnicas como la asociación libre, análisis de sueños, y exploración de la transferencia. El proceso permite que emerjan contenidos inconscientes a través de un vínculo terapéutico seguro y contenedor.",
    duration: "Proceso de largo plazo, típicamente 2-4 años con sesiones 1-3 veces por semana. La frecuencia y duración se adaptan a las necesidades individuales del paciente."
  },
  {
    title: "Terapia Sistémica",
    src: "/imagenes/grid/Foto - Casona Pscielo-29.jpg",
    description: "La Terapia Sistémica considera a la persona dentro de su contexto relacional y familiar. Se enfoca en comprender y modificar los patrones de interacción que mantienen los problemas, viendo los síntomas como expresión de dinámicas familiares o de pareja.",
    benefits: [
      "Mejora significativa en la comunicación familiar",
      "Resolución de conflictos relacionales crónicos",
      "Fortalecimiento de vínculos afectivos",
      "Desarrollo de nuevos patrones de interacción saludables",
      "Mayor cohesión y funcionamiento familiar"
    ],
    approach: "Trabajamos con genogramas, esculturas familiares, y técnicas de reestructuración. Se incluye a miembros significativos del sistema cuando es apropiado, focalizando en cambios interaccionales más que individuales.",
    duration: "Entre 10-25 sesiones, con posibilidad de incluir sesiones familiares o de pareja. La duración depende de la complejidad del sistema y los objetivos planteados."
  },
  {
    title: "Mindfulness y Aceptación",
    src: "/imagenes/grid/Foto - Casona Pscielo-42.jpg",
    description: "Las terapias basadas en Mindfulness y Aceptación (como ACT) se centran en desarrollar una relación más flexible con pensamientos y emociones difíciles. En lugar de luchar contra el malestar, se aprende a observarlo con compasión y actuar según valores personales.",
    benefits: [
      "Reducción del estrés y la ansiedad crónica",
      "Mayor regulación emocional y tolerancia al malestar",
      "Desarrollo de compasión hacia uno mismo",
      "Claridad en valores y propósito de vida",
      "Mejora en la concentración y presencia mental"
    ],
    approach: "Integramos prácticas de meditación mindfulness, ejercicios de aceptación, y trabajo con valores. Se enfatiza la experiencia directa más que el análisis, cultivando una actitud de observador compasivo.",
    duration: "Programas estructurados de 8-12 semanas, o procesos individuales de 15-25 sesiones. Incluye práctica diaria de mindfulness y ejercicios entre sesiones."
  },
  {
    title: "Terapia Humanista",
    src: "/imagenes/professional-4.jpeg",
    description: "La Terapia Humanista se centra en el potencial de crecimiento inherente de cada persona. Enfatiza la experiencia subjetiva, la autenticidad y la capacidad natural de autorregulación. Crea un ambiente de aceptación incondicional que facilita el autodescubrimiento.",
    benefits: [
      "Mayor autoaceptación y autoestima genuina",
      "Desarrollo de la autenticidad personal",
      "Mejora en la capacidad de tomar decisiones",
      "Fortalecimiento de la confianza en recursos internos",
      "Crecimiento personal y realización del potencial"
    ],
    approach: "Utilizamos escucha empática, reflejo de sentimientos, y técnicas experienciales. El terapeuta actúa como facilitador del proceso natural de crecimiento, proporcionando un ambiente seguro y no directivo.",
    duration: "Variable según objetivos, típicamente 15-30 sesiones. El ritmo lo marca el propio proceso de crecimiento del consultante, respetando sus tiempos naturales."
  },
  {
    title: "Terapia de Pareja",
    src: "/imagenes/grid/Foto - Casona Pscielo-50.jpg",
    description: "La Terapia de Pareja ayuda a las parejas a mejorar su comunicación, resolver conflictos y fortalecer su vínculo emocional. Se enfoca en patrones de interacción, necesidades no satisfechas y la construcción de una relación más satisfactoria para ambos miembros.",
    benefits: [
      "Mejora significativa en la comunicación de pareja",
      "Resolución constructiva de conflictos recurrentes",
      "Fortalecimiento de la intimidad emocional y física",
      "Desarrollo de herramientas para el manejo de crisis",
      "Renovación del compromiso y la conexión"
    ],
    approach: "Trabajamos con técnicas de comunicación asertiva, identificación de ciclos negativos, y ejercicios de reconexión emocional. Se abordan tanto aspectos individuales como dinámicas relacionales específicas.",
    duration: "Entre 12-20 sesiones con ambos miembros de la pareja. Puede incluir algunas sesiones individuales cuando sea terapéuticamente indicado."
  }
];

// Componente con efecto Glow sutil y funcionalidad de modal
export default function TherapyCards() {
  const [selectedTherapy, setSelectedTherapy] = useState<TherapyData | null>(null);

  const handleCardClick = (therapy: TherapyData) => {
    setSelectedTherapy(therapy);
  };

  const handleCloseModal = () => {
    setSelectedTherapy(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-2 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto px-4 md:px-8 w-full">
        {therapyCards.map((card, index) => (
          <motion.div
            key={card.title}
            className="group relative cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            animate={{ y: [-2, 2, -2] }}
            whileHover={{ 
              scale: 1.05,
              y: -8,
              rotate: index % 2 === 0 ? 1 : -1,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            style={{
              animation: `float 3s ease-in-out infinite`,
              animationDelay: `${index * 0.5}s`
            }}
            onClick={() => handleCardClick(card)}
            layoutId={`therapy-card-container-${card.title}`}
          >
            {/* Capa de Brillo (Glow Effect) - Restaurada */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#FDE68A] to-[#E2D9E2] rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-lg pointer-events-none"></div>
            
            {/* Tarjeta Principal con z-index superior */}
            <div className="relative z-10 h-full w-full">
              <div className="rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-32 sm:h-40 md:h-64 w-full transition-all duration-300 ease-out">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.src}
                  alt={card.title}
                  className="object-cover absolute inset-0 w-full h-full"
                />
                <div className="absolute inset-0 bg-black/50 flex items-end py-2 sm:py-4 md:py-8 px-2 sm:px-3 md:px-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <div className="card-text text-sm sm:text-base md:text-xl lg:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
                    {card.title}
                  </div>
                </div>
                
                {/* Indicador de click */}
                <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <TherapyModal
        therapy={selectedTherapy}
        onClose={handleCloseModal}
      />
    </>
  );
}