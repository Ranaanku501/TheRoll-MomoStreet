import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The project sits under a parent folder that also has a lockfile, so pin the root.
  outputFileTracingRoot: path.join(__dirname),
  // Short, shareable aliases for the install page.
  async redirects() {
    return [
      { source: "/app", destination: "/install", permanent: false },
      { source: "/download", destination: "/install", permanent: false },
    ];
  },
};

export default nextConfig;
