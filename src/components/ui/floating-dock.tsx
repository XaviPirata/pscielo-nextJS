"use client";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { Play, Images, Home, Heart, Users, Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const FloatingDock = () => {
  const { theme, toggleTheme } = useTheme();

  // Funciones de navegación suave a cada sección
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div data-dock className="hidden md:block fixed top-8 right-8 z-50">
      <Dock
        iconSize={27}
        iconMagnification={35}
        iconDistance={70}
        className="backdrop-blur-md border border-border shadow-lg"
      >
        <DockIcon 
          className="hover:bg-accent dark:hover:bg-white/85 transition-colors cursor-pointer"
          onClick={() => scrollToSection('hero')}
        >
          <Play className="h-5 w-5 text-foreground dark:text-black" />
        </DockIcon>

        <DockIcon 
          className="hover:bg-accent dark:hover:bg-white/85 transition-colors cursor-pointer"
          onClick={() => scrollToSection('instalaciones')}
        >
          <Images className="h-5 w-5 text-foreground dark:text-black" />
        </DockIcon>

        <DockIcon 
          className="hover:bg-accent dark:hover:bg-white/85 transition-colors cursor-pointer"
          onClick={() => scrollToSection('quienes-somos')}
        >
          <Home className="h-5 w-5 text-foreground dark:text-black" />
        </DockIcon>
        
        <DockIcon 
          className="hover:bg-accent dark:hover:bg-white/85 transition-colors cursor-pointer"
          onClick={() => scrollToSection('servicios')}
        >
          <Heart className="h-5 w-5 text-foreground dark:text-black" />
        </DockIcon>
        
        <DockIcon 
          className="hover:bg-accent dark:hover:bg-white/85 transition-colors cursor-pointer"
          onClick={() => scrollToSection('profesionales')}
        >
          <Users className="h-5 w-5 text-foreground dark:text-black" />
        </DockIcon>
        
        <DockIcon 
          className="hover:bg-accent dark:hover:bg-white/85 transition-colors cursor-pointer"
          onClick={() => scrollToSection('contacto')}
        >
          <Mail className="h-5 w-5 text-foreground dark:text-black" />
        </DockIcon>

        <div className="w-px h-8 bg-border mx-1"></div>

        <DockIcon 
          className="hover:bg-accent dark:hover:bg-white/85 transition-colors cursor-pointer"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-foreground dark:text-black" />
          ) : (
            <Moon className="h-5 w-5 text-foreground dark:text-black" />
          )}
        </DockIcon>
      </Dock>
    </div>
  );
};

export default FloatingDock; 