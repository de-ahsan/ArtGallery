/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['artic-web.imgix.net'],
  },
  eslint: {
    dirs: ['pages', 'styles']
  },
}

module.exports = nextConfig
