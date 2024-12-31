import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { clearUser } from './../services/authService';

export default function FrontPage({ navigation, user }) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(0)).current;
  const logoutOpacity = useRef(new Animated.Value(0)).current;

  // Simulate a refresh action
  const onRefresh = async () => {
    setIsRefreshing(true);
    // Reset the animation values to trigger the animation again
    logoOpacity.setValue(0);
    logoutOpacity.setValue(0);
    cardScale.setValue(0);

    // Trigger the animation sequence again
    Animated.sequence([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(logoutOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(cardScale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Simulate a delay for refreshing
    setTimeout(() => {
      setIsRefreshing(false);
      // You can replace this with your data fetching logic
      console.log("Data refreshed");
    }, 2000); // 2-second delay to simulate refresh
  };

  useEffect(() => {
    // Initial animation on mount
    Animated.sequence([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(logoutOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(cardScale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogout = async () => {
    await clearUser();
    navigation.navigate('Login');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      {/* Logout Button */}
      <Animated.View style={[styles.logoutButton, { opacity: logoutOpacity }]}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Logo with Fade-in Animation */}
      <Animated.Image
        style={[styles.logo, { opacity: logoOpacity }]}
        source={{
          uri: 'https://th.bing.com/th/id/OIP.fmZdo6kLTCGENw6l_NvogwHaHD?rs=1&pid=ImgDetMain',
        }}
      />
      <Text style={styles.heading}>Welcome to NewsExpress</Text>
      <Text style={styles.subheading}>Stay Updated with the Latest Headlines</Text>
      <Text style={styles.text}>
        Explore the latest news articles and listen to audio news. Choose your preferred option below.
      </Text>
      
      {/* Latest News Card with Scale Animation */}
      <Animated.View style={[styles.card, { transform: [{ scale: cardScale }] }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.cardText}>Latest News</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Audio News Card with Scale Animation */}
      <Animated.View style={[styles.card, { transform: [{ scale: cardScale }] }]}>
        <TouchableOpacity onPress={() => navigation.navigate('News')}>
          <Text style={styles.cardText}>Audio News</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1, // Ensures the container takes up the full available space
    backgroundColor: '#f0f0f0', // Soft gray background for a serious feel
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ddd', // Light border for professional touch
  },
  heading: {
    fontSize: 32,
    fontWeight: '700', // Bold for seriousness
    color: '#1e2a38', // Dark blue-gray for text
    marginBottom: 10,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 20,
    color: '#555', // Dark gray for subheading
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#666', // Lighter gray for body text
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#ffffff', // White background for cards
    width: '85%',
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd', // Light border for separation
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Slight shadow for depth
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600', // Slightly bold for readability
    color: '#1e2a38', // Dark blue-gray for text
  },
  // Updated Styles for Logout Button
  logoutButton: {
    position: 'absolute', // Positioned at the top-right
    top: 40,
    right: 20,
    backgroundColor: '#ff4757', // Soft red for logout button
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    zIndex: 10, // Ensure it appears above other elements
  },
  logoutText: {
    color: '#fff', // White text for visibility
    fontWeight: 'bold',
    fontSize: 14,
  },
});
