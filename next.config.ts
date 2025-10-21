/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",          // any request to /
        destination: "/movies", // goes to /movies
        permanent: false,     // temporary redirect
      },
    ];
  },
};

export default nextConfig;
