import {
  Analytics,
  getAnalytics,
  setAnalyticsCollectionEnabled,
} from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import {
  Auth,
  AuthProvider,
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth';
import React, { createContext } from 'react';
import { FirebasePerformance, getPerformance } from 'firebase/performance';

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
const app = initializeApp(config);

interface Firebase {
  analytics: Analytics;
  auth: Auth;
  authProviders: {
    facebook: AuthProvider;
    github: AuthProvider;
    google: AuthProvider;
    twitter: AuthProvider;
  };
  performance: FirebasePerformance;
}

const value: Firebase = {
  analytics: getAnalytics(app),
  auth: getAuth(),
  authProviders: {
    facebook: (() => {
      // https://firebase.google.com/docs/auth/web/facebook-login
      const p = new FacebookAuthProvider();
      p.addScope('email');
      return p;
    })(),
    github: (() => {
      // https://firebase.google.com/docs/auth/web/github-auth
      const p = new GithubAuthProvider();
      p.addScope('user');
      return p;
    })(),
    google: (() => {
      // https://firebase.google.com/docs/auth/web/google-signin
      const p = new GoogleAuthProvider();
      p.addScope('profile');
      p.addScope('email');
      return p;
    })(),
    twitter: (() => {
      // https://firebase.google.com/docs/auth/web/twitter-login
      return new TwitterAuthProvider();
    })(),
  },
  performance: getPerformance(app),
};

if (process.env.NODE_ENV !== 'production') {
  setAnalyticsCollectionEnabled(value.analytics, false);
}

export const FirebaseContext = createContext<Firebase>(value);

const Firebase: React.FC = ({ children }) => {
  return (
    
  )
}
  <FirebaseContext.Provider value={value}>
    {children}
  </FirebaseContext.Provider>
)

export default Firebase;
