/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY_TEST,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY_TEST,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET_TEST,
    STRIPE_FREE_SHIPPING: process.env.STRIPE_FREE_SHIPPING_TEST,
  },
};

module.exports = nextConfig;
