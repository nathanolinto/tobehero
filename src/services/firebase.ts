import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue, remove, get } from  "firebase/database";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain:  process.env.REACT_APP_FB_AUTH_DOMAIN,
    projectId:  process.env.REACT_APP_FB_PROJECT_ID,
    storageBucket:  process.env.REACT_APP_FB_STORAGE_BUCKET,
    messagingSenderId:  process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
    appId:  process.env.REACT_APP_FB_APP_ID
};

// Initialize Firebase
initializeApp(firebaseConfig);
const database = getDatabase();

export  { database, ref, set, push, onValue, remove, get};