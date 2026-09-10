/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [{ source: '/favicon.ico', destination: '/icon' }]
  },
  async redirects() {
    return [
      // Collapse apex → www in one hop when the request hits this app.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'peyote-labs.com' }],
        destination: 'https://www.peyote-labs.com/:path*',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig
