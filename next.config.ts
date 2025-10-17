import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  // Enable source maps in production for better debugging and Lighthouse scores
  productionBrowserSourceMaps: false, // Disable for Cloudflare to reduce bundle size
};

export default nextConfig;
