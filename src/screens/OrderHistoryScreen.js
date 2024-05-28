import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const mockOrderHistory = [
  { id: '1', date: '2024-01-15', total: 25.97 },
  { id: '2', date: '2024-01-10', total: 18.99 },
];

const OrderHistoryScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={mockOrderHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.orderDate}>Date: {item.date}</Text>
            <Text style={styles.orderTotal}>Total: ${item.total.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  orderItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  orderDate: {
    fontSize: 16,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderHistoryScreen;
