import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const Category = ({ category, onSelect, isActive }) => {
  return (
    <TouchableOpacity
      style={[styles.category, isActive ? styles.activeCategory : null]}
      onPress={() => onSelect(category)}
    >
      <Text style={styles.categoryText}>{category}</Text>
    </TouchableOpacity>
  );
};

const CategorySection = ({ categories, onSelect }) => {
  const handleSelectCategory = (category) => {
    onSelect(category);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Categories</Text>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Category
            category={item.name}
            onSelect={handleSelectCategory}
            isActive={item.isActive}
          />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginTop: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  categoriesContainer: {
    alignItems: 'center',
  },
  category: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: '#ddd',
    borderRadius: 20,
  },
  activeCategory: {
    backgroundColor: 'gray',
  },
  categoryText: {
    fontSize: 16,
  },
});

export default CategorySection;
