"use client";

import { useEffect, useRef, useState } from "react";
import lottie, { AnimationItem } from "lottie-web";

interface AnimatedStarsProps {
  count?: number;
  speed?: number;
  size?: number;
  opacity?: number;
}

export default function AnimatedStars({ 
  count = 5, 
  speed = 1, 
  size = 0.8, 
  opacity = 0.7 
}: AnimatedStarsProps) {
  const [dark, setDark] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const animations = useRef<AnimationItem[]>([]);

  // Detectar modo dark - COPIADO EXACTO de flying-birds
  useEffect(() => {
    const upd = () =>
      setDark(document.documentElement.classList.contains("dark"));
    upd();
    const mo = new MutationObserver(upd);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  // Crear las estrellas cuando esté en modo dark
  useEffect(() => {
    if (!dark || !wrap.current) {
      // Limpiar animaciones existentes
      animations.current.forEach(anim => anim.destroy());
      animations.current = [];
      return;
    }

    // Crear múltiples estrellas
    (async () => {
      try {
        const data = await fetch("/animaciones/estrellitas.json").then(r => r.json());
        
        // Limpiar contenedor
        wrap.current!.innerHTML = '';
        animations.current.forEach(anim => anim.destroy());
        animations.current = [];

                 // Crear cada estrella con mejor distribución
         for (let i = 0; i < count; i++) {
           const starContainer = document.createElement('div');
           starContainer.style.position = 'absolute';
           
           // Mejor distribución: incluir esquinas y zonas laterales
           const zones = [
             { top: [5, 25], left: [5, 25] },     // Esquina superior izquierda
             { top: [5, 25], left: [75, 95] },    // Esquina superior derecha
             { top: [75, 95], left: [5, 25] },    // Esquina inferior izquierda
             { top: [75, 95], left: [75, 95] },   // Esquina inferior derecha
             { top: [10, 90], left: [10, 90] },   // Centro general
           ];
           
           const zone = zones[i % zones.length];
           const topRange = zone.top[1] - zone.top[0];
           const leftRange = zone.left[1] - zone.left[0];
           
           starContainer.style.top = `${zone.top[0] + Math.random() * topRange}%`;
           starContainer.style.left = `${zone.left[0] + Math.random() * leftRange}%`;
           starContainer.style.width = '124px'; // 60px * 1.4 = 84px (40% más grande)
           starContainer.style.height = '124px'; // 60px * 1.4 = 84px (40% más grande)
           starContainer.style.opacity = opacity.toString();
           starContainer.style.transform = `scale(${size * (0.8 + Math.random() * 0.8)})`; // Rango más amplio
           starContainer.style.pointerEvents = 'none';
           starContainer.style.zIndex = '10';
          
          wrap.current!.appendChild(starContainer);

          const anim = lottie.loadAnimation({
            container: starContainer,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: data,
          });
          
          anim.setSpeed(speed);
          animations.current.push(anim);
        }
      } catch {
        // Error loading stars animation - silent fail
      }
    })();

    return () => {
      animations.current.forEach(anim => anim.destroy());
      animations.current = [];
    };
  }, [dark, count, speed, size, opacity]);

  // Solo mostrar en modo dark
  if (!dark) return null;

  return (
    <div
      ref={wrap}
      className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

// Componente específico para diferentes secciones con configuraciones predefinidas
export function StarsForSection({ section }: { section: 'quienes-somos' | 'profesionales' | 'instalaciones' | 'contacto' | 'servicios' }) {
  const configs = {
    'quienes-somos': { count: 8, speed: 0.8, size: 0.9, opacity: 0.7 },      // Más estrellas, más grandes
    'profesionales': { count: 12, speed: 0.9, size: 1.0, opacity: 0.8 },     // Muchas más estrellas para llenar zonas
    'instalaciones': { count: 6, speed: 0.6, size: 0.8, opacity: 0.6 },      // Más estrellas
    'contacto': { count: 10, speed: 1.0, size: 0.9, opacity: 0.7 },          // Más estrellas, más grandes
    'servicios': { count: 7, speed: 0.7, size: 0.85, opacity: 0.65 },        // Estrellas suaves para servicios
  };

  const config = configs[section];
  
  return <AnimatedStars {...config} />;
} 