"use client";

import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";

interface BirdsAnimationProps {
  className?: string;
}

export default function BirdsAnimation({ className = "" }: BirdsAnimationProps) {
  const animationContainer = useRef<HTMLDivElement>(null);
  const animationInstance = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (animationContainer.current) {
      observer.observe(animationContainer.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && animationContainer.current && !animationInstance.current) {
      // Cargar y configurar la animación solo cuando sea visible
      animationInstance.current = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: false, // Solo se reproduce una vez
        autoplay: true, // Se reproduce automáticamente
        path: "/animaciones/pajaritos.json", // Ruta al archivo JSON
      });

      // Limpiar cuando el componente se desmonte
      return () => {
        if (animationInstance.current) {
          animationInstance.current.destroy();
        }
      };
    }
  }, [isVisible]);

  return (
    <div 
      ref={animationContainer}
      className={`pointer-events-none ${className}`}
      style={{
        width: "80%",
        height: "120px",
        position: "absolute",
        top: 0,
        left: "10%",
        zIndex: 15,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
      }}
    />
  );
} 