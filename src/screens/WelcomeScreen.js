import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../assets/food_loginscreen.jpeg')}
      style={styles.backgroundImage}
      imageStyle={{ opacity: 1 }} // Reduce opacity here
    >
      <View style={styles.container}>
        <View style={styles.textContaner}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>The best food delivery app</Text>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    // backgroundColor: 'rgba(0, 0, 0, 0.6)', // Add a dark overlay with reduced opacity
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    color: '#FFFFFF',
    textAlign: 'center',
  },

  textContaner:{
    top:150
  },

  buttonContainer:{
    top:210

  },
  button: {
    backgroundColor: '#7B3F00',
    padding: 15,
    borderRadius: 22,
    alignItems: '',
    width: 310,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign:"center"
  },
});

export default WelcomeScreen;
