import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { CartContext } from '../components/CartContext';

const MenuItem = ({ item }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <View style={styles.menuItemContainer}>
      <Image source={{ uri: item.image }} style={styles.menuItemImage} />
      <Text style={styles.menuItemName}>{item.name}</Text>
      <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
      <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuItemContainer: {
    width: 160,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  menuItemImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  menuItemPrice: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default MenuItem;
