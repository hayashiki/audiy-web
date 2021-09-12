import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'

import {
  NEXT_PUBLIC_FIREBASE_BUCKET_NAME,
  NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
} from '@/lib/config'

// このハンドリング不要になった？
// firebase.apps.length === 0
if (typeof window !== 'undefined') {
  const firebaseConfig = {
    apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: NEXT_PUBLIC_FIREBASE_BUCKET_NAME,
    messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  }
  const firebaseApp = initializeApp(firebaseConfig)
  getAnalytics(firebaseApp)
}
