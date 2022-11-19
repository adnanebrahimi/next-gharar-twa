/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["@jitsi/react-sdk"]);
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

module.exports = withTM(
  withPWA({
    // config
    reactStrictMode: true,
    swcMinify: true,
  })
);
