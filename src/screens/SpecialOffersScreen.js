import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { firestore } from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { CartContext } from '../contexts/CartContext';

const SpecialOffersScreen = () => {
  const [offers, setOffers] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'offers'), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOffers(items);
    }, (error) => {
      console.error('Error fetching offers: ', error);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const renderOffer = ({ item }) => (
    <View style={styles.offerContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.offerImage} />
      </View>
      <View style={styles.nameDiscountContainer}>
        <Text style={styles.itemName}>{item.itemName}</Text>
        <Text style={styles.discountPercentage}>{item.discountPercentage}% off</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.actualPrice}>QAR {item.actualPrice}</Text>
        <Text style={styles.discountedPrice}>QAR {item.price}</Text>
      </View>
      <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Special Offers</Text>
      <FlatList
        data={offers}
        renderItem={renderOffer}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff', // Set background color to white
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  offerContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 8,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden', // Ensure image does not exceed container boundaries
  },
  offerImage: {
    width: '100%',
    height: '100%', // Ensure the image takes up the full dimensions of its container
    resizeMode: 'cover', // Cover maintains aspect ratio and fills container
    borderRadius: 8,
  },
  nameDiscountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  discountPercentage: {
    fontSize: 16,
    color: '#27ae60',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  actualPrice: {
    fontSize: 16,
    color: 'black',
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  discountedPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  addToCartButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SpecialOffersScreen;
