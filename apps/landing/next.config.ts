import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Optimize CSS for better performance
  experimental: {
    optimizeCss: true, // Enable CSS optimization
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  output: "standalone",
  // Enable static optimization
  reactStrictMode: true,

  // Performance optimizations
  swcMinify: true,
};

export default withNextIntl(nextConfig);
