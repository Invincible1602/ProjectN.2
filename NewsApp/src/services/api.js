const API_URL = "http://192.168.29.234:8000/process-news";

export const fetchNewsArticles = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch news articles");
    }
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching news articles:", error);
    throw error;
  }
};