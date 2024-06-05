import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { firestore } from '../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const ProfileScreen = ({ navigation }) => {
  const { user, logout, userData, setUserData } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (user) {
      const userDocRef = doc(firestore, 'users', user.uid);
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setProfileData(data);
          if (setUserData) {
            setUserData(data);
          }
        }
      });

      return () => unsubscribe();
    }
  }, [user, setUserData]);

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleViewOrders = () => {
    navigation.navigate('OrderHistory');
  };

  const handleLogout = () => {
    logout();
  };

  if (!user || !profileData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{profileData.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text style={styles.userPhone}>{profileData.phoneNumber}</Text>
        <Text style={styles.userAddress}>{profileData.address}</Text>
        <Text style={styles.userLocation}>{profileData.location}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleEditProfile}>
          <Text style={styles.actionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleViewOrders}>
          <Text style={styles.actionText}>View Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
          <Text style={styles.actionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  userPhone: {
    fontSize: 16,
    color: '#666',
  },
  userAddress: {
    fontSize: 16,
    color: '#666',
  },
  userLocation: {
    fontSize: 16,
    color: '#666',
  },
  actions: {
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
