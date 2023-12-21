// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "haven-estate-cd03a.firebaseapp.com",
  projectId: "haven-estate-cd03a",
  storageBucket: "haven-estate-cd03a.appspot.com",
  messagingSenderId: "518254624141",
  appId: "1:518254624141:web:15cb93f3f690718c0c11c4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);