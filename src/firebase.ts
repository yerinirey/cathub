import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCqR8SsCI7BuBS-p01y2tLdOf9wckD1XRM",
  authDomain: "cathub-fb0e0.firebaseapp.com",
  projectId: "cathub-fb0e0",
  storageBucket: "cathub-fb0e0.appspot.com",
  messagingSenderId: "200031393595",
  appId: "1:200031393595:web:f26b7e1825ed7aa159891e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);
export const db = getFirestore(app);
