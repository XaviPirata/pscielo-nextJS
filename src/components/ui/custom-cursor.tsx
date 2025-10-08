"use client";

import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    // Detectar si es móvil - Si es móvil, no hacer nada
    const isMobile = window.innerWidth < 769;
    if (isMobile) {
      return;
    }
    
    const root = document.querySelector('html');
    if (!root) {
      return;
    }

    // Crear cursor principal
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    root.appendChild(cursor);

    // Crear cursor follower
    const follower = document.createElement('div');
    follower.classList.add('cursor', 'cursor__follower');
    root.appendChild(follower);

    // Función para posicionar los cursores
    function setPosition(element: HTMLElement, e: MouseEvent) {
      element.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    }

    // Event listener para el movimiento del mouse
    function handleMouseMove(e: MouseEvent) {
      setPosition(follower, e);
      setPosition(cursor, e);
    }

    // Detectar elementos interactivos para hover effects
    function handleMouseEnter() {
      cursor.classList.add('cursor--hover');
      follower.classList.add('cursor__follower--hover');
    }

    function handleMouseLeave() {
      cursor.classList.remove('cursor--hover');
      follower.classList.remove('cursor__follower--hover');
    }

    // Añadir event listeners
    root.addEventListener('mousemove', handleMouseMove);

    // Añadir hover effects a elementos interactivos
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, textarea, select, .clickable');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup function
    return () => {
      root.removeEventListener('mousemove', handleMouseMove);
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });

      // Remover elementos del cursor
      if (cursor && cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
      if (follower && follower.parentNode) {
        follower.parentNode.removeChild(follower);
      }
    };
  }, []);

  // Este componente no renderiza nada visible
  return null;
} 