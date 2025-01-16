import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
import Settings from "./src/screens/Settings";
import Icon from "react-native-vector-icons/Ionicons";
import PrivacyPolicy from "./src/screens/PrivacyPolicy";
import AboutUs from "./src/screens/AboutUs";
import Market from "./src/screens/Market";

// Stack Navigator
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="FrontPage" component={FrontPageWithTabs} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="News" component={NewsListScreen} />
      <Stack.Screen name="BuisnessNews" component={BuisnessNews} />
      <Stack.Screen name="Crime" component={Crime} />
      <Stack.Screen name="Politics" component={Politics} />
      <Stack.Screen name="Sports" component={Sports} />
      <Stack.Screen name="Technology" component={Technology} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Privacy Policy" component={PrivacyPolicy} />
      <Stack.Screen name="About Us" component={AboutUs} />
      <Stack.Screen name="Market" component={Market} />
    </Stack.Navigator>
  );
}

// Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "FirstPage") {
            iconName = focused ? "home" : "home-outline"; // Filled icon if focused
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline"; // Filled icon if focused
          } else if (route.name === "Market News") {
            iconName = focused ? "trending-up" : "trending-up-outline"; // Filled icon if focused
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF", // Blue color for active tabs
        tabBarInactiveTintColor: "#8E8E93", // Gray for inactive tabs
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#E5E5EA",
          height: 60,
          elevation: 10, // Adds shadow for Android
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen name="FirstPage" component={FrontPage} />
      <Tab.Screen name="Market News" component={Market} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

// Wrapper for FrontPage with Tabs
function FrontPageWithTabs() {
  return <TabNavigator />;
}

// Main App
export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
