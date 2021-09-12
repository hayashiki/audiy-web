import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const NEXT_PUBLIC_GOOGLE_CLIENT_ID = publicRuntimeConfig.NEXT_PUBLIC_GOOGLE_CLIENT_ID
export const NEXT_PUBLIC_GQL_URL = publicRuntimeConfig.NEXT_PUBLIC_GQL_URL

export const NEXT_PUBLIC_FIREBASE_BUCKET_NAME = publicRuntimeConfig.NEXT_PUBLIC_FIREBASE_BUCKET_NAME
export const NEXT_PUBLIC_FIREBASE_API_KEY = publicRuntimeConfig.NEXT_PUBLIC_FIREBASE_API_KEY
export const NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = publicRuntimeConfig.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
export const NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID =
  publicRuntimeConfig.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
export const NEXT_PUBLIC_FIREBASE_APP_ID = publicRuntimeConfig.NEXT_PUBLIC_FIREBASE_APP_ID
export const NEXT_PUBLIC_FIREBASE_PROJECT_ID = publicRuntimeConfig.NEXT_PUBLIC_FIREBASE_PROJECT_ID
export const NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID =
  publicRuntimeConfig.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

export const REVISION_ID = publicRuntimeConfig.REVISION_ID
export const VERSION = publicRuntimeConfig.VERSION
