// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJhRMn6i_V3UA-XLNhGu5UoNM9STzB4lk",
  authDomain: "house-listings-app.firebaseapp.com",
  projectId: "house-listings-app",
  storageBucket: "house-listings-app.appspot.com",
  messagingSenderId: "481903239429",
  appId: "1:481903239429:web:23ad5e411bcf4a90da576c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);