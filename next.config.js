/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      { hostname: "cdn.sanity.io" },
      { hostname: "source.unsplash.com" },
      {
        hostname: "storage.googleapis.com",
      },
      {
        hostname: "picsum.photos",
      },
      {
        hostname: "img.clerk.com",
      },
    ],
  },
}

module.exports = nextConfig
