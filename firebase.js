// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPhoneNumber,PhoneAuthProvider,signInWithCredential } from 'firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getFirestore,collection } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8MYUzzQBuPN3ZC6NdqRRtz7KIXETUbTo",
  authDomain: "foodordering-14fc8.firebaseapp.com",
  projectId: "foodordering-14fc8",
  storageBucket: "foodordering-14fc8.appspot.com",
  messagingSenderId: "377870222431",
  appId: "1:377870222431:web:7f8633901f46b90547c7ea",
  measurementId: "G-HZV6CSQDDC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(app);
const firestore = getFirestore(app);


export { auth, googleProvider,signInWithPhoneNumber,PhoneAuthProvider,firebaseConfig,signInWithCredential,firestore};