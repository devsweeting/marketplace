/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dilxwvfkfup17.cloudfront.net', 'localhost'],
  },
  env: {
    NEXT_PUBLIC_BACKEND_URL: 'http://localhost:3001/v1',
  },
};

module.exports = nextConfig;
