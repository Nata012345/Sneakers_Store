// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCvozpwA-bBjX_U7gzPY-B-aPAgcQfai8Y",
    authDomain: "sneakers-62b3e.firebaseapp.com",
    projectId: "sneakers-62b3e",
    storageBucket: "sneakers-62b3e.firebasestorage.app",
    messagingSenderId: "700766040161",
    appId: "1:700766040161:web:3429227c1301b91726ba20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
