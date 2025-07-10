/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
  },
  // Enable static export if needed for deployment
  // output: 'export',
  // trailingSlash: true,
}

module.exports = nextConfig