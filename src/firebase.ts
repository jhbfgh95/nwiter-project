// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYSFx43EG1_sxfoA-LGOgd8eNWXbU_e0M",
  authDomain: "pwitter-fb150.firebaseapp.com",
  projectId: "pwitter-fb150",
  storageBucket: "pwitter-fb150.appspot.com",
  messagingSenderId: "15563251586",
  appId: "1:15563251586:web:14ee98f38dd7df497f399b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const database = getFirestore(app);
