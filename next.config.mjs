/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_VERCEL_URL,
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
