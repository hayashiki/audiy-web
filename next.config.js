require('dotenv').config();
const { withSentryConfig } = require('@sentry/nextjs');
const runtimeCaching = require('next-pwa/cache')

const withPWA = require('next-pwa')

const SentryWebpackPluginOptions = {}

module.exports = withSentryConfig(
  withPWA({
    pwa: {
      dest: 'public'
    },
    reactStrictMode: true,
    publicRuntimeConfig: {
      REVISION_ID: process.env.REVISION_ID,
      VERSION: require('./package.json').version,

      NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      NEXT_PUBLIC_GQL_URL: process.env.NEXT_PUBLIC_GQL_URL,

      NEXT_PUBLIC_FIREBASE_BUCKET_NAME: process.env.NEXT_PUBLIC_FIREBASE_BUCKET_NAME,
      NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
      NEXT_PUBLIC_FIREBASE_VAPID: process.env.NEXT_PUBLIC_FIREBASE_VAPID,
    },
  }),
  {
}, SentryWebpackPluginOptions)
