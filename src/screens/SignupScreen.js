import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../../firebase';
import { useNavigation } from '@react-navigation/native';
import { serverTimestamp } from 'firebase/firestore';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const { signup } = useContext(AuthContext);
  const navigation = useNavigation();
  const createdAt=serverTimestamp()

  // const handleSignup = async () => {
  //   try {
  //     // Perform signup with email and password
  //     await signup(email, password);

  //     // Additional information can be saved to a user profile or a separate database
  //     // For simplicity, this example only logs the user's information
  //     console.log('Signup successful with the following details:');
  //     console.log('Name:', name);
  //     console.log('Email:', email);
  //     console.log('Phone Number:', phoneNumber);
  //     console.log('Address:', address);
  //     console.log('Location:', location);

  //     // Navigate to the main screen after successful signup
  //     navigation.navigate('Login'); // Replace 'Main' with the name of your main screen
  //   } catch (error) {
  //     console.error('Error signing up:', error);
  //     // Handle signup error here, e.g., display error message to the user
  //   }
  // };
  const handleSignup = async () => {
    // console.log("hiii")
    try {
      await signup(email, password, {
        name,
        email,
        phoneNumber,
        address,
        location,
        createdAt
      });
    } catch (error) {
      // Handle errors (existing in your code)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default SignupScreen;
