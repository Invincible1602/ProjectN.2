import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const AboutUs = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>About Us</Text>
      </View>
      <Text style={styles.content}>
        Welcome to <Text style={styles.appName}>NewsExpress</Text>. Our mission is to deliver the latest, most relevant news from around the world directly to your fingertips. We strive to provide unbiased, up-to-date, and informative articles to keep you informed about what matters most.
      </Text>
      <Text style={styles.content}>
        With a team of dedicated journalists and data scientists, <Text style={styles.appName}>NewsExpress</Text> combines cutting-edge technology and human expertise to offer a wide range of news categories, including politics, business, technology, entertainment, sports, and more.
      </Text>
      <Text style={styles.content}>
        Our goal is to help you stay informed and connected to the world. Thank you for using <Text style={styles.appName}>NewsExpress</Text>.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Neutral background
    padding: 20,
  },
  headerContainer: {
    backgroundColor: "#1E1E1E", // Serious dark header background
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 30,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
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
    color: "#1E88E5", // Professional blue
  },
});

export default AboutUs;
