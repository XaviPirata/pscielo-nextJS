"use client";

import { useEffect, useRef, useCallback } from "react";
import { animate } from "framer-motion";

export default function SmoothScrollManager() {
  const isScrollingRef = useRef(false);
  const currentSectionRef = useRef(0);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const lockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMobileRef = useRef(false);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);

  const checkIsMobile = useCallback(() => {
    return window.innerWidth < 768;
  }, []);

  const isScrollBlocked = useCallback(() => {
    return (
      document.body.style.overflow === "hidden" ||
      document.documentElement.style.overflow === "hidden"
    );
  }, []);

  // Animación suave con easeOutExpo y callback de completado real
  const smoothScrollToSection = useCallback(
    (targetY: number, onComplete?: () => void) => {
      if (isMobileRef.current) {
        onComplete?.();
        return;
      }

      const startY = window.scrollY;
      const distance = Math.abs(targetY - startY);

      // Si ya estamos en la posición, no animar
      if (distance < 2) {
        onComplete?.();
        return;
      }

      // Cancelar animación anterior si existe
      if (animationRef.current) {
        animationRef.current.stop();
      }

      const viewportHeight = Math.max(window.innerHeight, 1);
      const normalizedDistance = Math.min(distance / viewportHeight, 3);
      // Duración proporcional: entre 0.6s y 1.0s
      const duration = Math.min(1.0, Math.max(0.6, 0.6 + normalizedDistance * 0.15));

      animationRef.current = animate(startY, targetY, {
        duration,
        // easeOutExpo — arranque rápido, aterrizaje suave
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (value: number) => {
          window.scrollTo(0, value);
        },
        onComplete: () => {
          animationRef.current = null;
          onComplete?.();
        },
      });
    },
    []
  );

  const scrollToSection = useCallback(
    (index: number) => {
      if (isMobileRef.current) return;
      if (isScrollBlocked()) return;
      if (index < 0 || index >= sectionsRef.current.length) return;
      if (isScrollingRef.current) return;

      isScrollingRef.current = true;
      currentSectionRef.current = index;

      const targetSection = sectionsRef.current[index];
      const targetY = targetSection.offsetTop;

      // Fallback safety: liberar lock después de 1.5s máximo
      if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
      lockTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1500);

      // La animación libera el lock cuando termina (via onComplete)
      smoothScrollToSection(targetY, () => {
        isScrollingRef.current = false;
        if (lockTimeoutRef.current) {
          clearTimeout(lockTimeoutRef.current);
          lockTimeoutRef.current = null;
        }
      });
    },
    [isScrollBlocked, smoothScrollToSection]
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
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
    },
    [scrollToSection, isScrollBlocked]
  );

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (isMobileRef.current) return;
      if (isScrollBlocked()) return;
      if (isScrollingRef.current) return;

      const current = currentSectionRef.current;

      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          if (current < sectionsRef.current.length - 1) {
            scrollToSection(current + 1);
          }
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          if (current > 0) {
            scrollToSection(current - 1);
          }
          break;
        case "Home":
          e.preventDefault();
          scrollToSection(0);
          break;
        case "End":
          e.preventDefault();
          scrollToSection(sectionsRef.current.length - 1);
          break;
      }
    },
    [scrollToSection, isScrollBlocked]
  );

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

      if (
        scrollY >= sectionTop - threshold &&
        scrollY < sectionTop + rect.height - threshold
      ) {
        currentSectionRef.current = index;
      }
    });
  }, [isScrollBlocked]);

  useEffect(() => {
    isMobileRef.current = checkIsMobile();

    const sections = Array.from(
      document.querySelectorAll("section")
    ) as HTMLElement[];
    sectionsRef.current = sections;

    if (isMobileRef.current) {
      document.body.classList.add("is-mobile");
      document.documentElement.style.overflowX = "hidden";
      document.body.style.overflowX = "hidden";
      document.documentElement.style.scrollBehavior = "smooth";
      document.body.style.scrollBehavior = "smooth";
      document.body.style.setProperty("-webkit-overflow-scrolling", "touch");

      const existingMeta = document.querySelector('meta[name="viewport"]');
      if (existingMeta) {
        existingMeta.setAttribute(
          "content",
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        );
      }

      return () => {
        document.body.classList.remove("is-mobile");
        document.documentElement.style.overflowX = "";
        document.body.style.overflowX = "";
        document.documentElement.style.scrollBehavior = "";
        document.body.style.scrollBehavior = "";
        document.body.style.setProperty("-webkit-overflow-scrolling", "");
      };
    }

    // Desktop
    document.documentElement.style.scrollBehavior = "auto";

    updateCurrentSection();

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("scroll", updateCurrentSection, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("scroll", updateCurrentSection);

      if (lockTimeoutRef.current) {
        clearTimeout(lockTimeoutRef.current);
      }
      if (animationRef.current) {
        animationRef.current.stop();
      }
      document.documentElement.style.scrollBehavior = "";
    };
  }, [
    handleWheel,
    handleKeydown,
    updateCurrentSection,
    isScrollBlocked,
    checkIsMobile,
  ]);

  return null;
}
