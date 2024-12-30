from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline
from gtts import gTTS
import requests
import base64
import os
from googletrans import Translator

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (you can restrict this to specific domains)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all HTTP headers
)

# Define your API key and base URL
API_KEY = '1fcd925c29b9ab4ded9b54b1db6bfafa'
BASE_URL = f'http://api.mediastack.com/v1/news?access_key={API_KEY}&countries=in&limit=30'

# Load summarization pipeline
summarizer = pipeline("summarization")

translator = Translator()

def fetch_news():
    """Fetch news articles from the API."""
    try:
        response = requests.get(BASE_URL)
        if response.status_code == 200:
            news_data = response.json()
            return news_data
        else:
            raise HTTPException(status_code=response.status_code, detail=response.text)
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))

def summarize_article(description: str):
    """Summarize the article description."""
    if not description:
        return "No description provided for this article."
    try:
        summary = summarizer(description, max_length=50, min_length=30, do_sample=False)
        return summary[0]['summary_text']
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def translate_to_hindi(text: str):
    """Translate English text to Hindi using Googletrans library."""
    try:
        translated = translator.translate(text, src='en', dest='hi')
        return translated.text
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Translation failed: {str(e)}")

def text_to_speech_base64(text: str, lang: str = 'en'):
    """Convert text to speech and return the audio as base64."""
    try:
        tts = gTTS(text=text, lang=lang)
        audio_filename = "temp.mp3"
        tts.save(audio_filename)

        # Convert audio to base64
        with open(audio_filename, "rb") as audio_file:
            audio_base64 = base64.b64encode(audio_file.read()).decode("utf-8")

        # Clean up the temporary audio file
        os.remove(audio_filename)

        return audio_base64
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Text-to-speech failed: {str(e)}")

@app.get("/process-news")
def process_news():
    """Fetch news, generate audio summaries in English and Hindi, and return base64 audio with categories."""
    news_data = fetch_news()

    if 'data' in news_data and news_data['data']:
        processed_articles = []
        for article in news_data['data']:
            title = article.get('title', 'No title available')
            description = article.get('description', 'No description available')
            category = article.get('category', 'No category available')

            try:
                # Summarize the article (for generating audio only)
                summary = summarize_article(description)

                # Generate English audio as base64 from the summary
                english_audio_base64 = text_to_speech_base64(summary, lang='en')

                # Translate the summary to Hindi
                hindi_summary = translate_to_hindi(summary)

                # Generate Hindi audio as base64
                hindi_audio_base64 = text_to_speech_base64(hindi_summary, lang='hi')

                # Append article data with both English and Hindi audio
                processed_articles.append({
                    "title": title,
                    "category": category,
                    "english_audio_base64": english_audio_base64,
                    "hindi_audio_base64": hindi_audio_base64
                })

            except Exception as e:
                # Log errors for specific articles but continue processing others
                processed_articles.append({
                    "title": title,
                    "category": category,
                    "error": f"Failed to process article: {str(e)}"
                })

        return {"articles": processed_articles}
    else:
        raise HTTPException(status_code=404, detail="No articles found.")
