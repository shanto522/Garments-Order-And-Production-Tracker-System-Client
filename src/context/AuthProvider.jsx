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
  const [role, setRole] = useState(null);
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
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          const res = await fetch(
            `http://localhost:3000/users/role/${currentUser.email}`
          );
          const data = await res.json();
          setRole(data.role); // admin/manager/customer
        } catch (err) {
          console.log("Role fetch error:", err);
          setRole(null);
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    role,
    loading,
    signInFunc,
    signUpFunc,
    signOutFunc,
    signInWithPopupGoogleFunc,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
