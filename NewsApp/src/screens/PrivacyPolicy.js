import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Privacy Policy</Text>
      <Text style={styles.content}>
        At NewsApp, your privacy is our priority. We are committed to protecting your personal information and being transparent about how we collect, use, and share it.
      </Text>
      <Text style={styles.content}>
        - We collect data such as your preferences, location, and browsing behavior to provide a personalized news experience.
      </Text>
      <Text style={styles.content}>
        - We use cookies to analyze user behavior and enhance app functionality.
      </Text>
      <Text style={styles.content}>
        - We will never sell or share your personal data with third parties without your consent, except where required by law.
      </Text>
      <Text style={styles.content}>
        For any questions regarding our privacy practices or to learn more about how we protect your data, please contact us at support@newsapp.com.
      </Text>
      <Text style={styles.content}>
        Thank you for trusting NewsApp with your news experience.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "blue",
    textAlign: "center",
    marginBottom: 20,
    paddingTop: 50,
  },
  content: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 10,
  },
});

export default PrivacyPolicy;
