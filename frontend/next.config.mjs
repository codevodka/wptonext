/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true, // For local development
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'amartadey.test',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https: http:; frame-ancestors 'self';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;