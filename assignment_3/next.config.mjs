/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "miro.medium.com",
      "upload.wikimedia.org",
      "blog.postman.com",
      "chisellabs.com",
    ],
  },
};

export default nextConfig;
