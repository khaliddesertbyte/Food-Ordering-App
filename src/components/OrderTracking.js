// src/components/OrderTracking.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';

const OrderTracking = ({ currentStatus }) => {
  const statuses = ["Pending", "Processing", "Packaging", "Out For Delivery", "Completed"];
  const currentIndex = statuses.indexOf(currentStatus);

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: currentIndex,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [currentIndex]);

  const positionInterpolation = animation.interpolate({
    inputRange: [0, statuses.length - 1],
    outputRange: [0, (statuses.length - 1) * 118],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.deliveryPersonContainer, { top: positionInterpolation }]}
      >
        <Image
          source={{ uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/delivery-man-doing-food-delivery-on-scooter-5454216-4553152.png' }}
          style={styles.deliveryPerson}
        />
      </Animated.View>
      {statuses.map((status, index) => (
        <View key={status} style={styles.statusContainer}>
          <View style={[styles.circle, currentIndex >= index ? styles.activeCircle : styles.inactiveCircle]}>
            <Text style={styles.circleText}>{index + 1}</Text>
          </View>
          <Text style={[styles.statusText, currentIndex >= index ? styles.activeText : styles.inactiveText]}>
            {status}
          </Text>
          {index < statuses.length - 1 && (
            <View style={[styles.line, currentIndex > index ? styles.activeLine : styles.inactiveLine]} />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    position: 'relative',
  },
  deliveryPersonContainer: {
    position: 'absolute',
    left: 200,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryPerson: {
    width: 100,
    height: 100,
  
  
  },
  statusContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    backgroundColor: 'blue',
  },
  inactiveCircle: {
    backgroundColor: 'gray',
  },
  circleText: {
    color: 'white',
    fontSize: 12,
  },
  statusText: {
    marginTop: 8,
    marginBottom: 8,
  },
  activeText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  inactiveText: {
    color: 'gray',
  },
  line: {
    width: 2,
    height: 30,
    marginTop: 8,
  },
  activeLine: {
    backgroundColor: 'blue',
  },
  inactiveLine: {
    backgroundColor: 'gray',
  },
});

export default OrderTracking;
