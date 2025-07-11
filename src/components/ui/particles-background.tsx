"use client";

import { useTheme } from "@/components/theme-provider";
import { Particles } from "@/components/magicui/particles";

export default function ParticlesBackground() {
  const { theme } = useTheme();
  const color = theme === 'dark' ? "#E2D9E2" : "#a855f7";

  return (
    <Particles
      className="absolute inset-0 z-[-1]"
      quantity={100}
      ease={80}
      color={color}
      refresh={true}
    />
  );
} 