import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import getTheme from '@/theme'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import TopBar from '@/components/Topbar'

function App({ Component, pageProps }: AppProps): JSX.Element {
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
      <ThemeProvider theme={getTheme('light')}>
        <CssBaseline />
        <TopBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
