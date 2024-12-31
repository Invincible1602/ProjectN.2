import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Animated, Image } from 'react-native';
import { saveUser } from './../services/authService';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumbers = /\d/;
    const hasLetters = /[a-zA-Z]/;
    return password.length >= minLength && hasNumbers.test(password) && hasLetters.test(password);
  };

  const handleSignup = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert('Error', 'Password must be at least 8 characters long and contain both letters and numbers');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Save user data to AsyncStorage
    await saveUser(email, password);

    // Navigate to login page after successful signup
    Alert.alert('Signup Successful', 'You can now log in');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Animated logo */}
      <Animated.View style={{ opacity: logoOpacity }}>
        <Image source={{ uri: logoUri }} style={styles.logo} />
      </Animated.View>

      <Text style={styles.title}>Create an Account</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor="#888"
      />
      
      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={handleSignup} color="#007BFF" />
      </View>

      {/* Password rules */}
      <View style={styles.passwordRulesContainer}>
        <Text style={styles.passwordRuleText}>
          Password must:
        </Text>
        <Text style={styles.passwordRuleText}>- Be at least 8 characters long</Text>
        <Text style={styles.passwordRuleText}>- Contain both letters and numbers</Text>
      </View>

      <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
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
  passwordRulesContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    marginBottom: 20,
  },
  passwordRuleText: {
    fontSize: 14,
    color: 'gray',
  },
});

export default SignupScreen;
