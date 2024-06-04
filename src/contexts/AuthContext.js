import React, { createContext, useState, useEffect,useRef } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, googleProvider } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  // const [verificationId, setVerificationId] = useState(null);
  // const [verificationCode, setVerificationCode] = useState('');

  // // for the google signin
  // const [error, setError] = useState();
  // const [userInfo, setUserInfo] = useState();
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       "377870222431-6u4u969m4occ4m6k6hnfed2o5rdi6c3l.apps.googleusercontent.com",
  //   });
  // }, []);
  // const signin = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const user = await GoogleSignin.signIn();
  //     setUserInfo(user);
  //     setError();
  //   } catch (e) {
  //     setError(e);
  //   }
  // };

  // google sigin ends here
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user); // Access the user from userCredential.user
      navigation.navigate('Main'); // Navigate to the main screen after successful authentication
    } catch (error) {
      console.error('Error signing in:', error);
      throw error; // Rethrow the error to handle it in the component
    }
  };
  

  const signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.error(e);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
  };
  // const sendVerificationCode = async (phoneNumber) => {
  //   try {
  //     const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber);
  //     setVerificationId(confirmationResult.verificationId);
  //   } catch (error) {
  //     console.error('Error sending verification code:', error);
  //   }
  // };

  // const confirmVerificationCode = async () => {
  //   try {
  //     const credential = await signInWithPhoneNumber(auth, verificationId, verificationCode);
  //     // Handle successful authentication
  //   } catch (error) {
  //     console.error('Error confirming verification code:', error);
  //   }
  // };


  return (
    <AuthContext.Provider value={{ user, login, signup, logout}}>
      {children}
    </AuthContext.Provider>
  );
};