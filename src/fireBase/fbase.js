// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBlsKQacz2T-FnAwugTWWYtEv-pOB-KCE",
  authDomain: "quizapp-9d642.firebaseapp.com",
  projectId: "quizapp-9d642",
  storageBucket: "quizapp-9d642.appspot.com",
  messagingSenderId: "249649893934",
  appId: "1:249649893934:web:07309ac6a77b42a3f245bf",
  measurementId: "G-R8DMNBNQN0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
