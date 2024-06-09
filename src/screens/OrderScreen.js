import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Image } from 'react-native';
import { OrderContext } from '../contexts/OrderContext';

const OrderScreen = () => {
  const { orders, cancelOrder } = useContext(OrderContext);
  const [filter, setFilter] = useState('All');

  const filterOrders = (status) => {
    setFilter(status);
  };

  const filteredOrders = filter === 'All' ? orders : orders.filter(order => order.status === filter);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderDate}>Date: {new Date(item.date).toLocaleString()}</Text>
      <Text style={styles.orderStatus}>Status: {item.status}</Text>
      {item.items.map(orderItem => (
        <View key={orderItem.id} style={styles.itemContainer}>
          <Image source={{ uri: orderItem.image }} style={styles.itemImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{orderItem.name}</Text>
            <Text style={styles.itemPrice}>QAR {orderItem.price*orderItem.quantity}</Text>
            <Text style={styles.itemQuantity}>Quantity: {orderItem.quantity}</Text>
          </View>
        </View>
      ))}
      <View style={styles.orderActions}>
        {item.status === 'Pending' && <Button title="Cancel Order" onPress={() => cancelOrder(item.id)} />}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders</Text>
      <View style={styles.filterContainer}>
        <Button title="All" onPress={() => filterOrders('All')} />
        <Button title="Pending" onPress={() => filterOrders('Pending')} />
        <Button title="Completed" onPress={() => filterOrders('Completed')} />
        <Button title="Canceled" onPress={() => filterOrders('Canceled')} />
      </View>
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  orderContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  orderDate: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  orderStatus: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#888',
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default OrderScreen;
