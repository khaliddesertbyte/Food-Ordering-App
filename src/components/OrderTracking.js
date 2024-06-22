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
    outputRange: ['0%', '80%'], // Adjust this to '80%' to account for the last status
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.deliveryPersonContainer, { left: positionInterpolation }]}
      >
        <Image
          source={{ uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/delivery-man-doing-food-delivery-on-scooter-5454216-4553152.png' }}
          style={styles.deliveryPerson}
        />
      </Animated.View>
      <View style={styles.trackContainer}>
        {statuses.map((status, index) => (
          <View key={status} style={styles.statusContainer}>
            <View style={styles.circleContainer}>
              <View style={[styles.circle, currentIndex >= index ? styles.activeCircle : styles.inactiveCircle]}>
                <Text style={styles.circleText}>{index + 1}</Text>
              </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    position: 'relative',
  },
  trackContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 60,
    // paddingHorizontal: '10%', // Add padding to align with delivery person
  },
  deliveryPersonContainer: {
    position: 'absolute',
    top: 0,
    width: "20%", // Match the width of statusContainer
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryPerson: {
    width: 50,
    height: 50,
  },
  statusContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '20%',
  },
  circleContainer: {
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
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
    textAlign: 'center',
    fontSize: 10,
  },
  activeText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  inactiveText: {
    color: 'gray',
  },
  line: {
    position: 'absolute',
    top: 12,
    right: '-40%',
    width: '70%',
    height: 2,
  },
  activeLine: {
    backgroundColor: 'blue',
  },
  inactiveLine: {
    backgroundColor: 'gray',
  },
});

export default OrderTracking;