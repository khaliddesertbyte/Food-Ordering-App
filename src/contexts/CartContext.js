import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const updateCartQuantity = (itemId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addOrder = (orderItems) => {
    setOrders((prevOrders) => [
      ...prevOrders,
      {
        // id: generateOrderId(), // Assuming you have a function to generate a unique order id
        items: orderItems.map(item => ({
          id: item.id,
          image: item.image,
          name: item.name,
          price: item.price,
        })),
      }
    ]);
    clearCart();
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateCartQuantity, getTotalPrice, addOrder, clearCart, orders }}>
      {children}
    </CartContext.Provider>
  );
};
