/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyC0VS1JinWiF0R4arwF6e2pJzwJ4FqFzQE",
  authDomain: "fir-authentication-812.firebaseapp.com",
  projectId: "fir-authentication-812",
  storageBucket: "fir-authentication-812.appspot.com",
  messagingSenderId: "404294872226",
  appId: "1:404294872226:web:9e9fae16babdfa0e7bbbfb",
  measurementId: "G-4X2QMGNY70",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});