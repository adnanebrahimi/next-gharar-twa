/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development"
});

module.exports = withPWA({
  // config
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
});
