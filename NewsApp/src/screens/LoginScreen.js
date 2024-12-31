import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Animated, Image } from 'react-native';
import { getUser } from './../services/authService';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logoOpacity] = useState(new Animated.Value(0)); // Animation state

  const logoUri = 'https://th.bing.com/th/id/OIP.fmZdo6kLTCGENw6l_NvogwHaHD?rs=1&pid=ImgDetMain'; // Replace with your logo URI

  useEffect(() => {
    // Fade in the logo on component mount
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [logoOpacity]);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    const user = await getUser();

    if (user && user.email === email && user.password === password) {
      // Navigate to the FrontPage if login is successful
      navigation.navigate('FrontPage');
    } else {
      // Show an alert if login fails
      Alert.alert('Login failed', 'Incorrect email or password');
    }
  };

  return (
    <View style={styles.container}>
      {/* Animated logo */}
      <Animated.View style={{ opacity: logoOpacity }}>
        <Image source={{ uri: logoUri }} style={styles.logo} />
      </Animated.View>

      <Text style={styles.title}>Login to News App</Text>

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
      
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} color="#007BFF" />
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
    paddingHorizontal: 30,
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 5,
  },
  linkText: {
    marginTop: 20,
    color: '#007BFF',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LoginScreen;
