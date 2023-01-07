const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.notion.so",
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
    ],
    minimumCacheTTL: 1500000,
  },
};

module.exports = nextConfig;