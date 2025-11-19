import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/source.living' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/source.living/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
