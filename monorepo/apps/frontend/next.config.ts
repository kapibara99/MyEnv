import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
