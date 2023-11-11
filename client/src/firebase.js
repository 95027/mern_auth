// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-e1cfb.firebaseapp.com",
  projectId: "mern-auth-e1cfb",
  storageBucket: "mern-auth-e1cfb.appspot.com",
  messagingSenderId: "520139176580",
  appId: "1:520139176580:web:0e98b2695571b10d30e0d1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);