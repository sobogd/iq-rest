import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  output: "standalone",

  // Enable static optimization
  reactStrictMode: true,

  // Hide dev indicator
  devIndicators: false,

  // Allow images from S3 with optimized settings
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iq-rest.s3.eu-central-1.amazonaws.com",
        pathname: "/**",
      },
    ],
    // AVIF is 20-30% smaller than WebP, with WebP as fallback
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
