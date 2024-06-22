import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { firestore } from '../../firebase'; // Adjust the import path as needed
import { collection, onSnapshot } from 'firebase/firestore';
import MenuItem from '../components/MenuItem';

const MenuScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foodData, setFoodData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([
    { id: '0', name: 'All' },
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

  const getFilteredMenuItems = () => {
    if (selectedCategory === 'All') {
      return foodData;
    }
    return foodData.filter(item => item.category === selectedCategory);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedCategory(item.name)}>
      <Text style={[
        styles.categoryText,
        item.name === selectedCategory && styles.selectedCategoryText
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItemContainer}>
      <MenuItem item={item} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu Items</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search your foods here..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        style={styles.categoryList}
      />
      <FlatList
        data={getFilteredMenuItems()}
        keyExtractor={(item) => item.id}
        renderItem={renderMenuItem}
        numColumns={2}
        contentContainerStyle={styles.menuList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 15,
  },
  searchBar: {
    height: 40,
    marginHorizontal: 15,
    marginBottom: 20,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
  },
  categoryList: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16,
    marginHorizontal: 10,
    paddingVertical: 10,
    color: '#333',
  },
  selectedCategoryText: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  menuList: {
    paddingHorizontal: 10,
  
  },
  menuItemContainer: {
    flex: 1,
    // alignItems:"flex-start",
    padding: 5,
    marginTop:10
    // backgroundColor:"red",

  },
});

export default MenuScreen;
