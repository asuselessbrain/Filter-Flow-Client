import { createContext } from "react";
import { auth } from "../firebaseConfig/firebase.config";
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {

    const provider = new GoogleAuthProvider();


// google signIn
    const googleSignUp = () => {
        return signInWithPopup(auth, provider)
    }

    // email and password signIn
    const signUpWithEmail = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // update user profile

    const updateUserProfile = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoUrl
          })
    }

    // manage user


  const value = {
    googleSignUp,
    signUpWithEmail,
    updateUserProfile,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
