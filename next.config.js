/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  sass: true,
  modules: true,
  images: {
    domains: [
      "raw.githubusercontent.com",
      "www.pngall.com",
      "upload.wikimedia.org",
    ],
  },
};

module.exports = nextConfig;
