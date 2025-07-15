"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, PanInfo } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

// Array de imágenes con layouts dinámicos y efectos
const IMAGENES = [
  { 
    src: "/imagenes/grid/Foto - Casona Pscielo-5.jpg", 
    alt: "Recepción principal del consultorio",
    layout: "tall", // 2x3
    mask: "linear-gradient(135deg, rgba(139, 69, 19, 0.3), rgba(222, 184, 135, 0.2))"
  },
  { 
    src: "/imagenes/grid/Foto - Casona Pscielo-7.jpg", 
    alt: "Sala de espera cómoda y acogedora",
    layout: "wide", // 3x2
    mask: "linear-gradient(45deg, rgba(60, 179, 113, 0.25), rgba(144, 238, 144, 0.15))"
  },
  { 
    src: "/imagenes/grid/Foto - Casona Pscielo-8.jpg", 
    alt: "Consultorio privado para terapia individual",
    layout: "square",
    mask: "linear-gradient(180deg, rgba(70, 130, 180, 0.3), rgba(173, 216, 230, 0.2))"
  },
  { 
    src: "/imagenes/grid/Foto - Casona Pscielo-9.jpg", 
    alt: "Espacio de relajación y mindfulness",
    layout: "square",
    mask: "linear-gradient(90deg, rgba(218, 165, 32, 0.25), rgba(255, 248, 220, 0.15))"
  },
  { 
    src: "/imagenes/grid/Foto - Casona Pscielo-13.jpg", 
    alt: "Área de consulta familiar",
    layout: "wide",
    mask: "linear-gradient(225deg, rgba(199, 21, 133, 0.2), rgba(255, 182, 193, 0.15))"
  },  
  { 
    src: "/imagenes/grid/Foto - Casona Pscielo-14.jpg", 
    alt: "Consultorio especializado en terapia cognitiva",
    layout: "tall",
    mask: "linear-gradient(315deg, rgba(75, 0, 130, 0.25), rgba(221, 160, 221, 0.18))"
  },
  { 
    src: "/imagenes/grid/Foto - Casona Pscielo-24.jpg", 
    alt: "Zona de actividades grupales",
    layout: "square",
    mask: "linear-gradient(135deg, rgba(255, 140, 0, 0.3), rgba(255, 239, 213, 0.2))"
  },
  { 
    src: "/imagenes/grid/Foto - Casona Pscielo-28.jpg", 
    alt: "Sala de evaluación neuropsicológica",
    layout: "wide",
    mask: "linear-gradient(45deg, rgba(0, 100, 0, 0.25), rgba(240, 255, 240, 0.15))"
  },
  { 
    src: "/imagenes/grid/Foto - Casona Pscielo-29.jpg", 
    alt: "Espacio de terapia para adolescentes",
    layout: "square",
    mask: "linear-gradient(270deg, rgba(220, 20, 60, 0.25), rgba(255, 228, 225, 0.15))"
  },
  { 
    src: "/imagenes/grid/Foto - Casona Pscielo-31.jpg", 
    alt: "Área de descanso entre sesiones",
    layout: "tall",
    mask: "linear-gradient(180deg, rgba(95, 158, 160, 0.3), rgba(175, 238, 238, 0.2))"
  },
  { 
    src: "/imagenes/grid/Foto - Casona Pscielo-33.jpg", 
    alt: "Consultorio con vista al jardín",
    layout: "wide",
    mask: "linear-gradient(0deg, rgba(34, 139, 34, 0.25), rgba(144, 238, 144, 0.15))"
  },
  { 
    src: "/imagenes/grid/Foto - Casona Pscielo-40.jpg", 
    alt: "Entrada principal del centro terapéutico",
    layout: "square",
    mask: "linear-gradient(90deg, rgba(139, 0, 139, 0.25), rgba(238, 130, 238, 0.18))"
  },
  { 
    src: "/imagenes/grid/Foto - Casona Pscielo-42.jpg", 
    alt: "Pasillo principal con iluminación natural",
    layout: "tall",
    mask: "linear-gradient(45deg, rgba(184, 134, 11, 0.3), rgba(255, 248, 220, 0.2))"
  },
  { 
    src: "/imagenes/grid/Foto - Casona Pscielo-46.jpg", 
    alt: "Sala de reuniones y supervisión",
    layout: "square",
    mask: "linear-gradient(135deg, rgba(205, 92, 92, 0.25), rgba(255, 182, 193, 0.15))"
  },
  { 
    src: "/imagenes/grid/Foto - Casona Pscielo-49.jpg", 
    alt: "Espacio de terapia de aceptación y compromiso",
    layout: "wide",
    mask: "linear-gradient(225deg, rgba(72, 61, 139, 0.25), rgba(230, 230, 250, 0.18))"
  },
  { 
    src: "/imagenes/grid/Foto - Casona Pscielo-50.jpg", 
    alt: "Área de recursos bibliográficos",
    layout: "square",
    mask: "linear-gradient(315deg, rgba(160, 82, 45, 0.3), rgba(245, 222, 179, 0.2))"
  },
  { 
    src: "/imagenes/grid/Foto - Casona Pscielo-52.jpg", 
    alt: "Consultorio de psicooncología",
    layout: "tall",
    mask: "linear-gradient(180deg, rgba(106, 90, 205, 0.25), rgba(221, 160, 221, 0.15))"
  },
  { 
    src: "/imagenes/grid/Foto - Casona Pscielo-53.jpg", 
    alt: "Zona exterior y jardín terapéutico",
    layout: "wide",
    mask: "linear-gradient(90deg, rgba(107, 142, 35, 0.25), rgba(154, 205, 50, 0.15))"
  },
  { 
    src: "/imagenes/grid/Foto - Casona Pscielo-57.jpg", 
    alt: "Vista panorámica de las instalaciones",
    layout: "square",
    mask: "linear-gradient(45deg, rgba(30, 144, 255, 0.3), rgba(135, 206, 250, 0.2))"
  }
];

