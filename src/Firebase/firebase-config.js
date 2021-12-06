// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCinpgkvKuKF838P8F0igaKgTnFAq11Yk0",
  authDomain: "book-13e8c.firebaseapp.com",
  projectId: "book-13e8c",
  storageBucket: "book-13e8c.appspot.com",
  messagingSenderId: "294094509611",
  appId: "1:294094509611:web:ed5ed2de49270af051bc6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);