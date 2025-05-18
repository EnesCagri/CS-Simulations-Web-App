import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // skips ESLint during `next build`
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
