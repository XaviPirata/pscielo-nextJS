"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export type TherapyData = {
  title: string;
  src: string;
  description: string;
  benefits: string[];
  approach: string;
  duration: string;
};

type TherapyModalProps = {
  therapy: TherapyData | null;
  onClose: () => void;
};

export const TherapyModal = ({ therapy, onClose }: TherapyModalProps) => {
  // Bloquear scroll de la página de fondo cuando el modal está abierto
  useEffect(() => {
    if (therapy) {
      // Bloquear scroll de la página de fondo
      document.body.style.overflow = "hidden";
      
      // Opcional: Bloquear scroll en el elemento html también para mayor compatibilidad
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      // Restaurar scroll cuando se cierre el modal
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [therapy]);

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (therapy) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [therapy, onClose]);

  return (
    <AnimatePresence>
      {therapy && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            layoutId={`therapy-card-container-${therapy.title}`}
            onClick={(e) => e.stopPropagation()}
            className="relative h-[90vh] w-[90vw] max-w-4xl max-h-[700px] bg-card rounded-3xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Columna de la Imagen */}
            <div className="relative w-full md:w-2/5 h-1/3 md:h-full">
              <Image
                src={therapy.src}
                alt={`Imagen representativa de ${therapy.title}`}
                fill
                className="object-cover"
              />
              {/* Overlay gradiente para mejor legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/20"></div>
            </div>
            
            {/* Columna de Contenido */}
            <div className="w-full md:w-3/5 p-6 md:p-8 overflow-y-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                {therapy.title}
              </h2>
              
              <div className="space-y-6">
                {/* Descripción */}
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    ¿Qué es?
                  </h3>
                  <p className="card-content text-muted-foreground leading-relaxed">
                    {therapy.description}
                  </p>
                </div>

                {/* Enfoque */}
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    Enfoque Terapéutico
                  </h3>
                  <p className="card-content text-muted-foreground leading-relaxed">
                    {therapy.approach}
                  </p>
                </div>

                {/* Beneficios */}
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    Beneficios
                  </h3>
                  <ul className="space-y-2">
                    {therapy.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 card-content text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Duración */}
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    Duración Típica
                  </h3>
                  <p className="card-content text-muted-foreground leading-relaxed">
                    {therapy.duration}
                  </p>
                </div>
              </div>
            </div>

            {/* Botón de Cerrar */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-foreground/50 hover:text-foreground transition-colors z-10"
            >
              <X size={24} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 