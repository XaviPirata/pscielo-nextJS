import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import FloatingDock from "@/components/ui/floating-dock";
import MobileMenu from "@/components/ui/mobile-menu";
import SmoothScrollManager from "@/components/utils/smooth-scroll-manager";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import CustomCursor from "@/components/ui/custom-cursor";
import { cn } from "@/lib/utils";
import Script from 'next/script';

export const metadata: Metadata = {
  title: "PsCielo - Terapia Psicológica Online | Profesional y Personalizada",
  description: "Psicología online y presencial en Córdoba. Terapia individual, de pareja y familiar. Primera consulta gratuita. Agenda tu sesión hoy.",
  keywords: ["psicología", "terapia online", "psicólogo Córdoba", "terapia individual", "salud mental"],
  authors: [{ name: "PsCielo" }],
  creator: "PsCielo",
  publisher: "PsCielo",
  openGraph: {
    title: "PsCielo - Terapia Psicológica Online",
    description: "Psicología online y presencial. Primera consulta gratuita.",
    url: "https://www.pscielo.com",
    siteName: "PsCielo",
    locale: "es_AR",
    type: "website",
  },
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
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-T3PPCXPP';
  
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* DNS Prefetch y Preconnect para recursos externos */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          "font-hey-gotcha"
        )}
        style={{
          fontFamily: "'Hey Gotcha', sans-serif"
        }}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <ThemeProvider>
          <SmoothScrollManager />
          <CustomCursor />
          {children}
          <WhatsAppButton />
          <FloatingDock />
          <MobileMenu />
        </ThemeProvider>
      </body>
    </html>
  );
}
