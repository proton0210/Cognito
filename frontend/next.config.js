const webpack = require("webpack");

/** @type {import('next').NextConfig} */
const config = {
  // …
  webpack: (config, { isServer, nextRuntime }) => {
    // Avoid AWS SDK Node.js require issue
    if (isServer && nextRuntime === "nodejs")
      config.plugins.push(
        new webpack.IgnorePlugin({ resourceRegExp: /^aws-crt$/ })
      );
    return config;
  },
  experimental: {
    serverActions: true,
  },
  // …
};

module.exports = config;
