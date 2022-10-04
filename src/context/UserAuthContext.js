import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  FacebookAuthProvider,
} from "firebase/auth";

import { auth, db } from "../Firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const usersCollectionRef = collection(db, "Apurv-project");

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }
  function facebookSignIn() {
    const facebookAuthProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, facebookAuthProvider);
  }
  const getUsers = async () => {
    const newData = await getDocs(usersCollectionRef);
    setData(newData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const createUser = async (
    firstname,
    lastname,
    email,
    contactno,
    password
  ) => {
    await addDoc(usersCollectionRef, {
      firstname: firstname,
      lastname: lastname,
      email: email,
      contactno: Number(contactno),
      password: Number(password),
    });
  };
  const deleteUser = async (id) => {
    const userDoc = doc(db, "Apurv-project", id);
    console.log("__userDoc", userDoc);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        usersCollectionRef,
        data,
        getUsers,
        createUser,
        deleteUser,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        resetPassword,
        facebookSignIn,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
