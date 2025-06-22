// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8wF7xo0xLbZj4LSn5kglGvmBBXnzspcs",
  authDomain: "stock-predictor-56a3b.firebaseapp.com",
  projectId: "stock-predictor-56a3b",
  storageBucket: "stock-predictor-56a3b.firebasestorage.app",
  messagingSenderId: "253055615586",
  appId: "1:253055615586:web:6cc2430cc50dcfe3fe473b",
  measurementId: "G-XYEWDGM68T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);