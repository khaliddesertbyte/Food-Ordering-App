import React, { useState, useContext, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { auth, signInWithPhoneNumber, PhoneAuthProvider,firebaseConfig, signInWithCredential } from '../../firebase';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { Ionicons } from '@expo/vector-icons';

import LottieView from 'lottie-react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const [rememberMe, setRememberMe] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const recaptchaVerifier = useRef(null);

  const sendVerificationCode = async () => {
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier.current);
      setVerificationId(confirmationResult.verificationId);
      setPhoneNumber('');
      setIsVerifying(true);
    } catch (error) {
      console.error('Error sending verification code:', error);
    }
  };

  const confirmCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, code);
      await signInWithCredential(auth, credential);
      setCode('');
      navigation.navigate('Main');
    } catch (error) {
      console.error('Error confirming code:', error);
    }
  };

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          source={require('../../assets/food-delivery.json')} // Replace with your Lottie animation file
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
      <Text style={styles.title}>Login to your account</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={20} color="#FFA500" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={20} color="#FFA500" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.rememberMeContainer}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <Ionicons
            name={rememberMe ? "checkbox-outline" : "square-outline"}
            size={20}
            color="#FFA500"
            style={styles.checkbox}
          />
          <Text style={styles.rememberMeText}>Remember me</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { /* Handle forgot password */ }}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.otpContainer}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        <Text style={styles.otpText}>Login Using OTP</Text>
        <TextInput
          placeholder='Phone number with country code'
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType='phone-pad'
          autoCompleteType='tel'
          style={styles.textInput}
          editable={!isVerifying}
        />
        <TouchableOpacity
          style={styles.sendVerification}
          onPress={sendVerificationCode}
          disabled={isVerifying}
        >
          <Text style={styles.buttonText}>Send Verification</Text>
        </TouchableOpacity>
        {isVerifying && (
          <>
            <TextInput
              placeholder='Confirm code'
              value={code}
              onChangeText={setCode}
              keyboardType='number-pad'
              style={styles.textInput}
            />
            <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
              <Text style={styles.buttonText}>Confirm Verification</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ebdfdf',
  },
  animationContainer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    margin:0  
  
  },
  lottie: {
    width: "100%",
    height: 220,
    margin:0
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    borderColor: '#FFA500',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  icon: {
    padding: 10,
    color:"black"
  },
  input: {
    flex: 1,
    padding: 11,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  checkbox: {
    marginRight: 8,
    color:"black"
  },
  rememberMeText: {
    color:"black"
  },
  forgotPasswordText: {
   color:"black"
  },
  loginButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#7B3F00',
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  signupText: {
    color: 'black',
    fontWeight:"bold"
  },
  otpContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 5,
  },
  otpText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  textInput: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    // borderColor: '#FFA500',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  sendVerification: {
    padding: 10,
    backgroundColor: '#7B3F00',
    borderRadius: 5,
    marginBottom: 10,
  },
  sendCode: {
    padding: 10,
    backgroundColor: '#7B3F00',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;