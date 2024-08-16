import { createContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig/firebase.config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();

  // google signIn
  const googleSignUp = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // email and password signIn
  const signUpWithEmail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update user profile

  const updateUserProfile = (name, photoUrl) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };


//   login in with email 
const signInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}
  //  logout user

  const logOut = () => {
    return signOut(auth);
  };

  // manage user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user);
      }
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const value = {
    googleSignUp,
    signUpWithEmail,
    updateUserProfile,
    user,
    signInWithEmail,
    logOut
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
