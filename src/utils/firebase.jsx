// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDuAM_GkezWCF2P-u6qkXsOkqt77cz5tCc",
  authDomain: "ems-kitchin-b2aa5.firebaseapp.com",
  projectId: "ems-kitchin-b2aa5",
  storageBucket: "ems-kitchin-b2aa5.appspot.com",
  messagingSenderId: "1034198949154",
  appId: "1:1034198949154:web:35921ee3b3ee761902197b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(firebaseConfig);

export const auth = getAuth();
