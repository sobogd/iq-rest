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

  // Allow images from S3
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iq-rest.s3.eu-central-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
