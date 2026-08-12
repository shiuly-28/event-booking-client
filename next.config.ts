/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  typescript: {
    // Vercel-এ বিল্ডের সময় টাইপ এরর ইগনোর করার জন্য
    ignoreBuildErrors: true,
  },
  eslint: {
    // বিল্ডের সময় লিথিং এরর ইগনোর করার জন্য
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;