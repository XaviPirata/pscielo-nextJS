"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { StarsForSection } from "@/components/ui/animated-stars";
import FlyingBirds from "@/components/ui/flying-birds";

// Datos de los servicios
const SERVICIOS = [
  {
    id: 'psicoterapia-individual',
    titulo: 'Psicoterapia individual',
    subtitulo: 'Un espacio para vos, sin juicios ni moldes.',
    descripcion: 'Brindamos procesos de psicoterapia individual basados en la evidencia, centrados en la singularidad de cada persona. Acompañamos desde una mirada comprometida y ética, desde modelos como la terapia cognitivo-conductual y los enfoques contextuales (ACT, FAP, RO-DBT y DBT) según las necesidades y objetivos de cada proceso.',
    video: '/videos/fondoTarjeta1.webm',
    gradiente: 'from-blue-400/20 via-purple-400/10 to-pink-400/20',
    color: '#6366F1'
  },
  {
    id: 'evaluaciones-diagnosticas',
    titulo: 'Evaluaciones y procesos diagnósticos',
    subtitulo: 'Entender lo que te pasa también es una forma de cuidarte.',
    descripcion: 'Ofrecemos evaluaciones clínicas y psicodiagnósticos que permiten comprender con mayor claridad ciertos perfiles, procesos o síntomas. Nuestro enfoque combina entrevistas, observación clínica e instrumentos psicométricos, siempre priorizando el trato respetuoso, informado y personalizado.',
    video: '/videos/fondoTarjeta2.webm',
    gradiente: 'from-emerald-400/20 via-teal-400/10 to-cyan-400/20',
    color: '#10B981'
  },
  {
    id: 'neurodivergencias',
    titulo: 'Neurodivergencias',
    subtitulo: 'No todo lo que es distinto está roto.',
    descripcion: 'Nos especializamos en el acompañamiento y la evaluación de personas neurodivergentes (autismo, TDAH, TOC, altas capacidades, entre otros perfiles). Ofrecemos asesoría prediagnóstica, procesos de orientación y devolución clínica, con perspectiva actualizada y sin patologizar lo diverso.',
    video: '/videos/fondotarjeta3.webm',
    gradiente: 'from-amber-400/20 via-orange-400/10 to-red-400/20',
    color: '#F59E0B'
  },
  {
    id: 'asesoria-prediagnostica',
    titulo: 'Asesoría prediagnóstica',
    subtitulo: 'Cuando hay dudas, también puede haber alivio.',
    descripcion: 'Ofrecemos encuentros breves de orientación diagnóstica para personas que se preguntan si podrían ser neurodivergentes o que buscan comprender mejor lo que les sucede, sin necesidad de iniciar de inmediato un proceso completo de evaluación. Un espacio clínico, respetuoso y sin presiones.',
    video: '/videos/fondoTarjeta4.webm',
    gradiente: 'from-rose-400/20 via-pink-400/10 to-fuchsia-400/20',
    color: '#EC4899'
  },
  {
    id: 'psicooncologia',
    titulo: 'Psicooncología',
    subtitulo: 'Acompañar también es sostener lo que duele.',
    descripcion: 'Diseñamos espacios de cuidado psicológico para personas que atraviesan procesos oncológicos. A través de psicoterapia individual o talleres grupales, ofrecemos recursos para transitar el impacto emocional del diagnóstico, el tratamiento, los cambios vitales y el sentido de la vida en contextos de enfermedad.',
    video: '/videos/fondoTarjeta1.webm',
    gradiente: 'from-violet-400/20 via-purple-400/10 to-indigo-400/20',
    color: '#8B5CF6'
  },
  {
    id: 'talleres-grupales',
    titulo: 'Talleres grupales',
    subtitulo: 'Aprender con otros. Habitarse en vínculo.',
    descripcion: 'Realizamos talleres sobre habilidades sociales, comunicación afectiva, expresión emocional, mindfulness y otros ejes clínicos. Son espacios diseñados para compartir, practicar herramientas y sentirse acompañado, especialmente útiles para quienes experimentan dificultades relacionales o desean trabajar su mundo interno desde lo vincular.',
    video: '/videos/fondoTarjeta3.webm',
    gradiente: 'from-teal-400/20 via-green-400/10 to-emerald-400/20',
    color: '#14B8A6'
  },
  {
    id: 'mindfulness-recursos',
    titulo: 'Mindfulness y recursos para la vida cotidiana',
    subtitulo: 'Herramientas para estar presente, aún en medio del caos.',
    descripcion: 'A través de propuestas prácticas, acercamos técnicas de mindfulness, regulación emocional y autocompasión para integrar en el día a día. Buscamos ofrecer recursos accesibles y efectivos que puedan ser incorporados con autonomía, sin perder profundidad ni sostén clínico.',
    video: '/videos/fondoTarjeta2.webm',
    gradiente: 'from-cyan-400/20 via-blue-400/10 to-indigo-400/20',
    color: '#06B6D4'
  }
];

