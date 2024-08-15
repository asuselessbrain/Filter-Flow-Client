import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { createContext } from "react";
import { auth } from "../firebaseConfig/firebase.config";
import { signInWithPopup } from "firebase/auth";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {

    const provider = new GoogleAuthProvider();

    const googleLogin = () => {
        return signInWithPopup(auth, provider)
    }

  const value = {
    googleLogin,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
