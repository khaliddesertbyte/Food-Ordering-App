import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import { CartContext, CartProvider } from '../contexts/CartContext';
import { createStackNavigator } from '@react-navigation/stack';
import { OrderProvider } from '../contexts/OrderContext';
import OrderScreen from '../screens/OrderScreen';
import CheckoutPage from './CheckoutPage';
import ItemDetailScreen from '../screens/ItemDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const CartStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="cart" component={CartScreen} />
    <Stack.Screen name="CheckoutPage" component={CheckoutPage} />

  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
  </Stack.Navigator>
);

const MenuStack=()=>(

  <Stack.Navigator>
  <Stack.Screen name='Menu' component={MenuScreen}/>
  <Stack.Screen name='ItemDetailScreen' component={ItemDetailScreen}/>

  </Stack.Navigator>
)

const MainTabNavigator = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Menu') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          }else if (route.name === 'Orders') {
              iconName = focused ? 'clipboard' : 'clipboard-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
        tabBarStyle: {
          display: 'flex',
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Menu" component={MenuStack} />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          tabBarBadge: cartItems.length > 0 ? cartItems.length : null,
        }}
      />
      <Tab.Screen name="Orders" component={OrderScreen} /> 
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default () => (
  <CartProvider>
  
    <MainTabNavigator />
  
  </CartProvider>
);
