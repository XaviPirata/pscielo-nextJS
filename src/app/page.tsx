import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/hero-section";

// Lazy load de secciones no críticas
const InstalacionesSection = dynamic(() => import("@/components/sections/instalaciones-section"));
const QuienesSomosSection = dynamic(() => import("@/components/sections/quienes-somos-section"));
const ServiciosSection = dynamic(() => import("@/components/sections/servicios-section"));
const ProfesionalesSection = dynamic(() => import("@/components/sections/profesionales-section"));
const ContactoSection = dynamic(() => import("@/components/sections/contacto-section"));

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <InstalacionesSection />
      <QuienesSomosSection />
      <ServiciosSection />
      <ProfesionalesSection />
      <ContactoSection />
    </main>
  );
}
