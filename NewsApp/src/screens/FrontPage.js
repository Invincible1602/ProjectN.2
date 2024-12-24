import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import React from 'react';
import { clearUser } from './../services/authService';

export default function FrontPage({ navigation, user }) {

  const handleLogout = async () => {
    await clearUser();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Displaying User Email */}
      {user && user.email && <Text style={styles.email}>{`Email: ${user.email}`}</Text>}

      <Image
        style={styles.logo}
        source={{
          uri: 'https://th.bing.com/th/id/OIP.fmZdo6kLTCGENw6l_NvogwHaHD?rs=1&pid=ImgDetMain',
        }}
      />
      <Text style={styles.heading}>Welcome to NewsExpress</Text>
      <Text style={styles.subheading}>Stay Updated with the Latest Headlines</Text>
      <Text style={styles.text}>
        Explore the latest news articles and listen to audio news. Choose your preferred option below.
      </Text>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.cardText}>Latest News</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('News')}
      >
        <Text style={styles.cardText}>Audio News</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#00ffff',
    width: '80%',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  // New Styles for Logout Button and Email Display
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  email: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});
