/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "devtree-img.s3.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
