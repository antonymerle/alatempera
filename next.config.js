/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate-plugin");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["source.unsplash.com", "images.unsplash.com"],
  },
  env: {
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY_TEST,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY_TEST,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET_TEST,
    STRIPE_FREE_SHIPPING: process.env.STRIPE_FREE_SHIPPING_TEST,
    DOMAIN_NAME: process.env.DOMAIN_NAME,
    BASE_DOMAIN_URL:
      process.env.NODE_ENV === "production"
        ? process.env.DOMAIN_NAME
        : "http://localhost:3000",
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
    GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD,
    GMAIL_USER: process.env.GMAIL_USER,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
};

// pass custom config to nextTranslate in order to keep it while using nextTranslate
// module.exports = nextConfig;
module.exports = nextTranslate(nextConfig);
