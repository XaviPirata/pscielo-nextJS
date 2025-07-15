"use client";

import { useEffect, useRef, useState } from "react";
import lottie, { AnimationItem } from "lottie-web";

interface WalkingBirdsProps {
  className?: string;
}

export default function WalkingBirds({ className = "" }: WalkingBirdsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Referencias para cada pájaro
  const redBirdRef = useRef<HTMLDivElement>(null);
  const yellowBird1Ref = useRef<HTMLDivElement>(null);
  const yellowBird2Ref = useRef<HTMLDivElement>(null);
  const yellowBird3Ref = useRef<HTMLDivElement>(null);

  // Referencias para las instancias de animación
  const redBirdInstance = useRef<AnimationItem | null>(null);
  const yellowBird1Instance = useRef<AnimationItem | null>(null);
  const yellowBird2Instance = useRef<AnimationItem | null>(null);
  const yellowBird3Instance = useRef<AnimationItem | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      // Cargar animación del pájaro rojo (mamá)
      if (redBirdRef.current && !redBirdInstance.current) {
        redBirdInstance.current = lottie.loadAnimation({
          container: redBirdRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "/animaciones/pajarito-rojo.json",
        });
      }

      // Cargar animaciones de los pajaritos amarillos (polluelos)
      if (yellowBird1Ref.current && !yellowBird1Instance.current) {
        yellowBird1Instance.current = lottie.loadAnimation({
          container: yellowBird1Ref.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "/animaciones/pajarito-amarillo.json",
        });
      }

      if (yellowBird2Ref.current && !yellowBird2Instance.current) {
        yellowBird2Instance.current = lottie.loadAnimation({
          container: yellowBird2Ref.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "/animaciones/pajarito-amarillo.json",
        });
      }

      if (yellowBird3Ref.current && !yellowBird3Instance.current) {
        yellowBird3Instance.current = lottie.loadAnimation({
          container: yellowBird3Ref.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "/animaciones/pajarito-amarillo.json",
        });
      }

      // Limpiar al desmontar
      return () => {
        redBirdInstance.current?.destroy();
        yellowBird1Instance.current?.destroy();
        yellowBird2Instance.current?.destroy();
        yellowBird3Instance.current?.destroy();
      };
    }
  }, [isVisible]);

  return (
    <div ref={sectionRef} className={`relative w-full h-32 overflow-hidden ${className}`}>
      {isVisible && (
        <>
          {/* Pájaro Rojo (Mamá) - Va PRIMERO */}
          <div
            ref={redBirdRef}
            className="absolute walking-bird-red"
          />

          {/* Polluelo Amarillo 1 - Sigue a mamá de cerca */}
          <div
            ref={yellowBird1Ref}
            className="absolute walking-bird-yellow-1"
          />

          {/* Polluelo Amarillo 2 - Segundo polluelo */}
          <div
            ref={yellowBird2Ref}
            className="absolute walking-bird-yellow-2"
          />

          {/* Polluelo Amarillo 3 - Último polluelo */}
          <div
            ref={yellowBird3Ref}
            className="absolute walking-bird-yellow-3"
          />
        </>
      )}
    </div>
  );
} 