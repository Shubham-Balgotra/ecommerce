// Import the functions you need from the SDKs 
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink, sendEmailVerification, applyActionCode, setPersistence, browserLocalPersistence} from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR API KEY",
  authDomain: "PROJECT NAME.firebaseapp.com",
  projectId: "PROJECT ID",
  storageBucket: "PROJECT NAME.firebasestorage.app",
  messagingSenderId: "432423432423",
  appId: "APP ID",
  measurementId: "G-1GDF4454DR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
const provider = new GoogleAuthProvider();

export { auth, provider, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink , sendEmailVerification, applyActionCode,setPersistence, browserLocalPersistence};