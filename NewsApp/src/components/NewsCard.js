import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Audio } from "expo-av";

const NewsCard = ({ article }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);

  const playAudio = async () => {
    try {
      const { audio_base64 } = article;

      if (sound) {
        // Stop and unload sound if already playing
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
        return;
      }

      // Create audio URI from base64 string
      const audioURI = `data:audio/mpeg;base64,${audio_base64}`;
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioURI });
      setSound(newSound);

      // Handle playback status updates
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
          setSound(null);
        }
      });

      // Start playing
      await newSound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.summary}>{article.summary}</Text>
      <Button title={isPlaying ? "Stop Audio" : "Play Audio"} onPress={playAudio} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    padding: 15,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  summary: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
});

export default NewsCard;