type GaleriaInteractivaProps = {
  className?: string;
};



export default function GaleriaInteractiva({ className }: GaleriaInteractivaProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>(new Array(IMAGENES.length).fill(false));
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Estado específico para carrousel móvil
  const [currentSlide, setCurrentSlide] = useState(0);
  const dragX = useMotionValue(0);
  
  // Detectar móvil
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const imagesPerPage = 10; // 2 filas x 5 columnas
  const totalPages = Math.ceil(IMAGENES.length / imagesPerPage);
  const startIndex = currentPage * imagesPerPage;
  const currentImages = IMAGENES.slice(startIndex, startIndex + imagesPerPage);

  const navigateImage = useCallback((direction: number) => {
    if (selectedImage === null) return;
    const newIndex = selectedImage + direction;
    if (newIndex >= 0 && newIndex < IMAGENES.length) {
      setSelectedImage(newIndex);
    }
  }, [selectedImage]);

  // Cerrar con tecla Escape y navegación + Ocultar dock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "ArrowLeft") navigateImage(-1);
      if (e.key === "ArrowRight") navigateImage(1);
    };

    if (selectedImage !== null) {
      document.addEventListener("keydown", handleKeyDown);
      
      // Bloquear scroll de la página de fondo
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      
      // Ocultar dock flotante
      const dock = document.querySelector('[data-dock]');
      const whatsapp = document.querySelector('a[href*="wa.me"]');
      if (dock) (dock as HTMLElement).style.display = 'none';
      if (whatsapp) (whatsapp as HTMLElement).style.display = 'none';
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      
      // Restaurar scroll de la página
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
      
      // Restaurar dock flotante
      const dock = document.querySelector('[data-dock]');
      const whatsapp = document.querySelector('a[href*="wa.me"]');
      if (dock) (dock as HTMLElement).style.display = '';
      if (whatsapp) (whatsapp as HTMLElement).style.display = '';
    };
  }, [selectedImage, navigateImage]);

  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Funciones para carrousel móvil
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % IMAGENES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + IMAGENES.length) % IMAGENES.length);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      prevSlide();
    } else if (info.offset.x < -threshold) {
      nextSlide();
    }
  };

  // RENDERIZADO PARA MÓVIL - Carrousel moderno
  if (isMobile) {
    return (
      <>
        <div className="relative w-full px-4">
          {/* Carrousel Container */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-black/10 backdrop-blur-sm border border-white/20">
            {/* Imagen Principal */}
            <motion.div
              className="relative h-[60vh] w-full cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              style={{ x: dragX }}
            >
              <Image
                src={IMAGENES[currentSlide].src}
                alt={IMAGENES[currentSlide].alt}
                fill
                className="object-cover"
                sizes="100vw"
                priority
                onClick={() => setSelectedImage(currentSlide)}
              />
              
              {/* Overlay con gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Información de la imagen */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="card-text text-lg font-semibold mb-2 drop-shadow-lg">
                  {IMAGENES[currentSlide].alt}
                </h3>
                <p className="card-text text-sm opacity-80">
                  {currentSlide + 1} de {IMAGENES.length}
                </p>
              </div>
            </motion.div>

            {/* Indicador de swipe */}
            <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-white text-xs">Desliza →</span>
            </div>
          </div>

          {/* Controles */}
          <div className="flex justify-between items-center mt-6">
            {/* Botón Anterior */}
            <motion.button
              onClick={prevSlide}
              className="w-12 h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={20} />
            </motion.button>

            {/* Indicadores de puntos */}
            <div className="flex space-x-2">
              {IMAGENES.slice(0, Math.min(5, IMAGENES.length)).map((_, index) => {
                const actualIndex = currentSlide >= IMAGENES.length - 2 
                  ? IMAGENES.length - 5 + index 
                  : Math.max(0, currentSlide - 2) + index;
                
                return (
                  <motion.button
                    key={actualIndex}
                    onClick={() => setCurrentSlide(actualIndex)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      actualIndex === currentSlide 
                        ? 'bg-[#F9A8D4] scale-150' 
                        : 'bg-white/40'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                );
              })}
            </div>

            {/* Botón Siguiente */}
            <motion.button
              onClick={nextSlide}
              className="w-12 h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>

          {/* Thumbnails */}
          <div className="mt-6 flex space-x-3 overflow-x-auto pb-2">
            {IMAGENES.map((imagen, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden ${
                  index === currentSlide ? 'ring-2 ring-[#F9A8D4]' : ''
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={imagen.src}
                  alt={imagen.alt}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
                {index === currentSlide && (
                  <div className="absolute inset-0 bg-[#F9A8D4]/20" />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Modal para imagen completa */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="relative w-full h-full flex items-center justify-center p-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={IMAGENES[selectedImage].src}
                  alt={IMAGENES[selectedImage].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
                
                {/* Botón cerrar */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
                >
                  <X size={20} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // RENDERIZADO PARA DESKTOP - Grid original
  return (
    <>
      {/* Grid 2x5 con navegación */}
      <div className={`relative w-full max-w-6xl mx-auto px-4 ${className}`}>
        
        {/* Flechas de navegación */}
        {currentPage > 0 && (
          <button
            onClick={prevPage}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/40 hover:bg-black/60 backdrop-blur-lg rounded-full flex items-center justify-center transition-all duration-300 text-white hover:scale-110 border border-white/20"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        {currentPage < totalPages - 1 && (
          <button
            onClick={nextPage}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/40 hover:bg-black/60 backdrop-blur-lg rounded-full flex items-center justify-center transition-all duration-300 text-white hover:scale-110 border border-white/20"
          >
            <ChevronRight size={24} />
          </button>
        )}
        
        {/* Grid 2 filas x 5 columnas */}
        <div className="grid grid-cols-5 grid-rows-2 gap-4 h-[70vh]">
        {currentImages.map((imagen, index) => (
          <motion.div
            key={`galeria-${index}`}
            className="relative overflow-hidden rounded-2xl cursor-pointer group shadow-xl"
            initial={{ 
              opacity: 0, 
              scale: 0.9
            }}
            whileInView={{ 
              opacity: 1, 
              scale: 1
            }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.05
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { 
                duration: 0.3,
                ease: "easeOut"
              }
            }}
            onClick={() => setSelectedImage(startIndex + index)}
            onHoverStart={() => setHoveredImage(index)}
            onHoverEnd={() => setHoveredImage(null)}
          >
            {/* Efectos de gradiente glassmorphism */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 opacity-50 z-10" />
            
            {/* Skeleton loader mejorado */}
            {!imageLoaded[index] && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </div>
            )}
            
            {/* Imagen principal con MÁSCARA MEJORADA */}
            <div className="relative w-full h-full">
              <Image
                src={imagen.src}
                alt={imagen.alt}
                fill
                className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                  imageLoaded[startIndex + index] ? 'opacity-100' : 'opacity-0'
                }`}
                sizes="20vw"
                loading="lazy"
                decoding="async"
                onLoad={() => handleImageLoad(startIndex + index)}
              />
              
              {/* MÁSCARA PRINCIPAL que hace las imágenes menos brillantes */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50 opacity-50 group-hover:opacity-20 transition-all duration-500" />
              
              {/* Máscara de color específica */}
              <motion.div 
                className="absolute inset-0 z-10"
                style={{ 
                  background: imagen.mask,
                  mixBlendMode: "multiply"
                }}
                animate={{
                  opacity: hoveredImage === index ? 0.2 : 0.4
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
            

            
            {/* Overlay con efectos múltiples */}
            <motion.div 
              className="absolute inset-0 z-30"
              animate={{
                background: hoveredImage === index 
                  ? "linear-gradient(45deg, rgba(0,0,0,0.1), transparent, rgba(255,255,255,0.1))"
                  : "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)"
              }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Texto superpuesto elegante */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-3 md:p-6 z-40"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: hoveredImage === index ? 1 : 0,
                y: hoveredImage === index ? 0 : 20
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="card-text text-white font-semibold text-sm md:text-base drop-shadow-lg">
                {imagen.alt}
              </h3>
            </motion.div>
            
            {/* Indicador de zoom premium */}
            <motion.div 
              className="absolute top-3 right-3 z-40"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: hoveredImage === index ? 1 : 0,
                scale: hoveredImage === index ? 1 : 0.8
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                <Maximize2 className="w-4 h-4 text-white drop-shadow-sm" />
              </div>
            </motion.div>
            
            {/* Efecto de brillo en hover */}
            <motion.div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                transform: "translateX(-100%)"
              }}
              animate={{
                transform: hoveredImage === index ? "translateX(100%)" : "translateX(-100%)"
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </motion.div>
        ))}
        </div>
      </div>

      {/* Lightbox Modal REVOLUCIONARIO - Solo para desktop */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-[9998] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            role="dialog"
            aria-modal="true"
            aria-label="Galería de imágenes en pantalla completa"
          >
            {/* Fondo con efecto glassmorphism - CLICK PARA CERRAR */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-xl cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            />
            
            {/* Efectos de partículas en el fondo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/20 rounded-full"
                  initial={{ 
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                    scale: 0
                  }}
                  animate={{
                    y: [0, -100, 0],
                    scale: [0, 1, 0],
                    opacity: [0, 0.5, 0]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>
            
            {/* Contenedor principal de la imagen */}
            <motion.div
              className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center z-10"
              initial={{ scale: 0.5, opacity: 0, rotateY: -45 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateY: 45 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1]
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Marco con efectos avanzados */}
              <div className="relative w-full h-full max-w-4xl max-h-4xl bg-gradient-to-br from-white/5 to-black/20 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                
                {/* Imagen principal */}
                <Image
                  src={IMAGENES[selectedImage].src}
                  alt={IMAGENES[selectedImage].alt}
                  fill
                  className="object-contain p-4"
                  sizes="90vw"
                  priority
                  quality={95}
                />
                
                {/* Gradiente sutil en los bordes */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none" />
              </div>
              
              {/* Información de la imagen */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 via-black/30 to-transparent backdrop-blur-sm"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h2 className="card-text text-white text-lg md:text-xl font-semibold mb-2 drop-shadow-lg">
                  {IMAGENES[selectedImage].alt}
                </h2>
                <p className="card-text text-white/80 text-sm">
                  {selectedImage + 1} de {IMAGENES.length} • Casona PsCielo
                </p>
              </motion.div>
            </motion.div>
            
            {/* Controles flotantes mejorados */}
            
            {/* Botón cerrar - Lado derecho */}
            <motion.button
              onClick={() => setSelectedImage(null)}
              className="fixed top-6 right-6 w-12 h-12 bg-black/40 hover:bg-black/60 backdrop-blur-lg rounded-full flex items-center justify-center transition-all duration-300 text-white hover:scale-110 border border-white/20 z-[9997]"
              aria-label="Cerrar galería"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.4 }}
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </motion.button>

            {/* Navegación anterior */}
            {selectedImage > 0 && (
              <motion.button
                onClick={() => navigateImage(-1)}
                className="fixed left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/40 hover:bg-black/60 backdrop-blur-lg rounded-full flex items-center justify-center transition-all duration-300 text-white hover:scale-110 border border-white/20"
                aria-label="Imagen anterior"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={26} />
              </motion.button>
            )}

            {/* Navegación siguiente */}
            {selectedImage < IMAGENES.length - 1 && (
              <motion.button
                onClick={() => navigateImage(1)}
                className="fixed right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/40 hover:bg-black/60 backdrop-blur-lg rounded-full flex items-center justify-center transition-all duration-300 text-white hover:scale-110 border border-white/20"
                aria-label="Imagen siguiente"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={26} />
              </motion.button>
            )}

            {/* Paginación de imágenes - Solo en desktop */}
            <motion.div
              className="fixed bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 bg-black/40 backdrop-blur-lg rounded-full px-4 py-2 border border-white/20"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
            >
              {IMAGENES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                    index === selectedImage 
                      ? 'bg-white scale-150' 
                      : 'bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Ver imagen ${index + 1}`}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 