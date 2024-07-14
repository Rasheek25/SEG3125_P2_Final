import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCKHBMByAcQ0M_NBa5iuBWe_TALWWk3ekY",
  authDomain: "p2mock.firebaseapp.com",
  projectId: "p2mock",
  storageBucket: "p2mock.appspot.com",
  messagingSenderId: "825630576257",
  appId: "1:825630576257:web:d167aa0c9b886280f94780",
  measurementId: "G-7QVHR4W3G9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
