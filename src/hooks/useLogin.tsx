import React, { useEffect, useState } from 'react'

import { NEXT_PUBLIC_GOOGLE_CLIENT_ID } from '@/lib/config'
import { UserInfo } from '@/types/userInfo'

const useGoogleAuth = () => {
  const [loading, setLoading] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [googleUser, setGoogleUser] = useState<UserInfo | null>(null)
  const [googleAuth, setGoogleAuth] = useState<gapi.auth2.GoogleAuth | null>(null)

  const initGoogleAuth = () => {
    gapi.load('client:auth2', async () => {
      await gapi.auth2
        .init({
          client_id: NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        })
        .then((googleAuth) => {
          const signedIn = googleAuth.isSignedIn.get()
          setIsSignedIn(signedIn)
          const googleUser = googleAuth.currentUser.get()
          if (!googleUser) {
            setLoading(false)
            return
          }
          const profile = googleUser.getBasicProfile()
          const authResponse = googleUser.getAuthResponse(true)
          if (!profile || !authResponse) {
            setLoading(false)
            return
          }
          const userInfo = {
            id: profile.getId(),
            name: profile.getName(),
            email: profile.getEmail(),
            imageUrl: profile.getImageUrl(),
          } as unknown as UserInfo
          setGoogleAuth(googleAuth)
          setGoogleUser(userInfo)
          setLoading(false)
        })
    })
  }

  useEffect(() => {
    if (googleAuth) {
      try {
        console.log('Changed', googleAuth)
        googleAuth.isSignedIn.listen(setIsSignedIn)
      } catch (e) {
        // setError(e);
      }
    }
  }, [googleAuth])

  const loadScript = () => {
    const firstScriptTag = document.getElementsByName('script')[0]
    const scriptElement = document.createElement('script')
    scriptElement.src = 'https://apis.google.com/js/platform.js'
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(firstScriptTag, scriptElement)
    } else {
      document.head.appendChild(scriptElement)
    }
    scriptElement.onload = initGoogleAuth
  }

  useEffect(() => {
    loadScript()
  }, [])

  const signIn = async () => {
    return gapi.auth2.getAuthInstance().signIn()
  }

  const signOut = async () => {
    return gapi.auth2.getAuthInstance().signOut()
  }

  const idTokenRefresh = async () => {
    return gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true).id_token
  }

  return { googleAuth, loading, isSignedIn, googleUser, signIn, signOut, idTokenRefresh }
}

export default useGoogleAuth
