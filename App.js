import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './src/components/MainTabNavigator';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import { CartProvider } from './src/contexts/CartContext';
import { OrderProvider } from './src/contexts/OrderContext';
import { AuthProvider } from './src/contexts/AuthContext';
import WelcomeScreen from './src/screens/WelcomeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <OrderProvider>
          <CartProvider>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
              <Stack.Screen name="Main" component={MainTabNavigator} />
            </Stack.Navigator>
          </CartProvider>
        </OrderProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
