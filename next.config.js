/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dilxwvfkfup17.cloudfront.net', 's3.us-west-2.amazonaws.com'],
  },
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
    },
  },
};

if (process.env.NODE_ENV === 'development') {
  nextConfig.images.domains.push('localhost');
}

module.exports = nextConfig;
