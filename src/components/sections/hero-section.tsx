"use client";

import ScrollIndicator from "@/components/ui/scroll-indicator";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  // URLs de Cloudinary para optimizar el rendimiento
  const videoHorizontalURL = "https://res.cloudinary.com/dwot9tp0f/video/upload/q_auto,f_auto,vc_auto/v1752704396/Pscielo-Hero-Horizontal_x5ggbp.mp4";
  const videoVerticalURL = "https://res.cloudinary.com/dwot9tp0f/video/upload/q_auto,f_auto,vc_auto/v1752704519/Pscielo-Hero-Vertical_gm4wy7.mp4";
  
  // Posters optimizados (primer frame del video)
  const posterHorizontal = "https://res.cloudinary.com/dwot9tp0f/video/upload/so_0,f_jpg,q_auto:eco/v1752704396/Pscielo-Hero-Horizontal_x5ggbp.jpg";
  const posterVertical = "https://res.cloudinary.com/dwot9tp0f/video/upload/so_0,f_jpg,q_auto:eco/v1752704519/Pscielo-Hero-Vertical_gm4wy7.jpg";

  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isDesktopReady, setIsDesktopReady] = useState(false);
  const [isMobileReady, setIsMobileReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const tryPlay = (video?: HTMLVideoElement | null) => {
      if (!video) return;

      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => {
          // Si el navegador bloquea la reproducción automática, mantenemos el póster.
        });
      }
    };

    tryPlay(desktopVideoRef.current);
    tryPlay(mobileVideoRef.current);
  }, [prefersReducedMotion]);

  const desktopPosterClasses = `pointer-events-none object-cover transition-opacity duration-700 ease-out hidden md:block ${
    isDesktopReady && !prefersReducedMotion ? "opacity-0" : "opacity-75"
  }`;

  const mobilePosterClasses = `pointer-events-none object-cover transition-opacity duration-700 ease-out block md:hidden ${
    isMobileReady && !prefersReducedMotion ? "opacity-0" : "opacity-75"
  }`;

  return (
    <section id="hero" className="relative h-screen w-full bg-black overflow-hidden">
      {/* Imagen de fondo para LCP (carga instantánea) */}
      <Image
        src={posterHorizontal}
        alt="PsCielo - Terapia Psicológica"
        fill
        priority
        quality={75}
        className={desktopPosterClasses}
        sizes="100vw"
        aria-hidden={true}
      />
      <Image
        src={posterVertical}
        alt="PsCielo - Terapia Psicológica Mobile"
        fill
        priority
        quality={75}
        className={mobilePosterClasses}
        sizes="100vw"
        aria-hidden={true}
      />
      
      {/* Desktop Video Background (Horizontal) - Carga después */}
      {!prefersReducedMotion && (
        <video
          ref={desktopVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={posterHorizontal}
          onLoadedData={() => setIsDesktopReady(true)}
          className={`pointer-events-none absolute top-0 left-0 hidden h-full w-full object-cover transition-opacity duration-700 ease-out md:block ${
            isDesktopReady ? "opacity-100" : "opacity-0"
          }`}
          key={videoHorizontalURL}
          aria-hidden={true}
        >
          <source src={videoHorizontalURL} type="video/mp4" />
        </video>
      )}

      {/* Mobile Video Background (Vertical) - Carga después */}
      {!prefersReducedMotion && (
        <video
          ref={mobileVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={posterVertical}
          onLoadedData={() => setIsMobileReady(true)}
          className={`pointer-events-none absolute top-0 left-0 block h-full w-full object-cover transition-opacity duration-700 ease-out md:hidden ${
            isMobileReady ? "opacity-100" : "opacity-0"
          }`}
          key={videoVerticalURL}
          aria-hidden={true}
        >
          <source src={videoVerticalURL} type="video/mp4" />
        </video>
      )}

      {/* Scroll Indicator - Ajustado para mobile */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 md:bottom-8 z-10">
        <ScrollIndicator />
      </div>
    </section>
  );
} 