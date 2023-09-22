/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate-plugin");

const nextConfig = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  reactStrictMode: true,
  // images: {
  //   domains: ["source.unsplash.com", "images.unsplash.com"],
  // },
  env: {
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    STRIPE_PUBLISHABLE_KEY:
      process.env.NODE_ENV === "production"
        ? process.env.STRIPE_PUBLISHABLE_KEY_PROD
        : process.env.STRIPE_PUBLISHABLE_KEY_TEST,
    STRIPE_SECRET_KEY:
      process.env.NODE_ENV === "production"
        ? process.env.STRIPE_SECRET_KEY_PROD
        : process.env.STRIPE_SECRET_KEY_TEST,
    STRIPE_WEBHOOK_SECRET:
      process.env.NODE_ENV === "production"
        ? process.env.STRIPE_WEBHOOK_SECRET_PROD
        : process.env.STRIPE_WEBHOOK_SECRET_TEST,
    DOMAIN_NAME: process.env.DOMAIN_NAME,
    BASE_DOMAIN_URL:
      process.env.NODE_ENV === "production"
        ? process.env.DOMAIN_NAME
        : "http://localhost:3000",
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
    GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD,
    ADMIN_EMAIL_1: process.env.ADMIN_EMAIL_1,
    ADMIN_EMAIL_2: process.env.ADMIN_EMAIL_2,
    GMAIL_USER: process.env.GMAIL_USER,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
};

// pass custom config to nextTranslate in order to keep it while using nextTranslate
// module.exports = nextConfig;
module.exports = nextTranslate(nextConfig);
