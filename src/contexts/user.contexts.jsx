import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListerner,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});
export const UseProvider = ({ children }) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListerner((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      console.log(user);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
