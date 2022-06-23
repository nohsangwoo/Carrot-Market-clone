/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['imagedelivery.net', 'videodelivery.net'],
  },
  experimental: {
    reactRoot: true,
    // -------- server component 적용시 사용 옵션
    // runtime: 'nodejs',
    // serverComponents: true,
    // -------- end of server component 적용시 사용 옵션
  },
}

module.exports = nextConfig
