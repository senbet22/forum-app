// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "51.175.136.91",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
