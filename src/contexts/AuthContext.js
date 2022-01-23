import { useState, useEffect, useContext, createContext } from 'react';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

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
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }

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

  const signinWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const { user } = await signInWithPopup(auth, provider);

    return user;
  }

  /**
   * Function to handle sign out.
   */
  const logOut = () => {
    signOut(auth);
  }

  /**
   * Function to handle reset password.
   * @param {String} email email address
   */
  const sendPasswordResetEmailLink = async (email) => {
    await sendPasswordResetEmail(auth, email);
  }

  /**
   * Function to get user snapshot from firebase.
   * @param {String} uid user id
   * @returns 
   */
  const getUserFromDB = async (uid) => {
    const userDocRef = doc(db, 'users', uid);
    return await getDoc(userDocRef);
  }

  const saveUserDetailsToDB = (uid, name, email) => {
    // create user object to save in db
    const userData = {
      name,
      email,
      timestamp: serverTimestamp(),
    };

    // save user object to db
    setDoc(doc(db, 'users', uid), userData);
  }

  /**
   * Function to update user profile in db.
   * @param {String} uid user ID
   * @param {{displayName, email}} userData user object with property to update
   */
  const updateUserDetails = async (userData = {}) => {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userRef, userData);
  }

  /**
   * Function to update user's display name.
   * @param {String} name user's profile name
   */
  const updateName = async (name) => {
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
  }

  // values shared between all components
  const value = {
    signup,
    signin,
    signinWithGoogle,
    logOut,
    sendPasswordResetEmailLink,
    updateName,
    saveUserDetailsToDB,
    updateUserDetails,
    getUserFromDB,
    isLoading,
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
