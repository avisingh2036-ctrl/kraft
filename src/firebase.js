// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMAdTVLD-1A2YXLX_57l5kwZidaCTL9es",
  authDomain: "kraft-478de.firebaseapp.com",
  projectId: "kraft-478de",
  storageBucket: "kraft-478de.firebasestorage.app",
  messagingSenderId: "1086824892185",
  appId: "1:1086824892185:web:cefcb98a5a9238f9eaa788",
  measurementId: "G-HDE84NEZR4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);