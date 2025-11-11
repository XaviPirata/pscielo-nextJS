import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Script from 'next/script';
import dynamic from "next/dynamic";

// Lazy load componentes no críticos - SIN ssr: false en layout
const FloatingDock = dynamic(() => import("@/components/ui/floating-dock"));
const MobileMenu = dynamic(() => import("@/components/ui/mobile-menu"));
const SmoothScrollManager = dynamic(() => import("@/components/utils/smooth-scroll-manager"));
const WhatsAppButton = dynamic(() => import("@/components/ui/whatsapp-button"));
const CustomCursor = dynamic(() => import("@/components/ui/custom-cursor"));

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "PsCielo - Terapia Psicológica Online | Profesional y Personalizada",
  description: "Psicología online y presencial en Córdoba. Terapia individual, de pareja y familiar. Agenda tu sesión hoy.",
  keywords: ["psicología", "terapia online", "psicólogo Córdoba", "terapia individual", "salud mental"],
  authors: [{ name: "PsCielo" }],
  creator: "PsCielo",
  publisher: "PsCielo",
  openGraph: {
    title: "PsCielo - Terapia Psicológica Online",
    description: "Psicología online y presencial. Agenda tu sesión hoy.",
    url: "https://www.pscielo.com",
    siteName: "PsCielo",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "https://www.pscielo.com/imagenes/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PsCielo - Terapia Psicológica Online",
        type: "image/jpeg",
      },
    ],
  },
  appLinks: {
    web: {
      url: "https://www.pscielo.com",
      should_fallback: true,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "PsCielo - Terapia Psicológica Online",
    description: "Psicología online y presencial. Agenda tu sesión hoy.",
    images: ["https://www.pscielo.com/imagenes/og-image.jpg"],
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
        {/* Meta tags adicionales para Open Graph */}
        <meta property="og:title" content="PsCielo - Terapia Psicológica Online" />
        <meta property="og:description" content="Psicología online y presencial. Agenda tu sesión hoy." />
        <meta property="og:image" content="https://www.pscielo.com/imagenes/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="PsCielo - Terapia Psicológica Online" />
        <meta property="og:url" content="https://www.pscielo.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PsCielo" />
        <meta property="og:locale" content="es_AR" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PsCielo - Terapia Psicológica Online" />
        <meta name="twitter:description" content="Psicología online y presencial. Agenda tu sesión hoy." />
        <meta name="twitter:image" content="https://www.pscielo.com/imagenes/og-image.jpg" />
        
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
          strategy="lazyOnload"
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
