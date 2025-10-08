import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import FloatingDock from "@/components/ui/floating-dock";
import MobileMenu from "@/components/ui/mobile-menu";
import SmoothScrollManager from "@/components/utils/smooth-scroll-manager";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import CustomCursor from "@/components/ui/custom-cursor";
import { cn } from "@/lib/utils";
import { GoogleTagManager } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: "PsCielo",
  description: "Terapia psicológica online",
  icons: {
    icon: [
      { url: "/imagenes/favicon.ico", sizes: "any" },
      { url: "/imagenes/faviconSol.png", type: "image/png" },
    ],
    shortcut: "/imagenes/favicon.ico",
    apple: "/imagenes/faviconSol.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          "font-hey-gotcha"
        )}
        style={{
          fontFamily: "'Hey Gotcha', sans-serif"
        }}
      >
        <ThemeProvider>
          <SmoothScrollManager />
          <CustomCursor />
          {children}
          <WhatsAppButton />
          <FloatingDock />
          <MobileMenu />
        </ThemeProvider>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
      </body>
    </html>
  );
}
