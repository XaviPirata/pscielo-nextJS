"use client";

import { useEffect, useRef, useCallback } from "react";
import { useScroll, useTransform, useSpring, animate } from "framer-motion";
import Lenis from "lenis";

export default function SmoothScrollManager() {
  const isScrollingRef = useRef(false);
  const currentSectionRef = useRef(0);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMobileRef = useRef(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Detectar si es mobile
  const checkIsMobile = useCallback(() => {
    return window.innerWidth < 768; // md breakpoint
  }, []);

  // Función para verificar si el scroll está bloqueado por modales
  const isScrollBlocked = useCallback(() => {
    return document.body.style.overflow === "hidden" || 
           document.documentElement.style.overflow === "hidden";
  }, []);

  // Inicializar Lenis para mobile CON PARÁMETROS OPTIMIZADOS
  const initializeLenis = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.destroy();
    }

    lenisRef.current = new Lenis({
      // ============================================
      // PARÁMETROS DE VELOCIDAD Y SUAVIDAD
      // ============================================
      
      // LERP: Controla la interpolación (0-1)
      // 0.01 = MUY lento y suave
      // 0.05 = Lento y suave  
      // 0.1 = Equilibrado (DEFAULT)
      // 0.2 = Rápido
      // 0.3+ = Muy rápido y menos suave
      lerp: 0.15, // EQUILIBRADO: Suave pero no lento
      
      // DURATION: Solo se usa si NO hay lerp definido
      // Si lerp está definido, duration se ignora
      // duration: 1.0, // NO USAR con lerp
      
      // ============================================
      // PARÁMETROS TÁCTILES (MOBILE)
      // ============================================
      
      // TOUCH MULTIPLIER: Multiplica la velocidad del scroll táctil
      // 0.5 = Mitad de velocidad
      // 1.0 = Velocidad normal (DEFAULT)
      // 2.0 = Doble velocidad
      // 3.0 = Triple velocidad
      touchMultiplier: 1.8, // MÁS RÁPIDO: Casi doble velocidad
      
      // TOUCH INERTIA MULTIPLIER: Controla la inercia después del gesto
      // 5 = Poca inercia (para rápido)
      // 15 = Inercia media
      // 35 = Mucha inercia (DEFAULT)
      // 50+ = Inercia excesiva
      touchInertiaMultiplier: 25, // EQUILIBRADO: Buena inercia
      
      // SYNC TOUCH LERP: Interpolación para eventos táctiles (0-1)
      // 0.01 = Muy suave pero lento
      // 0.075 = Suave (DEFAULT)
      // 0.1 = Equilibrado
      // 0.2+ = Rápido pero menos suave
      syncTouchLerp: 0.1, // EQUILIBRADO: Ni lento ni brusco
      
      // ============================================
      // PARÁMETROS DE SCROLL CON RUEDA
      // ============================================
      
      // WHEEL MULTIPLIER: Multiplica la velocidad del scroll con rueda
      // 0.5 = Mitad de velocidad
      // 1.0 = Velocidad normal (DEFAULT)
      // 2.0 = Doble velocidad
      wheelMultiplier: 1.2, // UN POCO MÁS RÁPIDO que normal
      
      // ============================================
      // CONFIGURACIÓN GENERAL
      // ============================================
      
      // EASING: Función de suavizado
      easing: (t) => {
        // Opciones de easing:
        // Linear: t
        // Ease out suave: 1 - Math.pow(1 - t, 3)
        // Ease out rápido: 1 - Math.pow(1 - t, 2)
        // Custom balanced: Math.min(1, 1.001 - Math.pow(2, -10 * t))
        return 1 - Math.pow(1 - t, 2.5); // EQUILIBRADO: Suave pero no lento
      },
      
      smoothWheel: true,        // Activar suavizado para wheel
      syncTouch: true,          // Sincronizar con gestos táctiles
      infinite: false,          // No scroll infinito
      orientation: 'vertical',  // Scroll vertical
      gestureOrientation: 'vertical', // Gestos verticales
      autoRaf: false,          // Control manual de RAF
      overscroll: false,       // Sin rebotes bruscos
      autoResize: true,        // Redimensionar automáticamente
    });

    // Función que actualiza Lenis en cada frame
    const raf = (time: number) => {
      if (lenisRef.current && !isScrollBlocked()) {
        lenisRef.current.raf(time);
      }
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, [isScrollBlocked]);

  // Función para scroll suave a sección específica en mobile con Lenis
  const scrollToSectionWithLenis = useCallback((targetY: number) => {
    if (!lenisRef.current) return;
    
    lenisRef.current.scrollTo(targetY, {
      duration: 2.5, // Más lento para mobile
      easing: (t) => {
        // Easing personalizado ultra suave
        return 1 - Math.pow(1 - t, 4); // Quartic out - muy suave
      },
    });
  }, []);

  // Scroll suave avanzado para desktop (mantener como estaba)
  const smoothScrollToSection = useCallback((targetY: number) => {
    if (isMobileRef.current) return;
    
    const startY = window.scrollY;
    const distance = targetY - startY;
    
    // Animación suave con framer-motion
    animate(startY, targetY, {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94], // Cubic bezier para suavidad
      onUpdate: (value) => {
        window.scrollTo(0, value);
      },
      onComplete: () => {
        // Efecto de rebote sutil al final
        animate(targetY, targetY - 5, {
          duration: 0.1,
          ease: "easeOut",
          onUpdate: (value) => window.scrollTo(0, value),
          onComplete: () => {
            animate(targetY - 5, targetY, {
              duration: 0.1,
              ease: "easeOut",
              onUpdate: (value) => window.scrollTo(0, value)
            });
          }
        });
      }
    });
  }, []);

  const scrollToSection = useCallback((index: number) => {
    // EN MÓVIL: NO HACER SCROLL AUTOMÁTICO POR SECCIONES
    // Dejar que el usuario haga scroll libremente
    if (isMobileRef.current) return;
    
    // No hacer scroll si está bloqueado por modales
    if (isScrollBlocked()) return;
    
    if (index < 0 || index >= sectionsRef.current.length) return;
    
    isScrollingRef.current = true;
    currentSectionRef.current = index;
    
    const targetSection = sectionsRef.current[index];
    const targetY = targetSection.offsetTop;
    
    // EN DESKTOP: Mantener el comportamiento original
    smoothScrollToSection(targetY);
    
    timeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 1500);
  }, [isScrollBlocked, smoothScrollToSection]);

  const handleWheel = useCallback((e: WheelEvent) => {
    // MÓVIL: No interceptar NADA - dejar que Lenis maneje todo
    if (isMobileRef.current) return;
    
    // No interceptar wheel events si el scroll está bloqueado por modales
    if (isScrollBlocked()) return;
    
    e.preventDefault();
    
    if (isScrollingRef.current) return;
    
    const delta = e.deltaY;
    const current = currentSectionRef.current;
    
    if (delta > 0 && current < sectionsRef.current.length - 1) {
      scrollToSection(current + 1);
    } else if (delta < 0 && current > 0) {
      scrollToSection(current - 1);
    }
  }, [scrollToSection, isScrollBlocked]);

  const handleKeydown = useCallback((e: KeyboardEvent) => {
    // MÓVIL: No interceptar NADA - comportamiento nativo
    if (isMobileRef.current) return;
    
    // No interceptar keyboard events si el scroll está bloqueado por modales
    if (isScrollBlocked()) return;
    
    if (isScrollingRef.current) return;
    
    const current = currentSectionRef.current;
    
    switch (e.key) {
      case 'ArrowDown':
      case 'PageDown':
        e.preventDefault();
        if (current < sectionsRef.current.length - 1) {
          scrollToSection(current + 1);
        }
        break;
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        if (current > 0) {
          scrollToSection(current - 1);
        }
        break;
      case 'Home':
        e.preventDefault();
        scrollToSection(0);
        break;
      case 'End':
        e.preventDefault();
        scrollToSection(sectionsRef.current.length - 1);
        break;
    }
  }, [scrollToSection, isScrollBlocked]);

  const updateCurrentSection = useCallback(() => {
    // MÓVIL: No hacer tracking de secciones - scroll libre
    if (isMobileRef.current) return;
    
    // No actualizar sección si el scroll está bloqueado por modales
    if (isScrollBlocked()) return;
    
    if (isScrollingRef.current) return;
    
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const threshold = windowHeight * 0.3;
    
    sectionsRef.current.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + scrollY;
      
      if (scrollY >= sectionTop - threshold && scrollY < sectionTop + rect.height - threshold) {
        currentSectionRef.current = index;
      }
    });
  }, [isScrollBlocked]);

  // Configurar parallax suave para móvil
  useEffect(() => {
    if (!isMobileRef.current) return;
    
    // Añadir efectos de parallax suaves a elementos en móvil
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    const handleScroll = () => {
      if (isScrollBlocked()) return;
      
      const scrolled = window.scrollY;
      
      parallaxElements.forEach((element) => {
        const rate = scrolled * -0.2; // Velocidad del parallax
        (element as HTMLElement).style.transform = `translateY(${rate}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrollBlocked]);

  useEffect(() => {
    // Detectar si es mobile al cargar
    isMobileRef.current = checkIsMobile();
    
    // Obtener todas las secciones
    const sections = Array.from(document.querySelectorAll('section')) as HTMLElement[];
    sectionsRef.current = sections;
    
    // MÓVIL: Configuración ULTRA SUAVE con Lenis
    if (isMobileRef.current) {
      // Inicializar Lenis con parámetros ultra suaves
      initializeLenis();
      
      // Añadir clase para identificar móvil
      document.body.classList.add('is-mobile');
      
      // CSS para máxima suavidad en mobile
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.overflowX = 'hidden';
      
      // Desactivar scroll-behavior nativo que puede interferir
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.style.scrollBehavior = 'auto';
      
      // Añadir meta tag para mejorar scroll en mobile
      const metaTag = document.createElement('meta');
      metaTag.name = 'viewport';
      metaTag.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      
      const existingMeta = document.querySelector('meta[name="viewport"]');
      if (existingMeta) {
        existingMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      } else {
        document.head.appendChild(metaTag);
      }
      
      // Cleanup para móvil
      return () => {
        if (lenisRef.current) {
          lenisRef.current.destroy();
          lenisRef.current = null;
        }
        document.body.classList.remove('is-mobile');
        document.documentElement.style.overflowX = '';
        document.body.style.overflowX = '';
        document.documentElement.style.scrollBehavior = '';
        document.body.style.scrollBehavior = '';
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
    
    // DESKTOP: Control completo como antes
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Determinar sección actual
    updateCurrentSection();
    
    // Event listeners solo para desktop
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('scroll', updateCurrentSection, { passive: true });
    
    // Touch events solo para desktop
    let touchStartY = 0;
    let touchEndY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (isScrollBlocked()) return;
      touchStartY = e.changedTouches[0].screenY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrollBlocked()) return;
      
      if (isScrollingRef.current) return;
      
      touchEndY = e.changedTouches[0].screenY;
      const deltaY = touchStartY - touchEndY;
      const threshold = 50;
      
      if (Math.abs(deltaY) > threshold) {
        const current = currentSectionRef.current;
        
        if (deltaY > 0 && current < sectionsRef.current.length - 1) {
          scrollToSection(current + 1);
        } else if (deltaY < 0 && current > 0) {
          scrollToSection(current - 1);
        }
      }
    };
    
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Cleanup desktop
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('scroll', updateCurrentSection);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      document.documentElement.style.scrollBehavior = '';
    };
  }, [handleWheel, handleKeydown, scrollToSection, updateCurrentSection, isScrollBlocked, initializeLenis, checkIsMobile]);

  return null;
} 