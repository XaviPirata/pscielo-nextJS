"use client";

import ScrollIndicator from "@/components/ui/scroll-indicator";

export default function HeroSection() {
  return (
    <section id="hero" className="relative h-screen w-full bg-black overflow-hidden">
      {/* Desktop Video Background (Horizontal) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50 hidden md:block"
      >
        <source src="/videos/pscielo-hero-horizontal.webm" type="video/webm" />
      </video>

      {/* Mobile Video Background (Vertical) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50 block md:hidden"
      >
        <source src="/videos/pscielo-hero-vertical.webm" type="video/webm" />
      </video>

      {/* Scroll Indicator - Ajustado para mobile */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 md:bottom-8 z-10">
        <ScrollIndicator />
      </div>
    </section>
  );
} 