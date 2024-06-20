import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FoodCarousel from '../components/FoodCarousel';
import CategorySection from '../components/CategorySection';
import MenuSection from '../components/MenuSection';
import {CartContext }from '../contexts/CartContext'
import SpecialOffersScreen from './SpecialOffersScreen';

const foodData = [
  { id: '1', name: 'Pizza', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/1920px-Pizza-3007395.jpg' },
  { id: '2', name: 'Burger', image: 'https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_1920,c_limit/Smashburger-recipe-120219.jpg' },
  { id: '3', name: 'Biryani', image: 'https://feastwithsafiya.com/wp-content/uploads/2021/09/easy-chicken-biryani-900x1200.jpg' },
  { id: '4', name: 'Chicken', image: 'https://media.licdn.com/dms/image/D4D12AQHzdIjty4Onzg/article-cover_image-shrink_720_1280/0/1677491397716?e=1722470400&v=beta&t=QT51hnho44kvW-PcPRWcj59V1sKeS7-V4kw7-tUBt5c' },
  { id: '5', name: 'Fish', image: 'https://www.zastavki.com/pictures/1280x800/2019Food___Seafood_Grilled_fish_on_a_board_with_vegetables_138379_12.jpg' },
  // Add more food items as needed
];

const categoryData = [
  { id: '0', name: 'All'},
  { id: '1', name: 'Breakfast'},
  { id: '2', name: 'Lunch' },
  { id: '3', name: 'Dinner' },
  { id: '4', name: 'Drinks'},
  { id: '5', name: 'Snacks'},
  // Add more categories as needed
];

const menuData = [
  { id: '1', name: 'Margherita Pizza', price: 10.99 , image: 'https://www.kimscravings.com/wp-content/uploads/2020/01/Margherita-Pizza-4-768x1152.jpg' },
  { id: '2', name: 'Cheeseburger', price: 10.99 ,image: 'https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_1920,c_limit/Smashburger-recipe-120219.jpg' },
  { id: '3', name: 'Chicken Biryani',price: 10.99 , image: 'https://feastwithsafiya.com/wp-content/uploads/2021/09/easy-chicken-biryani-900x1200.jpg' },
  { id: '4', name: 'Grilled Chicken',price: 10.99 , image: 'https://www.cookinwithmima.com/wp-content/uploads/2021/06/Grilled-BBQ-Chicken.jpg' },
  { id: '5', name: 'Fried Fish', price: 10.99 ,image: 'https://www.zastavki.com/pictures/1280x800/2019Food___Seafood_Grilled_fish_on_a_board_with_vegetables_138379_12.jpg' },
  { id: '5', name: 'Fried Fish', price: 10.99 ,image: 'https://www.zastavki.com/pictures/1280x800/2019Food___Seafood_Grilled_fish_on_a_board_with_vegetables_138379_12.jpg' },
  // Add more menu items as needed
];

const HomeScreen = ({ navigation }) => {
  const{addToCart}=useContext(CartContext)
  // Handler for category selection
  const handleSelectCategory = (category) => {
    // Implement logic for handling category selection here
    console.log('Selected category:', category);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
      <Text style={styles.title}>Welcome to the Food Ordering App!</Text>
      <FoodCarousel data={foodData} />
      {/* <CategorySection categories={categoryData} onSelect={handleSelectCategory} /> */}
      {/* <MenuSection menuData={menuData} onAddToCart={addToCart} /> */}
      <SpecialOffersScreen/>
     
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    // minHeight: '100%', // Ensure content fills available height
    flex:1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;
