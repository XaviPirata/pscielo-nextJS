"use client";

import ScrollIndicator from "@/components/ui/scroll-indicator";
import Image from "next/image";

export default function HeroSection() {
  // URLs de Cloudinary para optimizar el rendimiento
  const videoHorizontalURL = "https://res.cloudinary.com/dwot9tp0f/video/upload/q_auto,f_auto,vc_auto/v1752704396/Pscielo-Hero-Horizontal_x5ggbp.mp4";
  const videoVerticalURL = "https://res.cloudinary.com/dwot9tp0f/video/upload/q_auto,f_auto,vc_auto/v1752704519/Pscielo-Hero-Vertical_gm4wy7.mp4";
  
  // Posters optimizados (primer frame del video)
  const posterHorizontal = "https://res.cloudinary.com/dwot9tp0f/video/upload/so_0,f_jpg,q_auto:eco/v1752704396/Pscielo-Hero-Horizontal_x5ggbp.jpg";
  const posterVertical = "https://res.cloudinary.com/dwot9tp0f/video/upload/so_0,f_jpg,q_auto:eco/v1752704519/Pscielo-Hero-Vertical_gm4wy7.jpg";

  return (
    <section id="hero" className="relative h-screen w-full bg-black overflow-hidden">
      {/* Imagen de fondo para LCP (carga instantánea) */}
      <Image
        src={posterHorizontal}
        alt="PsCielo - Terapia Psicológica"
        fill
        priority
        quality={75}
        className="object-cover opacity-75 hidden md:block"
        sizes="100vw"
      />
      <Image
        src={posterVertical}
        alt="PsCielo - Terapia Psicológica Mobile"
        fill
        priority
        quality={75}
        className="object-cover opacity-75 block md:hidden"
        sizes="100vw"
      />
      
      {/* Desktop Video Background (Horizontal) - Carga después */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={posterHorizontal}
        className="absolute top-0 left-0 w-full h-full object-cover opacity-75 hidden md:block"
        key={videoHorizontalURL}
      >
        <source src={videoHorizontalURL} type="video/mp4" />
      </video>

      {/* Mobile Video Background (Vertical) - Carga después */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={posterVertical}
        className="absolute top-0 left-0 w-full h-full object-cover opacity-75 block md:hidden"
        key={videoVerticalURL}
      >
        <source src={videoVerticalURL} type="video/mp4" />
      </video>

      {/* Scroll Indicator - Ajustado para mobile */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 md:bottom-8 z-10">
        <ScrollIndicator />
      </div>
    </section>
  );
} 