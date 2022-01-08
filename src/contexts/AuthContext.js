import { useState, useEffect, useContext, createContext } from 'react';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';

// create the context
const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  /**
   * Function to handle sign up with email and password.
   * @param {String} email email address
   * @param {String} password password
   * @returns
   */
  const signup = async (email, password) => {
    // create user with email and password
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return user;
  }

  /**
   * Function to handle sign in with email and password.
   * @param {String} email email address
   * @param {String} password password
   * @returns 
   */
  const signin = async (email, password) => {
    // sign in with email and password
    const { user } = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return user;
  }

  const updateDB = (uid, name, email) => {
    // create user object to save in db
    const userData = {
      name,
      email,
      timestamp: serverTimestamp(),
    };

    // save user object to db
    setDoc(doc(db, 'users', uid), userData);
  }

  const updateName = async (name) => {
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
  }

  const updateEmail = async (email) => {
    currentUser.updateEmail(email);
  }

  // values shared between all components
  const value = {
    signup,
    signin,
    updateName,
    updateEmail,
    updateDB,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
