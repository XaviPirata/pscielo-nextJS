"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Portal from './portal'; // Importar el Portal

type Professional = {
  name: string;
  title: string;
  imageSrc: string;
  bio: string;
};

type ProfessionalModalProps = {
  professional: Professional | null;
  onClose: () => void;
};

export const ProfessionalModal = ({ professional, onClose }: ProfessionalModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Función para obtener color aleatorio para el nombre en mobile (solo celeste y rosa)
  const getRandomColor = (name: string) => {
    const colors = [
      'text-[#F9A8D4]', // Rosa
      'text-[#93C5FD]'  // Celeste
    ];
    // Usar el nombre como seed para que sea consistente
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (professional) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [professional]);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <Portal>
      <AnimatePresence>
        {professional && (
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            // Backdrop: full screen, centrado, no se toca en desktop
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              layoutId={`card-container-${professional.name}`}
              onClick={(e) => e.stopPropagation()}
              // Contenido del Modal: Layout responsivo - Mobile más angosto y mejor scroll
              className="relative bg-card rounded-2xl shadow-2xl flex flex-col w-full 
                         max-w-[85vw] h-auto max-h-[80vh] 
                         md:flex-row md:max-w-4xl md:h-[90vh] md:max-h-[600px]"
            >
              {/* Botón de Cerrar - Izquierda en mobile, derecha en desktop */}
              <button
                onClick={onClose}
                className="absolute top-2 left-2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors
                           md:left-auto md:right-2 md:p-2"
              >
                <X size={18} className="md:size-6" />
              </button>
              
              {/* Imagen - Solo visible en desktop - Transición de Warm Sepia Rose a color */}
              <div className="relative w-full h-48 flex-shrink-0 hidden
                              md:block md:w-1/3 md:h-full overflow-hidden">
                <motion.div
                  initial={{ 
                    filter: "sepia(60%) saturate(70%) hue-rotate(-15deg) brightness(105%)" 
                  }}
                  animate={{ 
                    filter: "sepia(0%) saturate(100%) hue-rotate(0deg) brightness(100%)" 
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <Image
                    src={professional.imageSrc}
                    alt={`Fotografía de ${professional.name}`}
                    fill
                    className="object-cover md:rounded-l-2xl"
                    priority
                  />
                </motion.div>
              </div>
              
              {/* Contenido de Texto - Con scroll interno mejorado */}
              <div className="flex-1 p-4 overflow-y-auto overscroll-contain
                              md:p-8">
                <h2 className={`font-heading font-bold mb-4 
                               text-2xl ${getRandomColor(professional.name)} drop-shadow-sm text-center
                               md:text-4xl md:mb-6 md:text-foreground md:drop-shadow-none md:text-left md:pr-8`}>
                  {professional.name}
                </h2>
                <p className="card-content text-sm text-muted-foreground mb-4
                                md:text-lg">
                  {professional.title}
                </p>
                <div className="prose dark:prose-invert text-foreground/80 max-w-none">
                  <p 
                    className="card-content whitespace-pre-line leading-relaxed text-sm
                               md:text-base"
                  >
                    {professional.bio}
                  </p>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}; 