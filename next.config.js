/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/topic/react",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
