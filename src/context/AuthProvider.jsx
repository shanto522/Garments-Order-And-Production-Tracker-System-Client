// src/context/AuthProvider.jsx
import React, { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  const signInFunc = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUpFunc = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithPopupGoogleFunc = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const signOutFunc = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // CHANGE MARKED: এখানে আমরা role ধরে রাখছি।
      // উদাহরণ স্বরূপ ধরে নিচ্ছি user metadata এ role আছে (admin/manager/buyer)
      if (currentUser) {
        const role = currentUser?.role || "buyer"; // default buyer
        setUser({ ...currentUser, role }); // CHANGE MARKED
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    role: user?.role, // CHANGE MARKED: role access যোগ করা হয়েছে
    setUser,
    show,
    setShow,
    loading,
    setLoading,
    signInWithPopupGoogleFunc,
    signOutFunc,
    signInFunc,
    signUpFunc,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  ); // CHANGE MARKED: <AuthContext> -> <AuthContext.Provider>
};

export default AuthProvider;
