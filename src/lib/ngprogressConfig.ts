import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import Router from 'next/router'

export const configureNProgress = () => {
  Router.events.on('routeChangeStart', () => NProgress.start())
  Router.events.on('routeChangeComplete', () => {
    if (typeof window !== 'undefined') window.scrollTo(0, 0)
    NProgress.done()
  })
  Router.events.on('routeChangeError', () => NProgress.done())
  NProgress.configure({ showSpinner: false })
};
