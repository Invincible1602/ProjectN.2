// authService.js

import AsyncStorage from '@react-native-async-storage/async-storage';

const saveUser = async (email, password) => {
  try {
    await AsyncStorage.setItem('userEmail', email);
    await AsyncStorage.setItem('userPassword', password);
  } catch (error) {
    console.error("Error saving user data: ", error);
  }
};

const getUser = async () => {
  try {
    const email = await AsyncStorage.getItem('userEmail');
    const password = await AsyncStorage.getItem('userPassword');
    return { email, password };
  } catch (error) {
    console.error("Error retrieving user data: ", error);
    return null;
  }
};

const clearUser = async () => {
  try {
    await AsyncStorage.removeItem('userEmail');
    await AsyncStorage.removeItem('userPassword');
  } catch (error) {
    console.error("Error clearing user data: ", error);
  }
};

export { saveUser, getUser, clearUser };
