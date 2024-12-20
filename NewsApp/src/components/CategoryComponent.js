import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const CategoryComponent = ({ category, languageData }) => (
    <View style={styles.categorySection}>
        <Text style={styles.categoryHeader}>{category}</Text>
        {Object.keys(languageData).map(language => (
            <View key={language} style={styles.languageSection}>
                <Text style={styles.languageHeader}>{language}</Text>
                <FlatList
                    data={languageData[language]}
                    keyExtractor={(item) => item.link}
                    renderItem={({ item }) => (
                        <View style={styles.newsItem}>
                            {item.image && <Image source={{ uri: item.image }} style={styles.newsImage} />}
                            <Text style={styles.newsTitle}>{item.title}</Text>
                            <Text style={styles.newsDescription}>{item.description}</Text>
                            <Text style={styles.newsDate}>{item.date}</Text>
                        </View>
                    )}
                />
            </View>
        ))}
    </View>
);

const styles = StyleSheet.create({
    categorySection: {
        marginBottom: 20,
        paddingHorizontal: 15,
    },
    categoryHeader: {
        fontSize: 24,
        marginBottom: 15,
        fontWeight: 'bold',
        color: '#333',
    },
    languageSection: {
        marginBottom: 20,
    },
    languageHeader: {
        fontSize: 20,
        marginBottom: 10,
        fontStyle: 'italic',
        color: '#777',
    },
    newsItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        elevation: 3, // Adds shadow for Android
        shadowColor: '#000', // Adds shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    newsImage: {
        width: '100%',
        height: 180,
        borderRadius: 5,
        marginBottom: 10,
        resizeMode: 'cover',
    },
    newsTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
        color: '#222',
    },
    newsDescription: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    newsDate: {
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic',
    },
});

export default CategoryComponent;
