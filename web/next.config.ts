import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com", // For maxresdefault.jpg
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com", // For hqdefault.jpg and other YouTube variants
      },
    ],
  },
};

export default nextConfig;
