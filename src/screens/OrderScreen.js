import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { OrderContext } from '../contexts/OrderContext';

const OrderScreen = () => {
  const { orders } = useContext(OrderContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ordered Items</Text>
      {orders.map((order) => (
        <View key={order.id}>
          <Text style={styles.orderTitle}>Order #{order.id}</Text>
          {order.items.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
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
});

export default OrderScreen;
