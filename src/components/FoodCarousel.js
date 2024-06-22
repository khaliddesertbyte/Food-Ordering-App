import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Image, Dimensions } from 'react-native';

const FoodCarousel = ({ data }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = currentIndex === data.length - 1 ? 0 : currentIndex + 1;
      flatListRef.current.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 3000);
  
    return () => clearInterval(interval);
  }, [currentIndex, data.length]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.image }}
            style={styles.image}
          />
        )}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
          setCurrentIndex(newIndex);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200, // Set a fixed height for the carousel
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30
  },
  image: {
    flex: 1,
    width: 333,
    justifyContent:"space-between",
    borderRadius: 10,
    resizeMode: 'cover',
    margin:10
  },
});

export default FoodCarousel;
