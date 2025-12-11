import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // React Compiler moved from experimental (Next.js 15+)
  reactCompiler: false,

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'replicate.delivery',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      }
    ],
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://pic-christmas-backend.onrender.com/api/:path*',
      },
      {
        source: '/mp/ipn',
        destination: 'https://pic-christmas-backend.onrender.com/api/payments/webhook',
      }
    ];
  },
};

export default nextConfig;
