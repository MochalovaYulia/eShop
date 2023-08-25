import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCdglbEfpxovRaNrqB-atqPqb4-B5DiF8c",
  authDomain: "eshop-bf681.firebaseapp.com",
  projectId: "eshop-bf681",
  storageBucket: "eshop-bf681.appspot.com",
  messagingSenderId: "355198821085",
  appId: "1:355198821085:web:a08518ac9753fe708a7134"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app) 
export const db = getFirestore(app) 
export const storage = getStorage(app) 

export default app