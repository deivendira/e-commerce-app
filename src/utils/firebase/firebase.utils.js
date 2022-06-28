import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBSMWBQz12MUwFJjOrhkoH7wBOXGFjfWSE",
  authDomain: "crown-project-e4667.firebaseapp.com",
  projectId: "crown-project-e4667",
  storageBucket: "crown-project-e4667.appspot.com",
  messagingSenderId: "827261316638",
  appId: "1:827261316638:web:70e69a1fdeabd5abe9080f",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const googleprovider = new GoogleAuthProvider();
googleprovider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();
export const SignInWithGooglePopup = () =>
  signInWithPopup(auth, googleprovider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("done");
};

export const getcategoryAndDocument = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querysnapShot = await getDocs(q);

  return querysnapShot.docs.map((docsnapshot) => docsnapshot.data());
  // const categoryMap = querysnapShot.docs.reduce((acc, currentdoc) => {
  //   const { title, items } = currentdoc.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});
  // return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userauth,
  additionalInfromation = {}
) => {
  if (!userauth) return;
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
        ...additionalInfromation,
      });
    } catch (error) {
      console.log("error for creating name", error.message);
    }
  }
  return userDocRef;
};
export const createUserAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInUserAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
export const SignOutUser = async () => {
  signOut(auth);
};
export const onAuthStateChangedListerner = (callback) => {
  onAuthStateChanged(auth, callback);
};
