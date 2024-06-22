import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header'; // Adjust path as per your project structure
import TopDishesScreen from './TopDishesScreen'; // Adjust path as per your project structure
import SpecialOffersScreen from './SpecialOffersScreen'; // Adjust path as per your project structure

const HomeScreen = () => {
  const userAddress = '123 Main St, Cityville, Country'; // Replace with actual user address or dynamic data

  return (
    <ScrollView style={styles.container}>
      <Header address={userAddress} />
      <TopDishesScreen />
      <SpecialOffersScreen />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
