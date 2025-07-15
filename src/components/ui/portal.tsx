"use client";

import { useState, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Asegurarse de que el portal solo se renderice en el cliente
  if (typeof window === "undefined") return null;

  const target = document.querySelector("#__next") || document.body;
  return mounted ? createPortal(children, target) : null;
};

export default Portal; 