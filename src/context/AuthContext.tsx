import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  Observable,
  split,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { getMainDefinition } from '@apollo/client/utilities'
import * as sentry from '@sentry/browser'
import {
  signInWithPopup,
  signOut,
  onIdTokenChanged,
  GoogleAuthProvider,
  getAuth,
  User,
} from 'firebase/auth'
import Router, { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'

// import { useCreateUserMutation } from '@/generated/graphql'
import firebase, { UserMapper } from '@/lib/firebase/firebase'
import { FirebaseUser, UserDTO } from '@/types/userInfo'

type AuthContextProps = {
  user: UserDTO | null
  signInWithGoogle: (redirectUrl?: string) => Promise<void>
  signout: () => Promise<void>
  isLoading: boolean
  isAuthenticated: boolean
}

const auth = getAuth(firebase)

const AuthContext = createContext<AuthContextProps>({
  user: null,
  signInWithGoogle: async () => {
    return
  },
  signout: async () => {
    return
  },
  isLoading: true,
  isAuthenticated: false,
})

const isBrowser = typeof window === 'undefined'

export const AuthProvider: React.FC = ({ children }) => {
  const authData = useProvideAuth()

  console.log('authData', authData)
  // if (!authData.isAuthenticated) {
  //   return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  // }

  // const authLink = setContext(async (_, { headers }) => {
  //   const token = await getAuth().currentUser?.getIdToken()
  //   return {
  //     headers: {
  //       ...headers,
  //       authorization: `Bearer ${token}`,
  //     },
  //   }
  // })

  const httpLink = createHttpLink({
    uri: 'http://localhost:8080/query',
  })

  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      sentry.captureException(null, {
        level: sentry.Severity.Critical,
        extra: {
          networkError,
          graphQLErrors,
          operation,
        },
      })

      // User access token has expired
      graphQLErrors.forEach(({ extensions, message, locations, path }) => {
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        if (extensions && extensions.code) {
          switch (extensions.code) {
            case 'UNAUTHENTICATED':
              console.log('UNAUTHENTICATED')

              return new Observable((observer) => {
                const token = getAuth().currentUser?.getIdToken()
                operation
                  .setContext(({ headers = {} }) => ({
                    headers: {
                      ...headers,
                      Authorization: `Bearer ${token}` || null,
                    },
                  }))
                  .then(() => {
                    const subscriber = {
                      next: observer.next.bind(observer),
                      error: observer.error.bind(observer),
                      complete: observer.complete.bind(observer),
                    }
                    forward(operation).subscribe(subscriber)
                  })
                  .catch((error: any) => {
                    observer.error(error)
                  })
              })
            default:
              console.log('pass')
          }
        }
      })
    }
  })

  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable((observer: any) => {
        let handle: any
        Promise.resolve(operation)
          .then((op: any) => {
            const token = getAuth().currentUser?.getIdToken()
            if (token) {
              op.setContext({
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
            }
          })
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            })
          })
          .catch(observer.error.bind(observer))

        return () => {
          if (handle) {
            handle.unsubscribe()
          }
        }
      }),
  )

  // const link =
  //   typeof window === 'undefined'
  //     ? authLink.concat(httpLink)
  //     : split(
  //         // split based on operation type
  //         ({ query }) => {
  //           const definition = getMainDefinition(query)
  //           return (
  //             definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  //           )
  //         },
  //         authLink.concat(httpLink),
  //       )

  const client = new ApolloClient({
    ssrMode: !isBrowser,
    link: ApolloLink.from([
      onError(({ graphQLErrors, operation, networkError, forward }) => {
        if (graphQLErrors) {
          graphQLErrors.forEach(
            ({ message, locations, path }) =>
              console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
              ), // eslint-disable-line no-console
          )
        }
        if (networkError) {
          console.log(`[Network error]: ${networkError}`) // eslint-disable-line no-console
        }
      }),
      errorLink,
      requestLink,
      httpLink,
    ]),
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
    </ApolloProvider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

const useProvideAuth = (): AuthContextProps => {
  const router = useRouter()
  const [user, setUser] = useState<UserDTO | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  // const [createUser] = useCreateUserMutation()

  const handleUserChanged = (raw: FirebaseUser): UserDTO | null => {
    if (raw) {
      const user = UserMapper.mapToDTO(raw)
      // createUser(user.uid, user);

      setUser(user)
      setIsLoading(false)
      return user
    }

    setUser(null)
    setIsLoading(false)
    return null
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      try {
        if (user) {
          setUser(UserMapper.mapToDTO(user!))
          setIsAuthenticated(true)
        } else {
          setUser(null)
          setIsAuthenticated(true)
          router.push('/login')
        }
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
      return () => unsubscribe()
    })
  }, [])

  const signInWithGoogle = async (redirectUrl?: string): Promise<void> => {
    setIsLoading(true)
    try {
      const response = await signInWithPopup(auth, new GoogleAuthProvider())
      handleUserChanged(response.user)

      if (redirectUrl) {
        await Router.push(redirectUrl)
      }
      // await createUser({
      //   variables: {
      //     id: response.user.uid,
      //     email: response.user.email!,
      //     name: response.user.displayName!,
      //     photoURL: response.user.photoURL!,
      //   },
      // })
    } catch (error) {
      // TODO: notify sentry
      console.error(
        '[login] Error calling signInWithPopup with the GoogleAuthProvider sign-in',
        error,
      )
    }
  }

  const signout = async (): Promise<void> => {
    await signOut(auth)
    Router.push('/login')
    handleUserChanged(null)
  }

  // useEffect(() => {
  //   const unsubscribe = onIdTokenChanged((auth), async (user) => {
  //     if (user) {
  //       console.log('idToken changed', user)
  //       const token = await user.getIdToken(true)
  //       setToken(token)
  //       handleUserChanged(user)
  //     } else {
  //       console.log("user is null")
  //     }
  //   })
  //
  //   return () => unsubscribe()
  // }, [])

  return {
    user,
    signInWithGoogle,
    signout,
    isLoading,
    isAuthenticated,
  }
}
