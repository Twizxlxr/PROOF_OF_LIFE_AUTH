/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel-optimized settings
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
