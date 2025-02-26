import { createContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { useLocation } from "react-router-dom";

// import axios from "axios";
import { auth } from "../firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const axiosPublic = useAxiosPublic();

  const updatedUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log('current user',currentUser)
      setUser(currentUser);
      if(currentUser){
        const userInfo = {email:currentUser.email};

        axiosPublic.post('/jwt',userInfo)
        .then(res=>{
          if(res.data.token){
            localStorage.setItem('access token', res.data.token);
          }
        })


      }
      else{
        localStorage.removeItem('access token');

      }
      // if (currentUser?.email) {
      //   const user = { email: currentUser.email };
      //   axios
      //     .post(`https://artifacts-server-site.vercel.app/jwt`, user, {
      //       withCredentials: true,
      //     })
      //     .then((res) => {
      //       console.log("login", res.data);
      //       setLoading(false);
      //     });
      // } else {
      //   axios
      //     .post(
      //       "https://artifacts-server-site.vercel.app/logout",
      //       {},
      //       {
      //         withCredentials: true,
      //       }
      //     )
      //     .then((res) => {
      //       console.log("logout", res.data);
      //       setLoading(false);
      //     });
      // }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const authInfo = {
    user,
    setUser,
    signInWithGoogle,
    createNewUser,
    logOut,
    userLogin,
    loading,
    updatedUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
