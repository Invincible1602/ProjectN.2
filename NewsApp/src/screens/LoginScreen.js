import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getUser } from './../services/authService';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
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
      <Text style={styles.title}>Login to News App</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
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
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
    borderRadius: 5,
  },
  linkText: {
    marginTop: 10,
    color: 'blue',
    textAlign: 'center',
  },
});

export default LoginScreen;
