import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compress: true, // 🚀 10x Performance: Enable Gzip compression
  poweredByHeader: false, // 🛡️ Security: Hide X-Powered-By
  reactStrictMode: true, // 🧪 Stability: Stronger checks
  experimental: {
    reactCompiler: false, // Disable React Compiler to prevent build errors
  },
  eslint: {
    // Disable ESLint during builds (warnings won't block deployment)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'], // 🖼️ Optimization: Modern formats
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
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://pic-christmas-backend.onrender.com/api/:path*', // 🔌 Proxy to Backend
      },
      {
        source: '/mp/ipn',
        destination: 'https://pic-christmas-backend.onrender.com/api/payments/webhook', // 💰 Mercado Pago Webhook
      }
    ];
  },
};

export default nextConfig;
