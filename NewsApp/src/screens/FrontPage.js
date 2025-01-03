import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, ScrollView, RefreshControl, Modal, FlatList } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { clearUser } from './../services/authService';

export default function FrontPage({ navigation, user }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State for category modal
  const [selectedCategory, setSelectedCategory] = useState('');

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(0)).current;
  const logoutOpacity = useRef(new Animated.Value(0)).current;

  const onRefresh = async () => {
    setIsRefreshing(true);
    logoOpacity.setValue(0);
    logoutOpacity.setValue(0);
    cardScale.setValue(0);

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

    setTimeout(() => {
      setIsRefreshing(false);
      console.log("Data refreshed");
    }, 2000);
  };

  useEffect(() => {
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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setModalVisible(false); // Close modal after selection
    navigation.navigate(category); // Navigate to the category page
  };

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
    >
      {/* Logout Button */}
      <Animated.View style={[styles.logoutButton, { opacity: logoutOpacity }]}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Drawer Navigation Button */}
      <Animated.View style={[styles.drawerButton, { opacity: logoutOpacity }]}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <AntDesign name="ellipsis1" size={24} color="black" />
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

      {/* Category Button */}
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => setModalVisible(true)} // Open the modal when clicked
      >
        <Text style={styles.categoryText}>Select Category</Text>
      </TouchableOpacity>

      {/* Latest News Card with Scale Animation */}
      <Animated.View style={[styles.card, { transform: [{ scale: cardScale }] }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.cardText}>Breaking News</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Audio News Card with Scale Animation */}
      <Animated.View style={[styles.card, { transform: [{ scale: cardScale }] }]}>
        <TouchableOpacity onPress={() => navigation.navigate('News')}>
          <Text style={styles.cardText}>Audio News</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Category Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Category</Text>
            <FlatList
              data={['BuisnessNews', 'Crime', 'Politics', 'Sports', 'Technology']}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.categoryItem}
                  onPress={() => handleCategorySelect(item)}
                >
                  <Text style={styles.categoryItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
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
    borderColor: '#ddd',
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1e2a38',
    marginBottom: 10,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 20,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    width: '85%',
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e2a38',
  },
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#ff4757',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    zIndex: 10,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  drawerButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    zIndex: 10,
  },
  categoryButton: {
    backgroundColor: '#1e2a38',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 30,
  },
  categoryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  categoryItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  categoryItemText: {
    fontSize: 18,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ff4757',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
