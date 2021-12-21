import { Analytics, getAnalytics, setAnalyticsCollectionEnabled } from 'firebase/analytics'
import { initializeApp, getApps } from 'firebase/app'
import { Auth, AuthProvider, getAuth, GoogleAuthProvider } from 'firebase/auth'
import { FirebasePerformance, getPerformance } from 'firebase/performance'
import { FirebaseStorage, getStorage } from 'firebase/storage'
import React, { createContext } from 'react'

import {
  NEXT_PUBLIC_FIREBASE_BUCKET_NAME,
  NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
} from '@/lib/config'

const config = {
  apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: NEXT_PUBLIC_FIREBASE_BUCKET_NAME,
  messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// const app = initializeApp(config)
const app = !getApps.length ? initializeApp(config) : getApps()

interface Firebase {
  // analytics: Analytics
  auth: Auth
  storage: FirebaseStorage
  authProviders: {
    google: AuthProvider
  }
  // performance: FirebasePerformance
}

const value: Firebase = {
  // analytics: getAnalytics(app),
  auth: getAuth(),
  storage: getStorage(),
  authProviders: {
    google: (() => {
      // https://firebase.google.com/docs/auth/web/google-signin
      const p = new GoogleAuthProvider()
      p.addScope('profile')
      p.addScope('email')
      return p
    })(),
  },
  // performance: getPerformance(app),
}

// if (process.env.NODE_ENV !== 'production') {
//   setAnalyticsCollectionEnabled(value.analytics, false)
// }

export const FirebaseContext = createContext<Firebase>(value)

const FirebaseProvider: React.FC = ({ children }) => (
  <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>
)

export default FirebaseProvider
