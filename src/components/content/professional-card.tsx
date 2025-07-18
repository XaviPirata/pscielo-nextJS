"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

type ProfessionalCardProps = {
  name: string;
  title: string;
  imageSrc: string;
  layoutId: string;
  onClick: () => void;
};

export const ProfessionalCard = ({ name, title, imageSrc, layoutId, onClick }: ProfessionalCardProps) => {
  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      className="group relative h-80 sm:h-96 w-full max-w-72 mx-auto rounded-3xl overflow-hidden cursor-pointer shadow-lg"
    >
      {/* Efecto Glow Sutil */}
      <div className="absolute inset-0 z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-palette-accent-1/50 to-palette-accent-2/50 blur-3xl"></div>
      </div>
      
      {/* Imagen de Fondo */}
      <Image
        src={imageSrc}
        alt={`Fotografía de ${name}`}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      
      {/* Capa de Color/Opacidad Unificadora */}
      <div className="absolute inset-0 bg-gradient-to-br
                from-pink-200/[0.12]  /* rosa pastel, 12 % de opacidad */
                via-pink-50/[0.08]    /* punto intermedio casi imperceptible */
                to-amber-100/[0.12]   /* amarillo pastel, 12 % de opacidad */
                transition-opacity duration-300
                group-hover:opacity-0">
</div>
      
      {/* Overlay de Información */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-3 sm:p-4 md:p-6 flex flex-col justify-end z-10">
        <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-white">{name}</h3>
        <p className="card-text text-sm sm:text-md text-white/80">{title}</p>
      </div>
    </motion.div>
  );
}; 