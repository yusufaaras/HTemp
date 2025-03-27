/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: process.env.NODE_ENV === 'development', // Sadece geliştirme modunda strict mode
  experimental: {
      serverActions: true,
  },
  images: {
      domains: [
          'images.unsplash.com',
          'i.ibb.co',
          'scontent.fotp8-1.fna.fbcdn.net',
      ],
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com',
              pathname: '/a/**',
          },
          {
              protocol: 'https',
              hostname: '*.googleusercontent.com',
              pathname: '**',
          },
      ],
  },
};

module.exports = nextConfig;
