// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "${NEXT_PUBLIC_FIREBASE_API_KEY}",
  authDomain: "bulb-audiy.firebaseapp.com",
  projectId: "bulb-audiy",
  storageBucket: "bulb-audiy.appspot.com",
  messagingSenderId: "703493914804",
  appId: "1:703493914804:web:1e71f8c2d1c30e52aa97e1",
  measurementId: "G-0PX9JHS1S9"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
