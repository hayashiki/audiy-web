import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

import { Loading } from '@/components/Common/Loading'
import Meta from '@/components/Head/head'
import Messaging from '@/components/Messaging/messaging'
import Notification from '@/components/Notification/Notification'
import Sentry from '@/components/Sentry/Sentry'
import ToolbarBottomLine from '@/components/Topbar/ToolbarLine'
import TopBar from '@/components/Topbar/Topbar'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { configureNProgress } from '@/lib/ngprogressConfig'
import getTheme from '@/theme'

configureNProgress()

function App({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter()

  // React.useEffect(() => {
  //   // Remove the server-side injected CSS.
  //   const jssStyles = document.querySelector('#jss-server-side')
  //   if (jssStyles) {
  //     jssStyles.parentElement?.removeChild(jssStyles)
  //   }
  // }, [])
  //
  // const { isLoading, isAuthenticated, user } = useAuth()
  //
  // if (isLoading) {
  //   console.log("loading")
  //   return (
  //     <React.Fragment>
  //       <Head>
  //         <title>audiy</title>
  //         <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
  //         <Meta />
  //       </Head>
  //       <div
  //         style={{
  //           alignItems: 'center',
  //           display: 'flex',
  //           justifyContent: 'center',
  //           height: '100vh',
  //           width: '100vw',
  //         }}
  //       >
  //         <Loading />
  //       </div>
  //     </React.Fragment>
  //   )
  // }
  //
  // if (!user && !isLoading && router.pathname !== '/login' && router.pathname !== '/register') {
  //   console.log("second")
  //   router.push('/login')
  //   return (
  //     <div
  //       style={{
  //         alignItems: 'center',
  //         display: 'flex',
  //         justifyContent: 'center',
  //         height: '100vh',
  //         width: '100vw',
  //       }}
  //     >
  //       <Loading />
  //     </div>
  //   )
  // }

  return (
    <React.Fragment>
      <Head>
        <title>audiy</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <Meta />
      </Head>
      {/*<UseApollo userInfo={googleUser!} googleAuth={googleAuth!} {...appProps} />*/}
      {/*<Messaging />*/}
      <AuthProvider>
        <Notification>
          <ThemeProvider theme={getTheme('light')}>
            <CssBaseline />
            {/*<Sentry userDTO={user!} />*/}
            {/*{router.pathname !== '/login' && <TopBar userDTO={user!} />}*/}
            <ToolbarBottomLine />
            <Component {...pageProps} />
          </ThemeProvider>
        </Notification>
      </AuthProvider>
    </React.Fragment>
  )
}

export default App
//
// function UseApollo({
//   userInfo,
//   googleAuth,
//   Component,
//   pageProps,
// }: AppProps & { userInfo: UserInfo; googleAuth: gapi.auth2.GoogleAuth }) {
//   const apolloClient = useApollo(pageProps.initialApolloState, googleAuth)
//   const router = useRouter()
//
//   return (
//     // <ApolloProvider client={apolloClient}>
//       <AuthedApolloProvider>
//         <ThemeProvider theme={getTheme('light')}>
//           <CssBaseline />
//           {router.pathname !== '/login' && <TopBar userInfo={userInfo} />}
//           <ToolbarBottomLine />
//           <Component {...pageProps} />
//         </ThemeProvider>
//       </AuthedApolloProvider>
//     // </ApolloProvider>
//   )
// }
