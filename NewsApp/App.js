import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import NewsListScreen from "./src/screens/NewsListScreen";
import HomeScreen from "./src/screens/HomeScreen";
import FrontPage from "./src/screens/FrontPage";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import BuisnessNews from "./src/screens/BuisnessNews";
import Crime from "./src/screens/Crime";
import Politics from "./src/screens/Politics";
import Sports from "./src/screens/Sports";
import Technology from "./src/screens/Technology";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="FrontPage" component={FrontPage} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="News" component={NewsListScreen} />
      <Stack.Screen name="BuisnessNews" component={BuisnessNews} />
      <Stack.Screen name="Crime" component={Crime} />
      <Stack.Screen name="Politics" component={Politics} />
      <Stack.Screen name="Sports" component={Sports} />
      <Stack.Screen name="Technology" component={Technology} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="Home" component={StackNavigator} />
        <Drawer.Screen name="Current News" component={HomeScreen} />
        <Drawer.Screen name="Audio News" component={NewsListScreen} />
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
