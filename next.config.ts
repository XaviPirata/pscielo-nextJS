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
  // ⚠️ CSP DESACTIVADA TEMPORALMENTE - TODO FUNCIONA SIN RESTRICCIONES
  // async headers() {
  //   return [];
  // },
};

export default nextConfig;
