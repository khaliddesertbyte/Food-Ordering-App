import React,{useContext} from 'react';
import { View, Text, Image, Button, StyleSheet,TouchableOpacity,ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { CartContext } from '../contexts/CartContext';
import Icon from 'react-native-vector-icons/FontAwesome';
const ItemDetailScreen = ({ navigation }) => {
    const { addToCart } = useContext(CartContext);
  const route = useRoute();
  const { item } = route.params;

  return (
    <ScrollView style={styles.container}>
    <View style={styles.imageContainer}>
        
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover"/>
      </View>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.itemName}>{item.itemName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Icon name="star" size={20} color="#FFD700" />
            <Text style={styles.infoText}>4.5</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="clock-o" size={20} color="#000" />
            <Text style={styles.infoText}>30 min</Text>
          </View>
          <Text style={styles.price}>QAR {item.price}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  imageContainer:{
    width:"100%",
    backgroundColor:"black",
    borderRadius:15,
  },
  image: {
    width: '100%',
    height: 300,
    // marginBottom: 16,
    borderRadius:15,
    
  },
  detailsContainer: {
    flex: 1,
    padding: 16,
  },
  itemName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
    textAlign:"justify"
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 4,
    fontSize: 16,
    color: '#555',
  },
  price: {
    fontSize: 24,
    // fontWeight: 'bold',
    color: '#000',
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginBottom: 25,
    borderRadius: 5,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ItemDetailScreen;
