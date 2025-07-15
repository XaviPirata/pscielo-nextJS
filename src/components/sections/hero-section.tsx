"use client";

import ScrollIndicator from "@/components/ui/scroll-indicator";

export default function HeroSection() {
  // URLs de Cloudinary para optimizar el rendimiento
  const videoHorizontalURL = "https://res.cloudinary.com/dwot9tp0f/video/upload/q_auto,f_auto,vc_auto/v1752545578/Pscielo-Hero-Horizontal_wfpiiy.mp4";
  const videoVerticalURL = "https://res.cloudinary.com/dwot9tp0f/video/upload/q_auto,f_auto,vc_auto/v1752545577/Pscielo-Hero-Vertical_jlehml.mp4";

  return (
    <section id="hero" className="relative h-screen w-full bg-black overflow-hidden">
      {/* Desktop Video Background (Horizontal) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-75 hidden md:block"
        key={videoHorizontalURL}
      >
        <source src={videoHorizontalURL} type="video/mp4" />
      </video>

      {/* Mobile Video Background (Vertical) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
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