// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {get, getDatabase} from 'firebase/database'
import {getStorage} from 'firebase/storage'
import {getDoc, deleteDoc, updateDoc, doc, addDoc, getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBckRBYLPum-Hxg7NTXLyBDHzi6pF9DQ3s",
  authDomain: "nextfirebase-54a68.firebaseapp.com",
  projectId: "nextfirebase-54a68",
  storageBucket: "nextfirebase-54a68.appspot.com",
  messagingSenderId: "1083455947685",
  appId: "1:1083455947685:web:60b1196f96d47ac9bf9e4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const firestore = getFirestore()
const storage = getStorage()
export {firestore, storage, auth}