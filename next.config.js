/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
  },
};

module.exports = nextConfig;
