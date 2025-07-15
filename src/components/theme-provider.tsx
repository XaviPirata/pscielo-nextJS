"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Aplicar tema al DOM
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    // Guardar en localStorage
    try {
      localStorage.setItem("pscielo-theme", theme);
    } catch {
      // Ignorar errores de localStorage
    }
  }, [theme]);

  useEffect(() => {
    // Cargar tema inicial
    try {
      const savedTheme = localStorage.getItem("pscielo-theme");
      if (savedTheme === "dark" || savedTheme === "light") {
        setTheme(savedTheme);
      }
    } catch {
      // Usar tema por defecto si hay errores
    }
  }, []);

  const toggleTheme = () => {
    setTheme(current => current === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
} 