import withPWAInit from "@ducanh2912/next-pwa";
import { NextConfig } from "next";

/** @type {NextConfig} */
const withPWA = withPWAInit({
  dest: "public",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["m.media-amazon.com"], // for movie images
  },
};

export default withPWA({
  ...nextConfig,
});
