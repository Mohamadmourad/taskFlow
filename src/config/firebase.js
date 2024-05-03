import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { EmailAuthCredential } from "firebase/auth/cordova";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "......................",
  authDomain: "task-flow-c1a2b.firebaseapp.com",
  projectId: "..............",
  storageBucket: "task-flow-c1a2b.appspot.com",
  messagingSenderId: "988442365584",
  appId: "1:988442365584:web:0a9c34a568f499794d5215"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
export const emailAuth = new EmailAuthCredential();