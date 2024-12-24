import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, StyleSheet, Button, Text } from "react-native";
import NewsCard from "../components/NewsCard";
import { fetchNewsArticles } from "../services/api";
import * as Speech from "expo-speech";

const NewsListScreen = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReadingTitles, setIsReadingTitles] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const fetchedArticles = await fetchNewsArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, []);

  const toggleReadTitlesAloud = () => {
    if (!isSpeaking && !isReadingTitles) {
      const titles = articles.map((article) => article.title).join(", ");
      Speech.speak(`Here are the article titles: ${titles}`, {
        onDone: () => {
          setIsSpeaking(false);
          setIsReadingTitles(false);
        },
        onError: () => {
          setIsSpeaking(false);
          setIsReadingTitles(false);
        },
      });
      setIsSpeaking(true);
      setIsReadingTitles(true);
    } else if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
      setIsReadingTitles(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>Latest News</Text>
      <ScrollView contentContainerStyle={styles.container}>
        {articles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </ScrollView>
      <Button
        title={isReadingTitles ? "Stop Reading Titles" : "Read Article Titles Aloud"}
        onPress={toggleReadTitlesAloud}
        color="#1E90FF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontSize: 28, // Increased size for heading
    fontWeight: "bold",
    color: "black", // Black color for heading
    textAlign: "center",
    marginVertical: 20,
    paddingTop: 30
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NewsListScreen;
