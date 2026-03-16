import type { NextConfig } from "next";

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
const directusHost = directusUrl ? new URL(directusUrl).hostname : "";

const nextConfig: NextConfig = {
  images: directusHost
    ? {
        remotePatterns: [
          {
            protocol: "https",
            hostname: directusHost,
            pathname: "/assets/**",
          },
          {
            protocol: "http",
            hostname: directusHost,
            pathname: "/assets/**",
          },
        ],
      }
    : undefined,
};

export default nextConfig;
