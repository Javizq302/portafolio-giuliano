import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "portafolio-giuliano-pull-zone.b-cdn.net",
      },
    ],
  },
};

export default nextConfig;
