import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { serverTimestamp } from 'firebase/firestore';
import LottieView from 'lottie-react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from @expo/vector-icons

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const { signup } = useContext(AuthContext);
  const createdAt = serverTimestamp();

  const handleSignup = async () => {
    try {
      await signup(email, password, {
        name,
        email,
        phoneNumber,
        address,
        location,
        createdAt
      });
      navigation.navigate('Login'); // Navigate to Login after successful signup
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Animation */}
      <View style={styles.animationContainer}>
        <LottieView
          source={require('../../assets/food-delivery.json')} // Replace with your Lottie animation file
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>

      <Text style={styles.title}>Signup</Text>
      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#FFA500" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      
      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#FFA500" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      
      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#FFA500" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      
      {/* Phone Number Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={20} color="#FFA500" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>
      
      {/* Address Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="location-outline" size={20} color="#FFA500" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
      </View>
      
      {/* Location Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="location-sharp" size={20} color="#FFA500" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
      </View>
      
      {/* Signup Button */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
  },
  lottie: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    marginBottom: 10,
    borderColor: '#FFA500',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  icon: {
    padding: 10,
    color:"black",
    fontWeight:"bold"
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: 'black',
  },
  signupButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#7B3F00',
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default SignupScreen;
