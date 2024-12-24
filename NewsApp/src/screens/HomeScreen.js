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

    const fetchNews = async () => {
        setLoading(true);
        try {
            const response = await fetch(NEWS_URL);
            const data = await response.json();
            setNews(data.results);
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
            colors={['#1c1c1c', '#333333']}
            style={styles.container}
        >
            <Animated.View
                entering={FadeInDown}
                exiting={FadeOutUp}
                style={styles.header}
            >
                <Text style={styles.headerText}>India's Latest Headlines</Text>
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
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
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
        padding: 10,
    },
    header: {
        paddingVertical: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#444',
        marginBottom: 10,
    },
    headerText: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loader: {
        marginTop: 20,
    },
    footer: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#222',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginTop: 10,
    },
    footerText: {
        color: '#ff4500',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
