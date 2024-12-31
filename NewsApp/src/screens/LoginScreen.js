import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, Animated } from 'react-native';
import { getUser } from './../services/authService';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Animation states
  const fadeAnim = useState(new Animated.Value(0))[0]; // Fade-in for title
  const logoSlideAnim = useState(new Animated.Value(-100))[0]; // Slide-in logo
  const shakeAnim = useState(new Animated.Value(0))[0]; // Shake effect for inputs

  useEffect(() => {
    // Fade-in effect for the title
    Animated.timing(fadeAnim, {
      toValue: 1, // End opacity
      duration: 1500, // Duration of the animation
      useNativeDriver: true,
    }).start();

    // Slide-in logo from top
    Animated.timing(logoSlideAnim, {
      toValue: 0, // End position
      duration: 1000, // Duration of the slide
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, logoSlideAnim]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      // Shake input fields if validation fails
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      // Shake input fields if email is invalid
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    const user = await getUser();

    if (user && user.email === email && user.password === password) {
      // Navigate to the FrontPage if login is successful
      navigation.navigate('FrontPage');
    } else {
      // Show an alert if login fails
      Alert.alert('Login Failed', 'Incorrect email or password.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Section with Slide Animation */}
      <Animated.View style={[styles.logoContainer, { transform: [{ translateY: logoSlideAnim }] }]}>
        <Image 
          source={{ uri: 'https://th.bing.com/th/id/OIP.fmZdo6kLTCGENw6l_NvogwHaHD?rs=1&pid=ImgDetMain' }} 
          style={styles.logo}
        />
      </Animated.View>

      {/* Animated Title */}
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Login to News App
      </Animated.Text>

      <Animated.View style={[styles.inputContainer, { transform: [{ translateX: shakeAnim }] }]}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#888"
        />
      </Animated.View>

      {/* Unanimated Login Button */}
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} color="#0061F2" />
      </View>

      <Text style={styles.linkText} onPress={() => navigation.navigate('Signup')}>
        Don't have an account? Sign Up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30, // Increase the margin for better spacing
  },
  logo: {
    width: 120,  // Adjust width as needed
    height: 120, // Adjust height as needed
    resizeMode: 'contain', // Ensures logo scales proportionally
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 15,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  linkText: {
    marginTop: 10,
    color: '#0061F2',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LoginScreen;
