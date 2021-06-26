import { useMemo } from 'react'
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, makeVar, NormalizedCacheObject } from '@apollo/client'
import { AudioFragment } from '@/generated/graphql'

export const audioVar = makeVar({} as AudioFragment)

let apolloClient: ApolloClient<NormalizedCacheObject>
const isBrowser = typeof window === 'undefined'

const GQL_URI = 'http://localhost:8080'

const httpLink = (token?: string) =>
  new HttpLink({
    uri: `${GQL_URI}/query`,
    // headers: {
    //   authorization: token ? token : '',
    // },
  })

const getAuth = () => {
  return ''
}

export function createApolloClient(token?: string) {
  try {
    console.log('createApolloClient', token)
    return new ApolloClient({
      ssrMode: !isBrowser,
      link: ApolloLink.from([
        // onError() => {},
        // authLink,
        httpLink(token),
      ]),
      cache: new InMemoryCache(),
    })
  } catch (error) {
    console.error('fail to create apollo client', error)
  }
}

export const initializeApollo = (
  initialState: NormalizedCacheObject | null = null,
  token?: string, // token?.string かも
): ApolloClient<NormalizedCacheObject> => {
  const _apolloClient = apolloClient ?? createApolloClient(token)

  if (initialState) {
    _apolloClient.cache.restore(initialState)
  }
  if (!isBrowser) return _apolloClient
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export const useApollo = (
  initialState: NormalizedCacheObject,
  token?: string,
): ApolloClient<NormalizedCacheObject> => {
  const store = useMemo(() => initializeApollo(initialState, token), [initialState])
  return store
}
