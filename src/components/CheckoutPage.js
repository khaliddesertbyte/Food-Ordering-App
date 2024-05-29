import React, { useContext, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../contexts/CartContext';
import { OrderContext } from '../contexts/OrderContext';

const CheckoutPage = () => {
  const { orders } = useContext(OrderContext);
  const { cartItems, getTotalPrice, addOrder, clearCart } = useContext(CartContext);
  const navigation = useNavigation();
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  // Function to find the quantity of each item in the cart
  const findCartItemQuantity = (itemId) => {
    const cartItem = cartItems.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Calculate total number of items in the cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleConfirmOrder = () => {
    addOrder(cartItems);
    clearCart();
    navigation.navigate('Orders'); // Assuming 'Orders' is the route name for the order history screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={customerName}
        onChangeText={setCustomerName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your Email"
        value={customerEmail}
        onChangeText={setCustomerEmail}
      />
      <View style={styles.orderSummary}>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.orderItem}>
              <Image source={{ uri: item.image }} style={styles.orderItemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.orderItemText}>{item.name}</Text>
                <Text style={styles.orderItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
              <Text style={styles.itemQuantity}>Items: {findCartItemQuantity(item.id)}</Text>
            </View>
          )}
        />
        <View style={styles.totalSection}>
          <Text style={styles.totalPrice}>Total Price: ${getTotalPrice().toFixed(2)}</Text>
          <Text style={styles.totalItems}>Total Items: {totalItems}</Text>
        </View>
      </View>
      <Button title="Confirm Order" onPress={handleConfirmOrder} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  orderSummary: {
    marginBottom: 20,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align items to the right
    marginBottom: 10,
  },
  orderItemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  orderItemText: {
    fontSize: 16,
    padding: 2,
  },
  orderItemPrice: {
    fontSize: 14,
    color: '#888',
    padding: 2,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#888',
    marginLeft: 10,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalItems: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckoutPage;
