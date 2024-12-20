import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import NewsCard from "../components/NewsCard";
import { fetchNewsArticles } from "../services/api";

const NewsListScreen = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NewsListScreen;
