import React, { createContext, useState, useEffect,useRef } from 'react';
import { auth,firestore } from '../../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, googleProvider } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc,getDoc } from 'firebase/firestore'; // For storing user data

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData,SetUserData]=useState(null);
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
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      if(user){
      setUser(user);
      const userDocRef=doc(firestore,'users',user.uid);
      const userDoc=await getDoc(userDocRef);
      if(userDoc.exists()){
        SetUserData(userDoc.data())
      }
    }
      else{
        setUser(null);
        SetUserData(null);
      }

      
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
  

  // const signup = async (email, password) => {
  //   try {
  //     await createUserWithEmailAndPassword(auth, email, password);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  const signup = async (email, password, additionalData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Save additional data in Firestore
      const userDocRef = doc(firestore, 'users', user.uid); // Create a document reference
      await setDoc(userDocRef, additionalData); // Set the document with user data
      setUser(user);
      SetUserData(additionalData)
      console.log('Signup successful...');
      navigation.navigate('Login'); // Navigate to login screen after successful signup
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.error('Email already in use. Please use a different email.');
        Alert.alert('Error', 'Email already in use. Please use a different email.');
      } else {
        console.error('Error signing up:', error);
        Alert.alert('Error', 'An error occurred during signup. Please try again.');
      }
    }
  };


  const logout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login')
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
    <AuthContext.Provider value={{ user,userData,SetUserData, login, signup, logout}}>
      {children}
    </AuthContext.Provider>
  );
};