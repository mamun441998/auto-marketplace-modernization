import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow 127.0.0.1 (and LAN IP) to access dev resources — fixes the
  // "Blocked cross-origin request" warning in Next.js 16.
  allowedDevOrigins: ["127.0.0.1", "192.168.0.100"],

  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;