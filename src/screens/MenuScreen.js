import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TextInput } from 'react-native';
import MenuItem from '../components/MenuItem';

const MenuScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const foodData = [
    { id: '1', name: 'Margherita Pizza', price: 10.99, image: 'https://www.kimscravings.com/wp-content/uploads/2020/01/Margherita-Pizza-4-768x1152.jpg', category: 'Breakfast' },
    { id: '2', name: 'Margherita Pizza', price: 10.99, image: 'https://www.kimscravings.com/wp-content/uploads/2020/01/Margherita-Pizza-4-768x1152.jpg', category: 'Breakfast' },
    { id: '3', name: 'Margherita Pizza', price: 10.99, image: 'https://www.kimscravings.com/wp-content/uploads/2020/01/Margherita-Pizza-4-768x1152.jpg', category: 'Breakfast' },
    { id: '4', name: 'Cheeseburger', price: 10.99, image: 'https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_1920,c_limit/Smashburger-recipe-120219.jpg', category: 'Lunch' },
    { id: '5', name: 'Cheeseburger', price: 10.99, image: 'https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_1920,c_limit/Smashburger-recipe-120219.jpg', category: 'Lunch' },
    { id: '6', name: 'Cheeseburger', price: 10.99, image: 'https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_1920,c_limit/Smashburger-recipe-120219.jpg', category: 'Lunch' },
    { id: '7', name: 'Grilled Chicken',price: 10.99 , image: 'https://www.cookinwithmima.com/wp-content/uploads/2021/06/Grilled-BBQ-Chicken.jpg', category: 'Dinner'  },
    { id: '8', name: 'Grilled Chicken',price: 10.99 , image: 'https://www.cookinwithmima.com/wp-content/uploads/2021/06/Grilled-BBQ-Chicken.jpg', category: 'Dinner'  },
    { id: '9', name: 'Grilled Chicken',price: 10.99 , image: 'https://www.cookinwithmima.com/wp-content/uploads/2021/06/Grilled-BBQ-Chicken.jpg', category: 'Dinner'  },
    { id: '10', name: 'Sprite',price: 10.99 , image: 'https://www.mawolatraders.com/wp-content/uploads/2021/03/12094892-01.jpg', category: 'Drinks'  },
    { id: '11', name: 'Sprite',price: 10.99 , image: 'https://www.mawolatraders.com/wp-content/uploads/2021/03/12094892-01.jpg', category: 'Drinks'  },
    { id: '12', name: 'Sprite',price: 10.99 , image: 'https://www.mawolatraders.com/wp-content/uploads/2021/03/12094892-01.jpg', category: 'Drinks'  },
    { id: '13', name: 'Chips',price: 10.99 , image: 'https://www.foodandwine.com/thmb/5HkE9Xf4qM4SqXvCuMzkRqU6A0M=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Here-Are-the-Most-Popular-Snacks-in-America-Per-State-6ada7279c64a46898b6ec09ad083f9f2.jpg', category: 'Snacks'  },
    { id: '14', name: 'Chips',price: 10.99 , image: 'https://www.foodandwine.com/thmb/5HkE9Xf4qM4SqXvCuMzkRqU6A0M=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Here-Are-the-Most-Popular-Snacks-in-America-Per-State-6ada7279c64a46898b6ec09ad083f9f2.jpg', category: 'Snacks'  },
    { id: '15', name: 'Chips',price: 10.99 , image: 'https://www.foodandwine.com/thmb/5HkE9Xf4qM4SqXvCuMzkRqU6A0M=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Here-Are-the-Most-Popular-Snacks-in-America-Per-State-6ada7279c64a46898b6ec09ad083f9f2.jpg', category: 'Snacks'  },
];

  const categories = [
    { id: '1', name: 'Breakfast' },
    { id: '2', name: 'Lunch' },
    { id: '3', name: 'Dinner' },
    { id: '4', name: 'Drinks' },
    { id: '5', name: 'Snacks' },
  ];

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
