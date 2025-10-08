"use client";

import { useEffect, useRef, useCallback } from "react";
import { animate } from "framer-motion";
import Lenis from "lenis";

export default function SmoothScrollManager() {
  const isScrollingRef = useRef(false);
  const currentSectionRef = useRef(0);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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
      lerp: 0.08,
      touchMultiplier: 3.0,
      touchInertiaMultiplier: 15,
      syncTouchLerp: 0.25,
      wheelMultiplier: 1.2,
  easing: (t: number) => {
        return t;
      },
      smoothWheel: true,
      syncTouch: true,
      infinite: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      autoRaf: false,
      overscroll: false,
      autoResize: true,
    });

    const raf = (time: number) => {
      if (lenisRef.current && !isScrollBlocked()) {
        lenisRef.current.raf(time);
      }
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, [isScrollBlocked]);

  // Scroll suave avanzado para desktop (mantener como estaba)
  const smoothScrollToSection = useCallback(
    (targetY: number, onSettled?: () => void) => {
      if (isMobileRef.current) {
        onSettled?.();
        return 0;
      }

      const startY = window.scrollY;
      const distance = Math.abs(targetY - startY);
      const viewportHeight = Math.max(window.innerHeight, 1);
      const normalizedDistance = Math.min(distance / viewportHeight, 3);
      const duration = Math.min(0.85, Math.max(0.45, 0.45 + normalizedDistance * 0.18));

      animate(startY, targetY, {
        duration,
        ease: [0.22, 0.8, 0.35, 1],
  onUpdate: (value: number) => {
          window.scrollTo(0, value);
        },
        onComplete: () => {
          onSettled?.();
        }
      });

      return duration;
    },
    []
  );

  const scrollToSection = useCallback((index: number) => {
    if (isMobileRef.current) return;
    
    if (isScrollBlocked()) return;
    
    if (index < 0 || index >= sectionsRef.current.length) return;
    
    isScrollingRef.current = true;
    currentSectionRef.current = index;
    
    const targetSection = sectionsRef.current[index];
    const targetY = targetSection.offsetTop;
    
    smoothScrollToSection(targetY);
    
    timeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 1500);
  }, [isScrollBlocked, smoothScrollToSection]);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (isMobileRef.current) return;
    
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
    if (isMobileRef.current) return;
    
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
    if (isMobileRef.current) return;
    
    if (isScrollBlocked()) return;
    
    if (isScrollingRef.current) return;
    
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const threshold = windowHeight * 0.3;
    
  sectionsRef.current.forEach((section: HTMLElement, index: number) => {
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
    
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    const handleScroll = () => {
      if (isScrollBlocked()) return;
      
      const scrolled = window.scrollY;
      
      parallaxElements.forEach((element) => {
        const rate = scrolled * -0.2;
        (element as HTMLElement).style.transform = `translateY(${rate}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrollBlocked]);

  useEffect(() => {
    isMobileRef.current = checkIsMobile();
    
    const sections = Array.from(document.querySelectorAll('section')) as HTMLElement[];
    sectionsRef.current = sections;
    
    if (isMobileRef.current) {
      // NO usar Lenis para móvil - solo scroll nativo suave
      document.body.classList.add('is-mobile');
      
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.overflowX = 'hidden';
      
      // Scroll suave nativo - como cualquier página móvil
      document.documentElement.style.scrollBehavior = 'smooth';
      document.body.style.scrollBehavior = 'smooth';
      
      // Momentum scrolling para iOS - scroll natural
      document.body.style.setProperty('-webkit-overflow-scrolling', 'touch');
      
      const metaTag = document.createElement('meta');
      metaTag.name = 'viewport';
      metaTag.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      
      const existingMeta = document.querySelector('meta[name="viewport"]');
      if (existingMeta) {
        existingMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      } else {
        document.head.appendChild(metaTag);
      }
      
      return () => {
        // No cleanup de Lenis porque no lo usamos en móvil
        document.body.classList.remove('is-mobile');
        document.documentElement.style.overflowX = '';
        document.body.style.overflowX = '';
        document.documentElement.style.scrollBehavior = '';
        document.body.style.scrollBehavior = '';
        document.body.style.setProperty('-webkit-overflow-scrolling', '');
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
    
    document.documentElement.style.scrollBehavior = 'auto';
    
    updateCurrentSection();
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('scroll', updateCurrentSection, { passive: true });
    
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