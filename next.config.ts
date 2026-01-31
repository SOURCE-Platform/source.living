import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Disabled to enable API routes
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
