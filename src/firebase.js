// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXADERyOyGImB_afPy4n9w0E3xBauFYlU", // من ملف google-services.json
  authDomain: "fluttercourse-c08c1.firebaseapp.com", // project_id + .firebaseapp.com
  projectId: "fluttercourse-c08c1", // project_id
  storageBucket: "fluttercourse-c08c1.appspot.com", // عدل الامتداد ليصير appspot.com
  messagingSenderId: "980004947340", // project_number
  appId: "1:980004947340:android:0277eace794490412e82a9", // mobilesdk_app_id
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
