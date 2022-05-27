
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCl1CvuzryNERRwTtf0Z36aOuwne385pA",
  authDomain: "bjjcourses-63a0e.firebaseapp.com",
  projectId: "bjjcourses-63a0e",
  storageBucket: "bjjcourses-63a0e.appspot.com",
  messagingSenderId: "834065679661",
  appId: "1:834065679661:web:36cccebf5ce63b4f06ffa4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export default app
