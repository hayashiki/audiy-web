import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { useEffect } from 'react'

import { NEXT_PUBLIC_FIREBASE_VAPID } from '@/lib/config'

export default function Messaging() {
  const messaging = getMessaging()
  const getMessageToken = async () => {
    const token = await getToken(messaging, {
      vapidKey: NEXT_PUBLIC_FIREBASE_VAPID,
    })
    if (token) {
      console.info('fcm oken is', token)
    } else {
      console.log('Token Empty')
    }
  }

  useEffect(() => {
    getMessageToken()
    const unsubscribeMessage = onMessage(messaging, (payload) => {
      console.log('Message received. ', payload)
      // show notification snackbar
    })
    return unsubscribeMessage
  }, [])

  return <></>
}
