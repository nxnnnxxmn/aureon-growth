import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ESLint solo bloquea en lint manual — los warnings de cult-ui (deps externas)
  // no deben romper el build de producción.
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "ui-avatars.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/privacidad", destination: "/legal/privacidad", permanent: true },
      { source: "/terminos", destination: "/legal/terminos", permanent: true },
      { source: "/cookies", destination: "/legal/cookies", permanent: true },
    ];
  },
};

export default nextConfig;
