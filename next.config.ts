import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The project sits under a parent folder that also has a lockfile, so pin the root.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
