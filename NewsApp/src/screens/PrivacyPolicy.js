import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Privacy Policy</Text>
      </View>
      <Text style={styles.content}>
        At <Text style={styles.appName}>NewsExpress</Text>, your privacy is our priority. We are committed to protecting your personal information and being transparent about how we collect, use, and share it.
      </Text>
      <Text style={styles.subHeader}>What We Collect</Text>
      <Text style={styles.content}>
        - Data such as your preferences, location, and browsing behavior to provide a personalized news experience.
      </Text>
      <Text style={styles.content}>
        - Cookies to analyze user behavior and enhance app functionality.
      </Text>
      <Text style={styles.subHeader}>Our Commitment</Text>
      <Text style={styles.content}>
        - We will never sell or share your personal data with third parties without your consent, except where required by law.
      </Text>
      <Text style={styles.content}>
        For any questions regarding our privacy practices or to learn more about how we protect your data, please contact us at <Text style={styles.highlight}>support@newsapp.com</Text>.
      </Text>
      <Text style={styles.content}>
        Thank you for trusting <Text style={styles.appName}>NewsExpress</Text> with your news experience.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", 
    padding: 20,
  },
  headerContainer: {
    backgroundColor: "#1E1E1E", 
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 30
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E88E5", 
    marginTop: 20,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: "#333",
    lineHeight: 26,
    marginBottom: 15,
    textAlign: "justify",
  },
  appName: {
    fontWeight: "bold",
    color: "#1E88E5", // Highlight the app name
  },
  highlight: {
    color: "#D32F2F", // Red color for email for better visibility
    fontWeight: "600",
  },
});

export default PrivacyPolicy;
