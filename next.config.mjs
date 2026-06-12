/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If deploying to a subpath (e.g., github.io/repo-name), uncomment the line below:
  // basePath: '/myhairloss-stl',
};

export default nextConfig;
