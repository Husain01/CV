import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBuONdtrGDLOH7p6K4_UF3ahJuJp2PITn8",
  authDomain: "cv-dev-4a95d.firebaseapp.com",
  projectId: "cv-dev-4a95d",
  storageBucket: "cv-dev-4a95d.appspot.com",
  messagingSenderId: "814991701892",
  appId: "1:814991701892:web:b3de0838ba0738dce50fd1",
  measurementId: "G-SF4TV96HNT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
