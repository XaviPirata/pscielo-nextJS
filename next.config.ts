import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              // Scripts permitidos
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "*.googletagmanager.com",
              "*.google-analytics.com",
              "*.analytics.google.com",
              "*.googleadservices.com",
              "*.gtagjs.com",
              "tagassistant.google.com",
              "*.doubleclick.net",
              
              // Elementos de script
              "script-src-elem 'self' 'unsafe-inline'",
              "*.googletagmanager.com",
              "*.google-analytics.com",
              "*.analytics.google.com",
              "*.googleadservices.com",
              "*.gtagjs.com",
              "tagassistant.google.com",
              "*.doubleclick.net",
              
              // Conexiones permitidas
              "connect-src 'self'",
              "*.google-analytics.com",
              "*.analytics.google.com",
              "*.googletagmanager.com",
              "*.google.com",
              "*.doubleclick.net",
              "api.whatsapp.com",
              "wa.me",
              
              // Imágenes
              "img-src 'self' data: blob: https:",
              "*.googletagmanager.com",
              "*.google-analytics.com",
              "*.analytics.google.com",
              "*.doubleclick.net",
              "*.google.com",
              
              // Estilos
              "style-src 'self' 'unsafe-inline'",
              "fonts.googleapis.com",
              
              // Fuentes
              "font-src 'self' data:",
              "fonts.gstatic.com",
              
              // Frames (para Google)
              "frame-src 'self'",
              "*.google.com",
              "*.doubleclick.net",
              
              // Workers
              "worker-src 'self' blob:",
              
              // Base
              "default-src 'self'",
              
              // Objetos
              "object-src 'none'",
              
              // Base URI
              "base-uri 'self'",
              
              // Form action
              "form-action 'self'",
            ].join(' ; '),
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
    ];
  },
};

export default nextConfig;
