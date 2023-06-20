/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["source.unsplash.com"],
  },
  env: {
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY_TEST,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY_TEST,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET_TEST,
    STRIPE_FREE_SHIPPING: process.env.STRIPE_FREE_SHIPPING_TEST,
    DOMAIN_NAME: process.env.DOMAIN_NAME,
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  },
};

module.exports = nextConfig;

const nextTranslate = require("next-translate-plugin");

module.exports = nextTranslate();
