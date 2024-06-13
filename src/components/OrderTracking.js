// OrderTracking.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderTracking = ({ currentStatus }) => {
  const statuses = ["Pending", "Processing", "Packaging", "Out for Delivery", "Completed", "Cancelled"];
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <View style={styles.container}>
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
