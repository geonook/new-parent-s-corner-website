/** @type {import('next').NextConfig} */
const nextConfig = {
  // 輸出設定
  output: 'standalone',
  
  // 實驗性功能
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma']
  },

  // 圖片設定
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      }
    ],
    unoptimized: process.env.NODE_ENV === 'development'
  },

  // 編譯設定
  typescript: {
    ignoreBuildErrors: false,
  },
  
  eslint: {
    ignoreDuringBuilds: false,
  },

  // 重寫規則 - 用於靜態資源
  async rewrites() {
    return [
      {
        source: '/health',
        destination: '/api/health'
      }
    ]
  },

  // 安全標頭
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig