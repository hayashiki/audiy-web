import Head from 'next/head'
import React from 'react'

export const Meta = () => (
  <>
    <meta name="msapplication-square70x70logo" content="/site-tile-70x70.png" />
    <meta name="msapplication-square150x150logo" content="/site-tile-150x150.png" />
    <meta name="msapplication-wide310x150logo" content="/site-tile-310x150.png" />
    <meta name="msapplication-square310x310logo" content="/site-tile-310x310.png" />
    <meta name="msapplication-TileColor" content="#0078d7" />
    <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="/favicon.ico" />
    <link rel="icon" type="image/vnd.microsoft.icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
    <link rel="icon" type="image/png" sizes="36x36" href="/android-chrome-36x36.png" />
    <link rel="icon" type="image/png" sizes="48x48" href="/android-chrome-48x48.png" />
    <link rel="icon" type="image/png" sizes="72x72" href="/android-chrome-72x72.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="/android-chrome-96x96.png" />
    <link rel="icon" type="image/png" sizes="128x128" href="/android-chrome-128x128.png" />
    <link rel="icon" type="image/png" sizes="144x144" href="/android-chrome-144x144.png" />
    <link rel="icon" type="image/png" sizes="152x152" href="/android-chrome-152x152.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
    <link rel="icon" type="image/png" sizes="256x256" href="/android-chrome-256x256.png" />
    <link rel="icon" type="image/png" sizes="384x384" href="/android-chrome-384x384.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
    <link rel="icon" type="image/png" sizes="36x36" href="/icon-36x36.png" />
    <link rel="icon" type="image/png" sizes="48x48" href="/icon-48x48.png" />
    <link rel="icon" type="image/png" sizes="72x72" href="/icon-72x72.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="/icon-96x96.png" />
    <link rel="icon" type="image/png" sizes="128x128" href="/icon-128x128.png" />
    <link rel="icon" type="image/png" sizes="144x144" href="/icon-144x144.png" />
    <link rel="icon" type="image/png" sizes="152x152" href="/icon-152x152.png" />
    <link rel="icon" type="image/png" sizes="160x160" href="/icon-160x160.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
    <link rel="icon" type="image/png" sizes="196x196" href="/icon-196x196.png" />
    <link rel="icon" type="image/png" sizes="256x256" href="/icon-256x256.png" />
    <link rel="icon" type="image/png" sizes="384x384" href="/icon-384x384.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/icon-16x16.png" />
    <link rel="icon" type="image/png" sizes="24x24" href="/icon-24x24.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/icon-32x32.png" />
    <link rel="manifest" href="/manifest.json" />

    {/*<meta name="application-name" content="PWA App" />*/}
    {/*<meta name="apple-mobile-web-app-capable" content="yes" />*/}
    {/*<meta name="apple-mobile-web-app-status-bar-style" content="default" />*/}
    {/*<meta name="apple-mobile-web-app-title" content="PWA App" />*/}
    {/*<meta name="description" content="Best PWA App in the world" />*/}
    {/*<meta name="format-detection" content="telephone=no" />*/}
    {/*<meta name="mobile-web-app-capable" content="yes" />*/}
    {/*<meta name="msapplication-config" content="/icons/browserconfig.xml" />*/}
    {/*<meta name="msapplication-TileColor" content="#2B5797" />*/}
    {/*<meta name="msapplication-tap-highlight" content="no" />*/}
    {/*<meta name="theme-color" content="#000000" />*/}

    {/*<link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />*/}
    {/*<link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />*/}
    {/*<link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />*/}
    {/*<link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />*/}

    {/*<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />*/}
    {/*<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />*/}
    {/*<link rel="manifest" href="/manifest.json" />*/}
    {/*<link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />*/}
    {/*<link rel="shortcut icon" href="/favicon.ico" />*/}
    {/*<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />*/}

    {/*<meta name="twitter:card" content="summary" />*/}
    {/*<meta name="twitter:url" content="https://yourdomain.com" />*/}
    {/*<meta name="twitter:title" content="PWA App" />*/}
    {/*<meta name="twitter:description" content="Best PWA App in the world" />*/}
    {/*<meta name="twitter:image" content="https://yourdomain.com/icons/android-chrome-192x192.png" />*/}
    {/*<meta name="twitter:creator" content="@DavidWShadow" />*/}
    {/*<meta property="og:type" content="website" />*/}
    {/*<meta property="og:title" content="PWA App" />*/}
    {/*<meta property="og:description" content="Best PWA App in the world" />*/}
    {/*<meta property="og:site_name" content="PWA App" />*/}
    {/*<meta property="og:url" content="https://yourdomain.com" />*/}
    {/*<meta property="og:image" content="https://yourdomain.com/icons/apple-touch-icon.png" />*/}
  </>
)

export default Meta
