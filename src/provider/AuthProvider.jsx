import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app } from "../firebase/firebase.config.js";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = async ({
    displayName,
    photoURL,
    email,
    password,
  }) => {
    if (!auth.currentUser)
      return Promise.reject(new Error("No user logged in"));

    const user = auth.currentUser;
    const isGoogleUser = user.providerData.some(
      (provider) => provider.providerId === "google.com"
    );

    const promises = [];

    if (displayName || photoURL) {
      promises.push(updateProfile(user, { displayName, photoURL }));
    }

    if (!isGoogleUser) {
      if (email && email !== user.email) {
        promises.push(updateEmail(user, email));
      }
      if (password) {
        promises.push(updatePassword(user, password));
      }
    }

    return Promise.all(promises).then(() => {
      return { ...user };
    });
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    updateUserProfile,
    signInUser,
    logOut,
    signInWithGoogle,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;