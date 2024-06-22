import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// import firestore from '@react-native-firebase/firestore'; // Assuming you are using Firebase Firestore
import { firestore } from '../../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const TopDishesScreen = () => {
  const [topDishes, setTopDishes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const menuItemsRef = collection(firestore, 'menuItems');
    const q = query(menuItemsRef, where('topDish', '==', true));
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setTopDishes(items);
    });
  
    return () => unsubscribe();
  }, []);

  const handleItemClick = (item) => {
    navigation.navigate('ItemDetailScreen', { item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemClick(item)}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.itemName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top Dishes</Text>
      <FlatList
        data={topDishes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    marginTop:20 
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: "center"
  },
  flatListContainer: {
    paddingHorizontal: 5, // Add horizontal padding to the container
  },
  itemContainer: {
    alignItems: 'center',
    width: 165, // Set a fixed width for each item
  },
  itemImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  itemName: {
    marginTop: 10,
    textAlign: 'center',
    fontWeight: "bold"
  },
});

export default TopDishesScreen;