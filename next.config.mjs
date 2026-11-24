/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/dm7i2mhsn/**' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};
export default nextConfig;
