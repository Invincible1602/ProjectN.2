import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

const NewsCard = ({ article }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sound, setSound] = useState(null);
  const [language, setLanguage] = useState("en"); // Default language is English

  const toggleSpeech = async () => {
    if (isSpeaking) {
      if (sound) {
        await sound.stopAsync();
        setSound(null);
        setIsSpeaking(false);
      }
    } else {
      const audioBase64 =
        language === "en" ? article.english_audio_base64 : article.hindi_audio_base64;

      if (audioBase64) {
        try {
          const audioUri = `data:audio/mp3;base64,${audioBase64}`;
          const { sound } = await Audio.Sound.createAsync(
            { uri: audioUri },
            { shouldPlay: true }
          );

          setSound(sound);
          setIsSpeaking(true);

          sound.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
              setIsSpeaking(false);
            }
          });
        } catch (error) {
          console.error("Error playing audio: ", error);
          setIsSpeaking(false);
        }
      }
    }
  };

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "hi" : "en"));
  };

  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.summary}>{article.summary}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.readButton} onPress={toggleSpeech}>
          <Text style={styles.readButtonText}>
            {isSpeaking ? "Stop Listening" : `Listen in ${language === "en" ? "English" : "Hindi"}`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
          <Text style={styles.languageButtonText}>
            Switch to {language === "en" ? "Hindi" : "English"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
    padding: 15,
  },
  textContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
  },
  summary: {
    fontSize: 14,
    color: "#555555",
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  readButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginRight: 5,
  },
  readButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
  languageButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginLeft: 5,
  },
  languageButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
});

export default NewsCard;
