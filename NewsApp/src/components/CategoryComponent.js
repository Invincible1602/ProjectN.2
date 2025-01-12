import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    Linking,
    TouchableOpacity,
} from 'react-native';

const CategoryComponent = ({ category, languageData }) => (
    <View style={styles.categorySection}>
        <Text style={styles.categoryHeader}>{category}</Text>
        {Object.keys(languageData).map(language => (
            <View key={language} style={styles.languageSection}>
                <Text style={styles.languageHeader}>{`Language: ${language}`}</Text>
                <FlatList
                    data={languageData[language]}
                    keyExtractor={(item) => item.link}
                    renderItem={({ item }) => (
                        <View style={styles.newsItem}>
                            {item.image && (
                                <Image source={{ uri: item.image }} style={styles.newsImage} />
                            )}
                            <Text style={styles.newsTitle}>{item.title}</Text>
                            <Text style={styles.newsDescription}>{item.description}</Text>
                            <Text style={styles.newsSource}>
                                Source: {item.source || 'Unknown'}
                            </Text>
                            <Text style={styles.newsDate}>
                                Published: {new Date(item.published_at).toLocaleDateString()}
                            </Text>
                            {item.link && (
                                <TouchableOpacity
                                    onPress={() => Linking.openURL(item.link)}
                                    style={styles.urlButton}
                                >
                                    <Text style={styles.urlText}>Read Full Article</Text>
                                </TouchableOpacity>
                            )}
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
        fontSize: 26,
        marginBottom: 15,
        fontWeight: 'bold',
        color: '#333',
    },
    languageSection: {
        marginBottom: 20,
    },
    languageHeader: {
        fontSize: 18,
        marginBottom: 10,
        fontStyle: 'italic',
        color: '#555',
    },
    newsItem: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        elevation: 3, // Adds shadow for Android
        shadowColor: '#000', // Adds shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    newsImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 10,
        resizeMode: 'cover',
    },
    newsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#222',
    },
    newsDescription: {
        fontSize: 16,
        color: '#444',
        marginBottom: 10,
    },
    newsSource: {
        fontSize: 14,
        color: '#777',
        marginBottom: 4,
    },
    newsDate: {
        fontSize: 12,
        color: '#999',
        fontStyle: 'italic',
        marginBottom: 8,
    },
    urlButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#333',
        borderRadius: 5,
        alignItems: 'center',
    },
    urlText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default CategoryComponent;
