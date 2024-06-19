import React, { useState, useContext, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { auth, signInWithPhoneNumber, PhoneAuthProvider, firebaseConfig, signInWithCredential } from '../../firebase';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const [isVerifying, setIsVerifying] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const recaptchaVerifier = useRef(null);
  const [foodAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(foodAnimation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(foodAnimation, {
          toValue: 0,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [foodAnimation]);

  const foodScale = foodAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

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
      await signInWithCredential(auth, credential,navigation);
      setCode('');
      console.log("Login successfully");
      navigation.navigate('Main'); // Navigate to the main screen after successful login
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
      <Animated.View style={[styles.foodIcon, { transform: [{ scale: foodScale }] }]}>
        <Ionicons name="fast-food" size={80} color="#FFA500" />
      </Animated.View>
      <Text style={styles.title}>Welcome to FoodDelivery</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Login"
        onPress={handleLogin}
        color="#FFA500"
      />
      <Button
        title="Go to Signup"
        onPress={() => navigation.navigate('Signup')}
        color="#FFA500"
      />
      <Button
        title="Sign in with Google"
        color="#FFA500"
      />
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
    backgroundColor: '#F8D6D0',
  },
  foodIcon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#FFA500',
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    borderColor: '#FFA500',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  sendVerification: {
    padding: 10,
    backgroundColor: '#FFA500',
    borderRadius: 5,
    marginBottom: 10,
  },
  sendCode: {
    padding: 10,
    backgroundColor: '#FFA500',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  otpText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 10,
  },
  otpContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 5,
  },
});

export default LoginScreen;