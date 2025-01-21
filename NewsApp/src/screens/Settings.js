import React, { useState } from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation


const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const toggleNotifications = () => setNotificationsEnabled((prev) => !prev);

  // Access the navigation prop using useNavigation hook
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Settings</Text>

     

      {/* About Us */}
      <TouchableOpacity
  style={styles.settingRow}
  onPress={() => navigation.navigate("About Us")}
>
        <Text style={styles.settingText}>About Us</Text>
        <Text style={styles.subText}>Learn more about the app</Text>
      </TouchableOpacity>

      {/* Privacy Policy */}
      <TouchableOpacity
        style={styles.settingRow}
        onPress={() => navigation.navigate("Privacy Policy")} // Use navigation to navigate
      >
        <Text style={styles.settingText}>Privacy Policy</Text>
        <Text style={styles.subText}>View privacy terms</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    paddingTop: 50,
    color: "blue",
    textAlign: "center",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  settingText: {
    fontSize: 18,
    color: "#333",
  },
  subText: {
    fontSize: 14,
    color: "gray",
  },
});

export default Settings;
