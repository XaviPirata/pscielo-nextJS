"use client";

import ScrollIndicator from "@/components/ui/scroll-indicator";
import Image from "next/image";

export default function HeroSection() {
  // Posters optimizados para LCP
  const posterHorizontal = "https://res.cloudinary.com/dwot9tp0f/video/upload/so_0,f_jpg,q_75,w_1920/v1752704396/Pscielo-Hero-Horizontal_x5ggbp.jpg";
  const posterVertical = "https://res.cloudinary.com/dwot9tp0f/video/upload/so_0,f_jpg,q_75,w_768/v1752704519/Pscielo-Hero-Vertical_gm4wy7.jpg";
  
  // URLs de video optimizados
  const videoHorizontalURL = "https://res.cloudinary.com/dwot9tp0f/video/upload/q_auto:low,f_auto/v1752704396/Pscielo-Hero-Horizontal_x5ggbp.mp4";
  const videoVerticalURL = "https://res.cloudinary.com/dwot9tp0f/video/upload/q_auto:low,f_auto/v1752704519/Pscielo-Hero-Vertical_gm4wy7.mp4";

  return (
    <section id="hero" className="relative h-screen w-full bg-black overflow-hidden">
      {/* IMAGEN para LCP - Desktop */}
      <Image
        src={posterHorizontal}
        alt="PsCielo - Centro de Terapia Psicológica en Córdoba"
        fill
        priority
        quality={75}
        className="object-cover hidden md:block"
        sizes="100vw"
      />
      
      {/* IMAGEN para LCP - Mobile */}
      <Image
        src={posterVertical}
        alt="PsCielo - Centro de Terapia Psicológica en Córdoba"
        fill
        priority
        quality={75}
        className="object-cover block md:hidden"
        sizes="100vw"
      />

      {/* VIDEO Desktop - Carga después del LCP */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster={posterHorizontal}
        className="absolute top-0 left-0 w-full h-full object-cover hidden md:block"
      >
        <source src={videoHorizontalURL} type="video/mp4" />
      </video>

      {/* VIDEO Mobile - Carga después del LCP */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster={posterVertical}
        className="absolute top-0 left-0 w-full h-full object-cover block md:hidden"
      >
        <source src={videoVerticalURL} type="video/mp4" />
      </video>

      {/* Scroll Indicator */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 md:bottom-8 z-10">
        <ScrollIndicator />
      </div>
    </section>
  );
} 