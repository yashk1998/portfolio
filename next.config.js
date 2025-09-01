/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable TypeScript checking during build for speed
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build for speed
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Build optimizations
  compress: true,
  poweredByHeader: false,
  
  experimental: {
    optimizePackageImports: ['react-redux'],
  },
  
  // Output optimizations (remove standalone for dev performance)
  // output: 'standalone',
  
  // Image optimizations
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 300,
  },
};

module.exports = nextConfig; 