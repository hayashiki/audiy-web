import React, { useReducer } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import getTheme from '@/theme'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import { useApollo } from '@/lib/apollo'
import TopBar from '@/components/Topbar'
import { ApolloProvider } from '@apollo/client'
import { configureNProgress } from '@/lib/ngprogressConfig'

configureNProgress();

function App({ Component, pageProps }: AppProps): JSX.Element {
  const apolloClient = useApollo(pageProps.initialApolloState)

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>hayashiki | scaffold </title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={getTheme('light')}>
          <CssBaseline />
          <TopBar />
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </React.Fragment>
  )
}

export default App
