import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC0VS1JinWiF0R4arwF6e2pJzwJ4FqFzQE",
  authDomain: "fir-authentication-812.firebaseapp.com",
  projectId: "fir-authentication-812",
  storageBucket: "fir-authentication-812.appspot.com",
  messagingSenderId: "404294872226",
  appId: "1:404294872226:web:9e9fae16babdfa0e7bbbfb",
  measurementId: "G-4X2QMGNY70",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const messaging = getMessaging(app);


export default app;

export const db = getFirestore(app);

