/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: ['bdv-dev.s3.us-east-2.amazonaws.com']
  }
}

module.exports = nextConfig
