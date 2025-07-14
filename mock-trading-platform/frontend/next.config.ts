import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    domains: ['fonts.gstatic.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Add better error handling for font loading
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Font-Loading',
            value: 'optimized',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
