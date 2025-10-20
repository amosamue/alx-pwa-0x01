import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const withPWA = withPWAInit({
  dest: 'public', // Service worker files will be generated in the public folder
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['m.media-amazon.com'], // For movie posters
  },
};

export default withPWA({
  ...nextConfig,
});
