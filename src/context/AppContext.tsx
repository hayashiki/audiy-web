// つかってない
import { createContext, FC, useContext, useEffect, useRef, useState } from 'react'

const GOOGLE_OAUTH_CLIENT_ID = 'hoge'

export interface GoogleSignInResponse {
  tokenObj: gapi.auth2.AuthResponse
  user: gapi.auth2.GoogleUser
}

type AuthContextState = {
  googleAuth: gapi.auth2.GoogleAuth | null
  currentUser: User | null
  isSignedIn: boolean
  error?: Error
}

// 移動する
type User = {
  id: string
  name: string
  email: string
  imageURL: string
}

const config = {
  clientId: process.env.GOOGLE_CLIENTID,
}

const AuthContext = createContext<AuthContextState>({
  googleAuth: null,
  currentUser: null,
  isSignedIn: false,
})

const AuthProvider: FC = ({ children }) => {
  const [googleAuth, setGoogleAuth] = useState<gapi.auth2.GoogleAuth | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isSignedIn, setIsSignedIn] = useState(googleAuth?.isSignedIn.get() ?? false)
  const auth = useRef<gapi.auth2.GoogleAuth | null>(null)
  const [token, setToken] = useState<gapi.auth2.AuthResponse | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    gapi.load('client:auth2', async () => {
      console.log('GOOGLE_OAUTH_CLIENT_ID', GOOGLE_OAUTH_CLIENT_ID)
      if (!gapi.auth2.getAuthInstance() && !googleAuth) {
        await gapi.auth2
          .init({
            client_id: GOOGLE_OAUTH_CLIENT_ID,
          })
          .then(
            (googleAuth) => {
              console.log(googleAuth)
              setGoogleAuth(googleAuth)
              if (googleAuth.currentUser) {
                setCurrentUser({
                  id: googleAuth.currentUser.get().getBasicProfile().getId(),
                  name: googleAuth.currentUser.get().getBasicProfile().getName(),
                  email: googleAuth.currentUser.get().getBasicProfile().getEmail(),
                  imageURL: googleAuth.currentUser.get().getBasicProfile().getImageUrl(),
                } as User)
              }
              setIsSignedIn(googleAuth.currentUser.get().isSignedIn())
            },
            (e) => setError(Error(`${e.error}: ${e.details}`)),
          )
      }
      // setAuthenticating(false);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleAuth])

  useEffect(() => {
    if (googleAuth) {
      try {
        googleAuth.isSignedIn.listen(setIsSignedIn)
      } catch (e) {
        setError(e)
      }
    }
  }, [googleAuth])

  const signIn = async (): Promise<GoogleSignInResponse> => {
    try {
      await auth.current?.signIn()
      // gapi.auth2.getAuthInstance().signIn();
      //
    } catch (error) {
      await Promise.reject(error)
    }

    // setCurrentUser(auth.current?.currentUser.get()!)
    setToken(auth.current?.currentUser.get().getAuthResponse()!)

    const result = {
      user: auth.current?.currentUser.get()!,
      tokenObj: auth.current?.currentUser.get().getAuthResponse()!,
    }

    return result
  }

  const signOut = async () => {
    return auth.current?.signOut()
  }

  return (
    <AuthContext.Provider value={{ googleAuth, currentUser, isSignedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
