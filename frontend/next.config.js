/** @type {import('next').NextConfig} */
const config = {
  images: {
    domains: ["localhost", "s3.amazonaws.com"],
  },
  // …
  webpack: (config, { webpack, isServer, nextRuntime }) => {
    // Avoid AWS SDK Node.js require issue
    if (isServer && nextRuntime === "nodejs")
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^(aws-crt|@aws-sdk\/signature-v4-crt)$/,
        })
      );
    return config;
  },
  // …
};

module.exports = config;
