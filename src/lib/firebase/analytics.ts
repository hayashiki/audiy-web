import {
  logEvent,
  Analytics,
  isSupported,
  getAnalytics,
  initializeAnalytics,
} from 'firebase/analytics'
import { useEffect } from 'react'
import { firebaseApp } from './firebase'

let analytics: false | Analytics

;(async () => {
  analytics = (await isSupported()) && getAnalytics(firebaseApp)
})()

export const useAnalytics = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') return
    initializeAnalytics(firebaseApp)
  }, [])
}

export const usePageView = (location: string, path: string) => {
  useEffect(() => {
    if (typeof window !== 'undefined') return
    logEvent(<Analytics>analytics, 'page_view', {
      page_location: location,
      page_path: path,
      page_title: document.title,
    })
  }, [])
}

export const logLogin = (method: string = 'Anonymously') => {
  logEvent(<Analytics>analytics, 'login', { method })
}

export const logSignup = (method: string = 'Anonymously') => {
  logEvent(<Analytics>analytics, 'sign_up', { method })
}
