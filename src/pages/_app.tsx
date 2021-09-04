import { ApolloProvider } from '@apollo/client'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

import { Loading } from '@/components/Common/Loading'
import ToolbarBottomLine from '@/components/Topbar/ToolbarLine'
import TopBar from '@/components/Topbar/Topbar'
import useGoogleAuth from '@/hooks/useLogin'
import { useApollo } from '@/lib/apollo'
import { configureNProgress } from '@/lib/ngprogressConfig'
import getTheme from '@/theme'
import { ConvertToUser, UserInfo } from '@/types/userInfo'

configureNProgress()

function App(appProps: AppProps): JSX.Element {
  const router = useRouter()

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  const { loading, isSignedIn, googleUser, googleAuth } = useGoogleAuth()

  if (loading) {
    return (
      <React.Fragment>
        <Head>
          <title>audiy</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
          }}
        >
          <Loading />
        </div>
      </React.Fragment>
    )
  }

  if (!googleUser && !loading && router.pathname !== '/login' && router.pathname !== '/register') {
    console.log('Not logged in', googleUser, isSignedIn, loading)
    router.push('/login')
    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <Loading />
      </div>
    )
  }

  return (
    <React.Fragment>
      <Head>
        <title>audiy</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <UseApollo userInfo={googleUser!} googleAuth={googleAuth!} {...appProps} />
    </React.Fragment>
  )
}

export default App

function UseApollo({
  userInfo,
  googleAuth,
  Component,
  pageProps,
}: AppProps & { userInfo: UserInfo; googleAuth: gapi.auth2.GoogleAuth }) {
  const apolloClient = useApollo(pageProps.initialApolloState, googleAuth)
  const router = useRouter()

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={getTheme('light')}>
        <CssBaseline />
        {router.pathname !== '/login' && <TopBar userInfo={userInfo} />}
        <ToolbarBottomLine />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  )
}
