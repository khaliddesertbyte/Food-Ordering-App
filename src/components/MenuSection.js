import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,FlatList } from 'react-native';

const MenuItem = ({ item, onPress }) => {
  return (
    <View style={styles.menuItem}>
      <Image source={{ uri: item.image }} style={styles.menuImage} />
      <Text style={styles.menuName}>{item.name}</Text>
      <Text style={styles.menuPrice}>${item.price.toFixed(2)}</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => onPress(item)}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const MenuSection = ({ menuData, onAddToCart }) => {
  return (
    <FlatList
      data={menuData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <MenuItem item={item} onPress={onAddToCart} />}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.menuContainer}
    />
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    paddingHorizontal: 10,
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  menuImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  menuName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  menuPrice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MenuSection;
