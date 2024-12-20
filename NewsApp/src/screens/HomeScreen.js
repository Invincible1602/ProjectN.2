import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import CategoryComponent from '../components/CategoryComponent';

const API_KEY = 'pub_62821603e0100105f92b76bbd3e010a2bb5d5';
const COUNTRY = 'in';
const LANGUAGE = 'en';
const NEWS_URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=${COUNTRY}&language=${LANGUAGE}`;

const HomeScreen = ({ navigation }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Function to fetch news
    const fetchNews = async () => {
        setLoading(true);  // Set loading true when fetching news
        try {
            const response = await fetch(NEWS_URL);
            const data = await response.json();
            setNews(data.results);  // Set the fetched news data
            setLoading(false);  // Set loading false when done
        } catch (error) {
            console.error('Error fetching news:', error);
            setLoading(false);
        }
    };

    // Fetch the news data on component mount
    useEffect(() => {
        fetchNews();
    }, []);

    // Handle refresh action
    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchNews();  // Fetch new news on refresh
        setRefreshing(false);  // Set refreshing false when done
    };

    // Organize news data by category and language
    const categoryData = news.reduce((acc, item) => {
        const category = item.category || 'General';
        const language = item.language || 'Other';

        if (!acc[category]) {
            acc[category] = {};
        }
        if (!acc[category][language]) {
            acc[category][language] = [];
        }

        acc[category][language].push(item);
        return acc;
    }, {});

    const categoryList = Object.keys(categoryData);

    return (
        <LinearGradient
            colors={['#ff7e5f', '#feb47b']}
            style={styles.container}
        >
            <Animated.View
                entering={FadeInDown}
                exiting={FadeOutUp}
                style={styles.header}
            >
                <Text style={styles.headerText}>Latest News for India</Text>
            </Animated.View>

            {loading ? (
                <ActivityIndicator size="large" color="#fff" style={styles.loader} />
            ) : (
                <Animated.FlatList
                    data={categoryList}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <CategoryComponent
                            category={item}
                            languageData={categoryData[item]}
                        />
                    )}
                    entering={FadeInDown}
                    exiting={FadeOutUp}
                    refreshing={refreshing}  // Set refreshing state to trigger spinner
                    onRefresh={handleRefresh}  // Trigger news fetch on pull to refresh
                />
            )}

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('News')}>
                    <Text style={styles.footerText}>Listen to Audio News</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        padding: 20,
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loader: {
        marginTop: 20,
    },
    footer: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    footerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
