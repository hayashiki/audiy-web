import { ApolloProvider } from '@apollo/client'
import React, { FC, useEffect, useState } from 'react'

import useGoogleAuth from '@/hooks/useLogin'
import { createApolloClient } from '@/lib/apollo'

const useApolloClient = () => {
  const { googleAuth } = useGoogleAuth()

  const [apolloClient, setApolloClient] = useState(createApolloClient())

  useEffect(() => {
    setApolloClient(createApolloClient())
  }, [googleAuth?.isSignedIn])

  return apolloClient
}

export const AuthedApolloProvider: FC = ({ children }) => (
  <ApolloProvider client={useApolloClient()!}>{children}</ApolloProvider>
)
