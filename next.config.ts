import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // skips ESLint during `next build`
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
