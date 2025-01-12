import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Linking,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';

const API_KEY = '072f853c6031d84760bed5acc1573551';
const NEWS_URL = `http://api.mediastack.com/v1/news?access_key=${API_KEY}&countries=in&limit=30`;

const HomeScreen = ({ navigation }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const response = await fetch(NEWS_URL);
            const data = await response.json();
            setNews(data.data); // Updated for correct API response structure
            setLoading(false);
        } catch (error) {
            console.error('Error fetching news:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchNews();
        setRefreshing(false);
    };

    const renderNewsItem = ({ item }) => (
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
            {item.url && (
                <TouchableOpacity
                    onPress={() => Linking.openURL(item.url)}
                    style={styles.urlButton}
                >
                    <Text style={styles.urlText}>Read Full Article</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <LinearGradient
            colors={['#f9f9f9', '#f0f0f0']}
            style={styles.container}
        >
            <Animated.View
                entering={FadeInDown}
                exiting={FadeOutUp}
                style={styles.header}
            >
                <Text style={styles.headerText}>Latest Headlines</Text>
            </Animated.View>

            {loading ? (
                <ActivityIndicator size="large" color="#555" style={styles.loader} />
            ) : (
                <Animated.FlatList
                    data={news}
                    keyExtractor={(item) => item.url}
                    renderItem={renderNewsItem}
                    entering={FadeInDown}
                    exiting={FadeOutUp}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
            )}

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.audioButton}
                    onPress={() => navigation.navigate('News')}
                >
                    <Text style={styles.audioButtonText}>Listen to Audio News</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        paddingVertical: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 10,
    },
    headerText: {
        color: '#333',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loader: {
        marginTop: 20,
    },
    newsItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    newsImage: {
        width: '100%',
        height: 180,
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
    footer: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    audioButton: {
        backgroundColor: '#333',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    audioButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
