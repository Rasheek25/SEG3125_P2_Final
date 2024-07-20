import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "p2final-b018f.firebaseapp.com",
  projectId: "p2final-b018f",
  storageBucket: "p2final-b018f.appspot.com",
  messagingSenderId: "62919787035",
  appId: "1:62919787035:web:341f652e9deb8db3606ebe",
  measurementId: "G-33XM18MK5E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
