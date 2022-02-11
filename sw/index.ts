import { initializeApp } from 'firebase/app'
import { getAuth, initializeAuth, User } from 'firebase/auth'

/**
 * Fixes the global scope to be that of a service worker instead of a web
 * worker.
 * @see {@link https://github.com/Microsoft/TypeScript/issues/11781#issuecomment-503773748}
 * @see {@link https://stackoverflow.com/a/56374158/10023158}
 */
declare const self: ServiceWorkerGlobalScope

const app = initializeApp({
  apiKey: 'AIzaSyBDgDqEXs9GpqHSfPNUml7oX_t69IZQTl8',
  authDomain: 'bulb-audiy.firebaseapp.com',
  projectId: 'bulb-audiy',
  appId: '1:703493914804:web:1e71f8c2d1c30e52aa97e1',
})

const auth = getAuth(app)

/**
 * Returns a promise that resolves with an ID token if available.
 * @return {Promise<?string>} The promise that resolves with an ID token if
 * available. Otherwise, the promise resolves with null.
 */
// async function getIdToken2(): Promise<string | null> {
//   console.log("getIdToken2 event")
//   return new Promise<string | null>((resolve, reject) => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       unsubscribe();
//       if (user) {
//         getIdToken(user).then((idToken) => {
//           console.log("get token from sw", user)
//           resolve(idToken)
//         }, (error) => {
//           resolve(null)
//         })
//       }
//       resolve(null);
//     });
//   });
// }

function getIdToken(): Promise<string | null> {
  return new Promise((resolve) => {
    auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        user
          .getIdToken()
          .then(resolve)
          .catch(() => {
            resolve(null)
          })
      } else {
        resolve(null)
      }
    })
  })
}

/**
 * @see {@link https://stackoverflow.com/q/1420881/10023158}
 * @param {string} url - The URL whose origin is to be returned.
 * @return {string} The origin corresponding to given URL.
 */
function getOriginFromUrl(url: string): string {
  const pathArray = url.split('/')
  const protocol = pathArray[0]
  const host = pathArray[2]
  return `${protocol}//${host}`
}

/**
 * Gets underlying body content if available. Works for text and JSON bodies.
 * @param {Request} req - The request to get the body from.
 * @return {string} The underlying body content in string form.
 */
async function getBodyContent(req: Request): Promise<string | null> {
  // console.log("rgetBodyContent", req.method)
  if (req.method !== 'GET') {
    console.log("req.headers.get('Content-Type')", req.headers.get('Content-Type'))
    const type: string | null = req.headers.get('Content-Type')
    if (type && type.indexOf('json') !== -1) return req.json().then((json) => JSON.stringify(json))
    return req.text()
  }
  return null
}

/**
 * Intercepts fetch requests and appends the Firebase Authentication JWT if it's
 * a same origin request (i.e. it's calling our own API).
 * @see {@link https://firebase.google.com/docs/auth/web/service-worker-sessions}
 * @see {@link https://github.com/FirebaseExtended/firebase-auth-service-worker-sessions}
 */
self.addEventListener('fetch', (event: FetchEvent) => {
  // console.log('fetch event', event)
  event.respondWith(
    (async function () {
      const token = await getIdToken()
      // Try to fetch the resource first after checking for the ID token.
      let req = event.request
      // For same origin https requests, append JWT to header.
      const sameOrigin: boolean = self.location.origin === getOriginFromUrl(event.request.url)
      // console.log(self.location.origin, getOriginFromUrl(event.request.url))
      const secure: boolean =
        self.location.protocol === 'https:' ||
        self.location.hostname === 'localhost' ||
        self.location.hostname === '0.0.0.0'
      // console.log('requestProcessor2', sameOrigin, secure, token)
      // sameOrigin && secure && token
      if (sameOrigin && secure && token) {
        // Clone headers as request headers are immutable.
        // console.log('token', token)
        const headers = new Headers()
        req.headers.forEach((value, key) => {
          headers.append(key, value)
        })
        headers.append('Authorization', 'Bearer ' + token)
        // headers.append('Accept', 'application/json')
        // headers.append('Content-Type', 'application/json')
        // Get the underlying body (text or JSON) content if available.
        const body: string | null = await getBodyContent(req)
        // console.log("body", body)
        try {
          req = new Request(req.url, {
            body,
            headers,
            method: req.method,
            mode: 'same-origin',
            credentials: req.credentials,
            cache: req.cache,
            redirect: req.redirect,
            referrer: req.referrer,
          })
          // console.log('req', req)
        } catch (err) {
          // This will fail for CORS requests. We just continue with the fetch
          // caching logic below and do not pass the ID token.
          console.warn('[WARNING] Error while fetching request:', err)
        }
      }
      return fetch(req)
    })(),
  )
})

/**
 * When a service worker is initially registered, pages won't use it until they
 * next load. The `clients.claim()` method (invoked below) causes those pages to
 * be controlled immediately.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim}
 */
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(self.clients.claim())
})
