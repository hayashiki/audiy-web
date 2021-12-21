import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  Observable,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import * as sentry from '@sentry/browser'
import { createUploadLink } from 'apollo-upload-client'
import { useMemo } from 'react'

import { NEXT_PUBLIC_GQL_URL } from '@/lib/config'

let apolloClient: ApolloClient<NormalizedCacheObject>
const isBrowser = typeof window === 'undefined'

const isDev = () => !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export const gqlServerURL = () => {
  if (isDev()) {
    return 'http://localhost:8080'
  }
  return NEXT_PUBLIC_GQL_URL
}

const httpLink = new HttpLink({
  uri: `${gqlServerURL()}/query`,
  // credentials: 'same-origin',
})

const getAccessToken = () => {
  return gapi.auth2?.getAuthInstance()?.currentUser.get().getAuthResponse(true).id_token
}

const httpLink2 = (token: string) => {
  return createUploadLink({
    uri: `${gqlServerURL()}/query`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

const uploadLink2 = (token?: string) => {
  // const id_token = gapi.auth2?.getAuthInstance()?.currentUser.get().getAuthResponse(true).id_token

  return new HttpLink({
    uri: `${gqlServerURL()}/query`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

const uploadLink = (token?: string) => {
  return createUploadLink({
    ...httpLink,
    fetch(uri: string, opts: any) {
      // enforce our JSON headers
      delete opts.headers['accept']
      delete opts.headers['content-type']

      opts.headers['Accept'] = opts.headers['Content-Type'] = 'application/json'
      opts.headers['Authorization'] = `Bearer ` + token

      // return our fetch
      return fetch(`${gqlServerURL()}/query`, opts)
    },
  })
}

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
              const id_token = gapi.auth2
                ?.getAuthInstance()
                ?.currentUser.get()
                .getAuthResponse().id_token

              operation
                .setContext(({ headers = {} }) => ({
                  headers: {
                    ...headers,
                    Authorization: `Bearer ${id_token}` || null,
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
          const accessToken = getAccessToken()
          if (accessToken) {
            op.setContext({
              headers: {
                Authorization: `Bearer ${accessToken}`,
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

export function createApolloClient(googleAuth?: gapi.auth2.GoogleAuth) {
  try {
    return new ApolloClient({
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
        // httpLink2(googleAuth?.currentUser.get().getAuthResponse(true).id_token),
        // uploadLink(googleAuth?.currentUser.get().getAuthResponse(true).id_token),
      ]),
      cache: new InMemoryCache(),
    })
  } catch (error) {
    console.error('fail to create apollo client', error)
  }
}

export const initializeApollo = (
  initialState: NormalizedCacheObject | null = null,
  googleAuth?: gapi.auth2.GoogleAuth,
): ApolloClient<NormalizedCacheObject> => {
  const _apolloClient = apolloClient ?? createApolloClient(googleAuth)

  if (initialState) {
    _apolloClient.cache.restore(initialState)
  }
  if (!isBrowser) return _apolloClient
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export const useApollo = (
  initialState: NormalizedCacheObject,
  googleAuth?: gapi.auth2.GoogleAuth,
): ApolloClient<NormalizedCacheObject> => {
  const store = useMemo(() => initializeApollo(initialState, googleAuth), [initialState])
  return store
}
