import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMXnG10NILckbk0vRs9pRwIdD8cesI8nY",
  authDomain: "aanoorglobal-9578e.firebaseapp.com",
  projectId: "aanoorglobal-9578e",
  storageBucket: "aanoorglobal-9578e.firebasestorage.app",
  messagingSenderId: "935006061972",
  appId: "1:935006061972:web:2aaab065242ff8e9ba3b81",
  measurementId: "G-E3GHESYN4F"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
