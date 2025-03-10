/** @type {import('next').NextConfig} */
const nextConfig = {
    // Remove experimental.serverActions, as it is no longer needed
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'm.media-amazon.com', // Your image domain here
        },
      ],
    },
    serverExternalPackages: ['mongoose'], // Updated for external packages
  }
  
  module.exports = nextConfig;
  