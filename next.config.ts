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
              "default-src 'self' data: blob: https:",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com *.google-analytics.com *.analytics.google.com *.googleadservices.com *.gtagjs.com tagassistant.google.com *.doubleclick.net *.google.com challenges.cloudflare.com",
              "script-src-elem 'self' 'unsafe-inline' *.googletagmanager.com *.google-analytics.com *.analytics.google.com *.googleadservices.com *.gtagjs.com tagassistant.google.com *.doubleclick.net *.google.com challenges.cloudflare.com",
              "connect-src 'self' *.google-analytics.com *.analytics.google.com *.googletagmanager.com *.google.com *.doubleclick.net api.whatsapp.com wa.me challenges.cloudflare.com",
              "img-src 'self' data: blob: https: *",
              "style-src 'self' 'unsafe-inline' https:",
              "font-src 'self' data: https:",
              "frame-src 'self' *.google.com *.doubleclick.net https://challenges.cloudflare.com https://www.google.com/maps/",
              "media-src 'self' blob: data: https:",
              "worker-src 'self' blob:",
              "child-src 'self' blob: *.google.com challenges.cloudflare.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
