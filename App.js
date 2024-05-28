import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './src/components/MainTabNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
       <MainTabNavigator/>
    </NavigationContainer>
  );
}
