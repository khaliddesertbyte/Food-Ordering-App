import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './src/components/MainTabNavigator';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import { CartProvider } from './src/contexts/CartContext';
import { OrderProvider } from './src/contexts/OrderContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <CartProvider>
      <OrderProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      </OrderProvider>
    </CartProvider>
    
  );
};

export default App;
