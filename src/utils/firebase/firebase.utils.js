import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBSMWBQz12MUwFJjOrhkoH7wBOXGFjfWSE",
  authDomain: "crown-project-e4667.firebaseapp.com",
  projectId: "crown-project-e4667",
  storageBucket: "crown-project-e4667.appspot.com",
  messagingSenderId: "827261316638",
  appId: "1:827261316638:web:70e69a1fdeabd5abe9080f",
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();
export const SignInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userauth) => {
  const userDocRef = doc(db, "users", userauth.uid);
  const userSnapShot = await getDoc(userDocRef);
  if (!userSnapShot.exists()) {
    const { displayName, email } = userauth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error for creating name", error.message);
    }
  }
  return userDocRef;
};
