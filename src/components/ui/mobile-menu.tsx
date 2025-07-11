"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Images, Home, Heart, Users, Mail, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(false); // Cerrar menú después de navegar
  };

  // Cerrar menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest('[data-mobile-menu]')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const menuItems = [
    { id: 'hero', label: 'Inicio', icon: Play },
    { id: 'instalaciones', label: 'Instalaciones', icon: Images },
    { id: 'quienes-somos', label: 'Quiénes Somos', icon: Home },
    { id: 'servicios', label: 'Servicios', icon: Heart },
    { id: 'profesionales', label: 'Profesionales', icon: Users },
    { id: 'contacto', label: 'Contacto', icon: Mail },
  ];

  return (
    <div className="md:hidden" data-mobile-menu>
      {/* Botón Hamburguesa */}
      <motion.button
        className="fixed top-4 right-4 z-[60] p-3 rounded-full bg-gradient-to-r from-[#FDE68A] to-[#F9A8D4] shadow-lg backdrop-blur-md border border-white/20"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          rotate: isOpen ? 180 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6 text-gray-800" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-6 w-6 text-gray-800" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Menú Desplegable */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
            className="fixed top-0 right-0 h-full w-72 sm:w-72 bg-gradient-to-br from-white/95 to-white/90 dark:from-gray-900/95 dark:to-gray-800/90 backdrop-blur-xl border-l border-white/20 dark:border-gray-700/20 shadow-2xl z-[58]"
          >
            {/* Header del menú */}
            <div className="p-6 border-b border-white/20 dark:border-gray-700/20">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold bg-gradient-to-r from-[#F9A8D4] to-[#FDE68A] bg-clip-text text-transparent"
              >
                PsCielo
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-gray-600 dark:text-gray-300 mt-1"
              >
                Espacio Terapéutico
              </motion.p>
            </div>

            {/* Items del menú */}
            <div className="p-4 space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="w-full text-left p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:bg-gradient-to-r hover:from-[#FDE68A]/20 hover:to-[#F9A8D4]/20 transition-all duration-300 group"
                    onClick={() => scrollToSection(item.id)}
                    whileHover={{ scale: 1.02, x: 8 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-[#FDE68A] to-[#F9A8D4] shadow-lg group-hover:shadow-xl transition-shadow">
                        <Icon className="h-5 w-5 text-gray-800" />
                      </div>
                      <span className="text-gray-800 dark:text-gray-200 font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        {item.label}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Botón de tema */}
            <div className="p-4 border-t border-white/20 dark:border-gray-700/20 mt-auto">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="w-full p-4 rounded-xl bg-gradient-to-r from-[#FDE68A] to-[#F9A8D4] shadow-lg hover:shadow-xl transition-all duration-300 group"
                onClick={toggleTheme}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="p-2 rounded-lg bg-white/80 backdrop-blur-sm">
                    {theme === 'dark' ? (
                      <Sun className="h-5 w-5 text-gray-800" />
                    ) : (
                      <Moon className="h-5 w-5 text-gray-800" />
                    )}
                  </div>
                  <span className="text-gray-800 font-medium">
                    {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
                  </span>
                </div>
              </motion.button>
            </div>

            {/* Decoración flotante */}
            <motion.div
              className="absolute top-20 right-4 w-2 h-2 bg-gradient-to-r from-[#F9A8D4] to-[#FDE68A] rounded-full opacity-60"
              animate={{
                y: [-10, 10, -10],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-32 left-4 w-1.5 h-1.5 bg-gradient-to-r from-[#FDE68A] to-[#F9A8D4] rounded-full opacity-40"
              animate={{
                y: [10, -10, 10],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu; 