import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },

  // Enable static optimization
  reactStrictMode: true,

  // Hide dev indicator
  devIndicators: false,

  // Allow images from S3 with optimized settings
  images: {
    unoptimized: true,
  },

  // Don't bundle sharp — install native binary on target server
  serverExternalPackages: ["sharp"],

  // Disable nginx response buffering (fixes 502 on SSR pages)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Accel-Buffering",
            value: "no",
          },
        ],
      },
    ];
  },

};

export default withNextIntl(nextConfig);
