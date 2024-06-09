import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TextInput } from 'react-native';
import { firestore } from '../../firebase'; // Adjust the import path as needed
import { collection, onSnapshot } from 'firebase/firestore';
import MenuItem from '../components/MenuItem';

const MenuScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foodData, setFoodData] = useState([]);
  const [categories, setCategories] = useState([
    { id: '1', name: 'Breakfast' },
    { id: '2', name: 'Lunch' },
    { id: '3', name: 'Dinner' },
    { id: '4', name: 'Drinks' },
    { id: '5', name: 'Snacks' },
  ]);

  useEffect(() => {
    const menuItemsCollection = collection(firestore, 'menuItems');
    const unsubscribe = onSnapshot(menuItemsCollection, (snapshot) => {
      const itemsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFoodData(itemsList);
    }, (error) => {
      console.error('Error fetching menu items:', error);
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  const getMenuItemsByCategory = (category) => {
    return foodData.filter(item => item.category === category);
  };

  const renderCategory = ({ item }) => {
    const menuItems = getMenuItemsByCategory(item.name);
    return (
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{item.name}</Text>
        <FlatList
          data={menuItems}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MenuItem item={item} />}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView style={styles.contentContainer}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={renderCategory}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    height: 40,
    margin: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default MenuScreen;
