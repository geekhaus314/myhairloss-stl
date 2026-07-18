/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('reading-time')
    }
    return config
  },
};

export default nextConfig;
