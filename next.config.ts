import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // to allow images from stripe domain
   images: {
    domains: ["files.stripe.com"],
  },
};

export default nextConfig;
