// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFKFWRFnpUI0gfkTfTtbeu3XhCVpcMDPg",
  authDomain: "notecompass-prod.firebaseapp.com",
  projectId: "notecompass-prod",
  storageBucket: "notecompass-prod.appspot.com",
  messagingSenderId: "332745282032",
  appId: "1:332745282032:web:e94978efe81164ec06cd35",
  measurementId: "G-3MNLKF32TL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();