import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, firestore } from '../../firebase';
import { OrderContext } from './OrderContext';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { addOrder } = useContext(OrderContext);

  const user = auth.currentUser; // Get the current user

  // Function to save cart items to Firestore
  const saveCartToFirestore = async (items) => {
    if (user) {
      const cartDocRef = doc(firestore, 'carts', user.uid);
      await setDoc(cartDocRef, { items });
    }
  };

  // Function to fetch cart items from Firestore
  const fetchCartFromFirestore = async () => {
    if (user) {
      const cartDocRef = doc(firestore, 'carts', user.uid);
      const cartDoc = await getDoc(cartDocRef);
      if (cartDoc.exists()) {
        setCartItems(cartDoc.data().items || []);
      }
    }
  };

  useEffect(() => {
    fetchCartFromFirestore();
  }, [user]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      let updatedItems;
      if (existingItem) {
        updatedItems = prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedItems = [...prevItems, { ...item, quantity: 1 }];
      }
      saveCartToFirestore(updatedItems);
      return updatedItems;
    });
  };

  const updateCartQuantity = (itemId, quantity) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      saveCartToFirestore(updatedItems);
      return updatedItems;
    });
  };

  const removeItemFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter(item => item.id !== itemId);
      saveCartToFirestore(updatedItems);
      return updatedItems;
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
    saveCartToFirestore([]);
  };

  const confirmOrder = () => {
    if (cartItems.length > 0) {
      addOrder(cartItems);
      clearCart();
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateCartQuantity, getTotalPrice, confirmOrder, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
