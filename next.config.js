/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    SERVER_URL: process.env.SERVER_URL,
    SERVER_URL_DEV: process.env.SERVER_URL_DEV,
    IS_PRODUCTION: process.env.IS_PRODUCTION,
    FB_APP_ID: process.env.FB_APP_ID,
    FB_APP_SECRET: process.env.FB_APP_SECRET,
    FB_PAGE_ID: process.env.FB_PAGE_ID,
    CHANNEL_YTB: process.env.CHANNEL_YTB,
    GITHUB: process.env.GITHUB,
  },
};

module.exports = nextConfig;
