const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Enable SWC minification for faster builds
  swcMinify: true,
  
  // Optimize package imports to reduce bundle size
  experimental: {
    optimizePackageImports: ['@medusajs/ui', 'bootstrap', 'react-icons', '@medusajs/icons'],
  },
  
  // Webpack optimizations
  webpack: (config, { isServer, webpack }) => {
    // Code splitting optimization
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            // Split vendor code into separate chunk
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            // Split Medusa packages into separate chunk
            medusa: {
              test: /[\\/]node_modules[\\/](@medusajs)[\\/]/,
              name: 'medusa',
              chunks: 'all',
              priority: 20,
            },
            // Split common code
            commons: {
              name: 'commons',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }
    
    // Ignore source maps in production for faster builds
    if (!isServer && process.env.NODE_ENV === 'production') {
      config.devtool = false
    }
    
    return config
  },
  // Sass configuration to suppress Bootstrap 5.3.x deprecation warnings
  sassOptions: {
    quietDeps: true,  // Suppress deprecation warnings from dependencies
  },
  
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        
      },
      ...(process.env.NEXT_PUBLIC_BASE_URL ? [{ // Note: needed to serve images from /public folder
        protocol: process.env.NEXT_PUBLIC_BASE_URL.startsWith('https') ? 'https' : 'http',
        hostname: process.env.NEXT_PUBLIC_BASE_URL.replace(/^https?:\/\//, ''),
      }] : []),
      ...(process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ? [{ // Note: only needed when using local-file for product media
        protocol: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL.startsWith('https') ? 'https' : 'http',
        hostname: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL.replace(/^https?:\/\//, ''),
      }] : []),
      { // Note: can be removed after deleting demo products
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      { // Note: can be removed after deleting demo products
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      { // Note: can be removed after deleting demo products
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
      ...(process.env.NEXT_PUBLIC_MINIO_ENDPOINT ? [{ // Note: needed when using MinIO bucket storage for media
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_MINIO_ENDPOINT,
      }] : []),
    ],
  },
  serverRuntimeConfig: {
    port: process.env.PORT || 3000
  }
}

module.exports = nextConfig
