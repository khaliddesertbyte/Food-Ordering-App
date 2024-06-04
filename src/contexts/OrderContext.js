import React, { createContext, useState } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (orderItems) => {
    setOrders((prevOrders) => [
      ...prevOrders,
      {
        id: prevOrders.length + 1, // Generating a simple order ID based on length
        items: orderItems.map(item => ({
          id: item.id,
          image: item.image,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        date: new Date().toISOString(),
        status: 'Pending', // Default status for a new order
      }
    ]);
  };

  const cancelOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: 'Canceled' } : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
