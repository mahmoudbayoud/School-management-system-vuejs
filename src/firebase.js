// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvYiVQQxhFnSpGXSnKxaI8cU0dMCLdtrA",

  authDomain: "chat-457e3.firebaseapp.com",

  projectId: "chat-457e3",

  storageBucket: "chat-457e3.firebasestorage.app",

  messagingSenderId: "236755802248",

  appId: "1:236755802248:web:f767d49396d5c9e264e73d",

  measurementId: "G-SCRRRDKVYF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Auth instances
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
