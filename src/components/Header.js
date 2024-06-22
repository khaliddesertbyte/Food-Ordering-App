import React,{useState} from 'react';
import { View, Text, StyleSheet,TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import FoodCarousel from './FoodCarousel'; // Adjust path as per your project structure

const Header = ({ address }) => {
    const [searchQuery, setSearchQuery] = useState('');
  const handleNotificationPress = () => {
    // Handle notification press action
    console.log('Notification icon pressed');
  };
  const foodData = [
    { id: '1', name: 'Pizza', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/1920px-Pizza-3007395.jpg' },
    { id: '2', name: 'Burger', image: 'https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_1920,c_limit/Smashburger-recipe-120219.jpg' },
    { id: '3', name: 'Biryani', image: 'https://feastwithsafiya.com/wp-content/uploads/2021/09/easy-chicken-biryani-900x1200.jpg' },
    { id: '4', name: 'Chicken', image: 'https://media.licdn.com/dms/image/D4D12AQHzdIjty4Onzg/article-cover_image-shrink_720_1280/0/1677491397716?e=1722470400&v=beta&t=QT51hnho44kvW-PcPRWcj59V1sKeS7-V4kw7-tUBt5c' },
    { id: '5', name: 'Fish', image: 'https://www.zastavki.com/pictures/1280x800/2019Food___Seafood_Grilled_fish_on_a_board_with_vegetables_138379_12.jpg' },
    // Add more food items as needed
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.deliverNow}>
          <Text style={styles.addressText}>Deliver Now:</Text>
          <Text style={styles.addressDetails}>{address}</Text>
        </View>
        <Ionicons
          name="notifications-outline"
          size={24}
          color="black"
          onPress={handleNotificationPress}
          style={styles.notificationIcon}
        />
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search your foods here..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FoodCarousel data={foodData}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  deliverNow: {
    flex: 1,
  },
  addressText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  addressDetails: {
    fontSize: 16,
    color: '#333333',
  },
  notificationIcon: {
    marginLeft: 10,
  },
  searchBar: {
    height: 40,
    marginTop:20,    // Different margin for top
    marginRight: 15,  // Different margin for right
    // marginBottom: 10, // Different margin for bottom
    marginLeft: 15,    // 
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
  },
});

export default Header;