export default function ServiciosSection() {
  const [servicioActivo, setServicioActivo] = useState(SERVICIOS[0].id);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const cursorLightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detectar móvil
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Efecto de luz que sigue al cursor (solo desktop)
  useEffect(() => {
    if (isMobile || !containerRef.current) return;

    const container = containerRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorLightRef.current) return;
      
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      cursorLightRef.current.style.transform = `translate(${x - 250}px, ${y - 250}px)`;
    };

    const handleMouseEnter = () => {
      if (cursorLightRef.current) {
        cursorLightRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      if (cursorLightRef.current) {
        cursorLightRef.current.style.opacity = '0';
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]);

  const servicioSeleccionado = SERVICIOS.find(s => s.id === servicioActivo) || SERVICIOS[0];

  // Manejar click en móvil
  const handleMobileClick = (servicioId: string) => {
    setExpandedMobile(expandedMobile === servicioId ? null : servicioId);
  };

  // Función para navegar a la sección de contacto
  const scrollToContact = () => {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Versión Desktop
  if (!isMobile) {
    return (
      <section 
        id="servicios" 
        className="fondo-nubes-animado relative min-h-screen w-full overflow-hidden"
        ref={containerRef}
      >
        {/* Estrellitas animadas */}
        <StarsForSection section="servicios" />
        
        {/* Pajaritos volando */}
        <FlyingBirds />

        {/* Efecto de luz que sigue al cursor */}
        <div
          ref={cursorLightRef}
          className="fixed w-[500px] h-[500px] pointer-events-none z-0 opacity-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, ${servicioSeleccionado.color}15, transparent 60%)`,
            borderRadius: '50%',
          }}
        />

        {/* Título principal */}
        <div className="text-center py-16 relative z-10">
          <motion.h2 
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 relative"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
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
            >
              Nuestros Servicios
            </motion.span>
          </motion.h2>
          <motion.p 
            className="font-sans text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Cada camino terapéutico es único. Explorá nuestros enfoques y encontrá el que resuene con vos.
          </motion.p>
        </div>

        {/* Layout asimétrico: Dos columnas */}
        <div className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
          <div className="grid grid-cols-12 gap-12 min-h-[600px]">
            
            {/* Columna Izquierda: Lista Sticky (35%) */}
            <motion.div 
              className="col-span-4 sticky top-32 h-fit"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="bg-white/5 dark:bg-black/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <h3 className="font-heading text-2xl font-bold mb-8 text-center">
                  Elige tu camino
                </h3>
                
                <ul className="space-y-1">
                  {SERVICIOS.map((servicio, index) => (
                    <motion.li
                      key={servicio.id}
                      className={`relative cursor-pointer p-4 rounded-xl transition-all duration-300 ${
                        servicioActivo === servicio.id 
                          ? 'bg-white/10 dark:bg-white/5' 
                          : 'hover:bg-white/5 dark:hover:bg-white/5'
                      }`}
                      onClick={() => setServicioActivo(servicio.id)}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      <span 
                        className={`font-serif text-lg transition-all duration-300 ${
                          servicioActivo === servicio.id 
                            ? 'font-semibold' 
                            : 'font-normal'
                        }`}
                        style={{ 
                          color: servicioActivo === servicio.id ? servicio.color : undefined 
                        }}
                      >
                        {servicio.titulo}
                      </span>
                      
                      {/* Línea animada */}
                      {servicioActivo === servicio.id && (
                        <motion.div 
                          className="absolute bottom-2 left-4 right-4 h-0.5 rounded-full"
                          style={{ backgroundColor: servicio.color }}
                          layoutId="lineaActiva"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Columna Derecha: Contenido (65%) */}
            <div className="col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={servicioActivo}
                  className="h-full"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 1.05 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className={`bg-gradient-to-br ${servicioSeleccionado.gradiente} backdrop-blur-sm rounded-3xl p-8 border border-white/20 h-full flex flex-col`}>
                    
                    {/* Video */}
                    <motion.div 
                      className="relative h-64 mb-8 rounded-2xl overflow-hidden"
                      layoutId={`video-${servicioSeleccionado.id}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <video
                        src={servicioSeleccionado.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </motion.div>

                    {/* Contenido */}
                    <div className="flex-1">
                      <motion.h3 
                        className="font-heading text-3xl font-bold mb-3"
                        style={{ color: servicioSeleccionado.color }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        {servicioSeleccionado.titulo}
                      </motion.h3>
                      
                      <motion.p 
                        className="card-text text-xl font-semibold mb-6 opacity-80"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        {servicioSeleccionado.subtitulo}
                      </motion.p>
                      
                      <motion.p 
                        className="card-text text-base leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        {servicioSeleccionado.descripcion}
                      </motion.p>
                    </div>
                    
                    {/* Botón de contacto */}
                    <motion.div 
                      className="mt-8 flex justify-end"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <motion.button 
                        className="px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm border border-white/20 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        style={{ backgroundColor: `${servicioSeleccionado.color}40` }}
                        onClick={scrollToContact}
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: `${servicioSeleccionado.color}60`,
                          boxShadow: `0 8px 32px ${servicioSeleccionado.color}40`
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Conocer más
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Versión Mobile: Acordeón elevado
  return (
    <section id="servicios" className="fondo-nubes-animado relative min-h-screen w-full py-16 overflow-hidden">
      {/* Estrellitas animadas */}
      <StarsForSection section="servicios" />
      
      {/* Pajaritos volando */}
      <FlyingBirds />

      {/* Título principal */}
      <div className="text-center mb-12 px-4 relative z-10">
        <motion.h2 
          className="font-heading text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-[#F9A8D4] via-[#FDE68A] to-[#F9A8D4] bg-clip-text text-transparent">
            Nuestros Servicios
          </span>
        </motion.h2>
      </div>

      {/* Acordeón móvil */}
      <div className="max-w-2xl mx-auto px-4 space-y-4 relative z-10">
        {SERVICIOS.map((servicio, index) => (
          <motion.div
            key={servicio.id}
            className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Header del acordeón */}
            <motion.div
              className="p-6 cursor-pointer flex justify-between items-center"
              onClick={() => handleMobileClick(servicio.id)}
              whileTap={{ scale: 0.98 }}
            >
              <div>
                <h3 
                  className="font-serif text-lg font-semibold mb-1"
                  style={{ color: servicio.color }}
                >
                  {servicio.titulo}
                </h3>
                <p className="card-text text-sm opacity-70">
                  {servicio.subtitulo}
                </p>
              </div>
              
              <motion.div
                animate={{ rotate: expandedMobile === servicio.id ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ color: servicio.color }}
              >
                <Plus size={24} />
              </motion.div>
            </motion.div>

            {/* Contenido expandible */}
            <AnimatePresence>
              {expandedMobile === servicio.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    {/* Video */}
                    <motion.div 
                      className="relative h-48 mb-4 rounded-xl overflow-hidden"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <video
                        src={servicio.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </motion.div>

                    {/* Descripción */}
                    <motion.p 
                      className="card-text text-sm leading-relaxed mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {servicio.descripcion}
                    </motion.p>

                    {/* Botón de contacto móvil */}
                    <motion.div 
                      className="flex justify-center mt-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <motion.button 
                        className="px-4 py-2 rounded-full text-white text-sm font-semibold bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm border border-white/20 cursor-pointer transition-all duration-300"
                        style={{ backgroundColor: `${servicio.color}40` }}
                        onClick={scrollToContact}
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: `${servicio.color}60`,
                          boxShadow: `0 4px 16px ${servicio.color}40`
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Conocer más
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 