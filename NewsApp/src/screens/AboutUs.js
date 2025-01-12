import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const AboutUs = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>About Us</Text>
      <Text style={styles.content}>
        Welcome to NewsApp! Our mission is to deliver the latest, most relevant news from around the world directly to your fingertips. We strive to provide unbiased, up-to-date, and informative articles to keep you informed about what matters most.
      </Text>
      <Text style={styles.content}>
        With a team of dedicated journalists and data scientists, NewsApp combines cutting-edge technology and human expertise to offer a wide range of news categories, including politics, business, technology, entertainment, sports, and more.
      </Text>
      <Text style={styles.content}>
        Our goal is to help you stay informed and connected to the world. Thank you for using NewsApp!
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

export default AboutUs;
