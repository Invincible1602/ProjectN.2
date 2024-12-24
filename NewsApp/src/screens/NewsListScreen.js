import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Speech from "expo-speech";

const NewsListScreen = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const stopSpeaking = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    }
  };

  const toggleReadTitlesAloud = () => {
    stopSpeaking();
    const titles = articles.map((article) => article.title).join(", ");
    Speech.speak(`Here are the article titles: ${titles}`, {
      onDone: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
    setIsSpeaking(true);
  };

  const handleReadSummary = (summary) => {
    stopSpeaking();
    Speech.speak(summary, {
      onDone: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
    setIsSpeaking(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading News...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {articles.map((article, index) => (
          <NewsCard
            key={index}
            article={article}
            handleReadSummary={handleReadSummary}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.readTitlesButton}
        onPress={toggleReadTitlesAloud}
      >
        <Text style={styles.readTitlesButtonText}>Read Titles Aloud</Text>
      </TouchableOpacity>
    </View>
  );
};

const NewsCard = ({ article, handleReadSummary }) => (
  <TouchableOpacity style={styles.card}>
    <LinearGradient
      colors={["#ffffff", "#f0f0f0"]}
      style={styles.cardGradient}
    >
      <Text style={styles.cardTitle}>{article.title}</Text>
      <Text style={styles.cardSummary}>{article.summary}</Text>
      <TouchableOpacity
        style={styles.readButton}
        onPress={() => handleReadSummary(article.summary)}
      >
        <Text style={styles.readButtonText}>Read Summary</Text>
      </TouchableOpacity>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#555",
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardGradient: {
    padding: 15,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cardSummary: {
    fontSize: 14,
    color: "#555",
    marginVertical: 10,
  },
  readButton: {
    alignSelf: "flex-start",
    backgroundColor: "#ff3366",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  readButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  readTitlesButton: {
    backgroundColor: "#007bff",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    margin: 15,
  },
  readTitlesButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NewsListScreen;
