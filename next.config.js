/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/blog',
        destination: '/posts',
      },
      {
        source: '/blog/:slug',
        destination: '/posts/:slug',
      },
    ];
  },
};

module.exports = nextConfig;
