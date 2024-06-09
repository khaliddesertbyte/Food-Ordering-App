import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, firestore } from '../../firebase';
import { doc, setDoc, collection, addDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { AuthContext } from './AuthContext';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext); // Assuming you have a UserContext to get the current user's username

  // Function to fetch orders from Firestore
  const fetchOrdersFromFirestore = async () => {
    if (!user) return;
    try {
      const ordersCollectionRef = collection(firestore, 'orders');
      const q = query(ordersCollectionRef, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const fetchedOrders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Error fetching orders from Firestore:', error);
    }
  };

  // Function to save order to Firestore
  const saveOrderToFirestore = async (order) => {
    try {
      await setDoc(doc(firestore, 'orders', order.id), order);
      console.log('Order saved to Firestore:', order);
    } catch (error) {
      console.error('Error saving order to Firestore:', error);
    }
  };

  const addOrder = async (orderItems) => {
    try {
      // Fetch the username from the users collection
      const userDocRef = doc(firestore, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const { name } = userData;
        const {phoneNumber}=userData;
       

        // Construct order data with the fetched username
        const orderData = {
          userId: user.uid,
          username: name,
          phonenumber:phoneNumber,
          items: orderItems.map(item => ({
            id: item.id,
            image: item.image,
            name: item.itemName,
            quantity: item.quantity,
            price: item.price*item.quantity,
          })),
          date: new Date().toISOString(),
          status: 'Pending', // Default status for a new order
        };

        // Save order to Firestore
        await addDoc(collection(firestore, 'orders'), orderData);
        fetchOrdersFromFirestore(); // Fetch orders again to update state
      } else {
        console.error('User document not found');
      }
    } catch (error) {
      console.error('Error saving order to Firestore:', error);
    }
  };

  const cancelOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: 'Canceled' } : order
      )
    );
  };

  useEffect(() => {
    fetchOrdersFromFirestore();
  }, [user]); // Fetch orders when the component mounts and when user changes

  return (
    <OrderContext.Provider value={{ orders, addOrder, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
