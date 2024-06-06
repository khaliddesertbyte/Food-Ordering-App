import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, firestore } from '../../firebase';
import { OrderContext } from './OrderContext';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { addOrder } = useContext(OrderContext);
  const [user, setUser] = useState(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log('User signed in:', authUser);
        setUser(authUser);
      } else {
        console.log('No user signed in');
        setUser(null);
        setCartItems([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch cart items from Firestore when user state changes
  useEffect(() => {
    if (user) {
      fetchCartFromFirestore(user);
    }
  }, [user]);

  // // Function to save cart items to Firestore
  // const saveCartToFirestore = async (items) => {
  //   if (user) {
  //     try {
  //       const cartDocRef = doc(firestore, 'carts', user.uid);
  //       await setDoc(cartDocRef, { items });
  //       console.log('Cart saved to Firestore:', items);
  //     } catch (error) {
  //       console.error('Error saving cart to Firestore:', error);
  //     }
  //   }
  // };

  // // Function to fetch cart items from Firestore
  // const fetchCartFromFirestore = async (currentUser) => {
  //   if (currentUser) {
  //     try {
  //       const cartDocRef = doc(firestore, 'carts', currentUser.uid);
  //       const cartDoc = await getDoc(cartDocRef);
  //       if (cartDoc.exists()) {
  //         setCartItems(cartDoc.data().items || []);
  //         console.log('Cart fetched from Firestore:', cartDoc.data().items);
  //       } else {
  //         console.log('No cart found in Firestore');
  //         setCartItems([]);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching cart from Firestore:', error);
  //     }
  //   }
  // };
  // Function to save cart items to Firestore
// Function to save cart items to Firestore
 // Function to save cart items to Firestore
 const saveCartToFirestore = async (items) => {
  if (user) {
    const cartDocRef = doc(firestore, 'carts', user.uid);
    const userDocRef = doc(firestore, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    const userName = userDoc.data().name; // Fetch the username from the user's profile
    await setDoc(cartDocRef, { items, username: userName }); // Include username in the cart data
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
    <CartContext.Provider value={{ cartItems, addToCart, updateCartQuantity, getTotalPrice, confirmOrder, removeItemFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
