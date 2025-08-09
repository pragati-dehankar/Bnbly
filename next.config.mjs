/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            pathname: '/**', // allow all paths from Cloudinary
          },
          {
            protocol:"https",
            hostname:'lh3.googleusercontent.com',
            pathname: '/**',
          }
        ],
      },
};

export default nextConfig;
