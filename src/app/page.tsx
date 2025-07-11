import HeroSection from "@/components/sections/hero-section";
import InstalacionesSection from "@/components/sections/instalaciones-section";
import QuienesSomosSection from "@/components/sections/quienes-somos-section";
import ServiciosSection from "@/components/sections/servicios-section";
import ProfesionalesSection from "@/components/sections/profesionales-section";
import ContactoSection from "@/components/sections/contacto-section";

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
