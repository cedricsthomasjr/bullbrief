from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from openai import OpenAI
import yfinance as yf
import re

load_dotenv()

app = Flask(__name__)
CORS(app)

client = OpenAI()

def generate_prompt(company_name, ticker, sector, market_cap, pe_ratio, range_52w):
    return f"""
You are a financial analyst assistant. Summarize the following company's core business, recent performance, and industry position. Include a brief SWOT analysis and an investor-friendly outlook.

Company: {company_name}
Stock Ticker: {ticker}
Sector: {sector}
Market Cap: {market_cap}
P/E Ratio: {pe_ratio}
52-Week Range: {range_52w}

Format your response using the **exact headers below** (do not rename or reword):

Business Summary  
----------------

SWOT  
----------------

Outlook  
----------------
"""

def normalize_section_name(name):
    name = name.lower()
    if "business" in name: return "Business Summary"
    if "swot" in name: return "SWOT"
    if "outlook" in name: return "Outlook"
    return name.title()

def split_sections(text):
    """
    Parses GPT output using flexible section headings.
    Works for `---`, colons, and markdown-style headers.
    """
    pattern = r"(?:^|\n)(#{1,3}|\*+)?\s*(Business Summary|SWOT(?: Analysis)?|Outlook)\s*[:\-–]*\s*\n"
    matches = list(re.finditer(pattern, text, re.IGNORECASE))

    if not matches:
        return {"Business Summary": "", "SWOT": "", "Outlook": ""}

    sections = {}
    for i, match in enumerate(matches):
        start = match.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        section_name = normalize_section_name(match.group(2))
        sections[section_name] = text[start:end].strip()

    for key in ["Business Summary", "SWOT", "Outlook"]:
        sections.setdefault(key, "")

    return sections

@app.route("/summary/<ticker>")
def get_summary(ticker):
    try:
        stock = yf.Ticker(ticker)
        info = stock.info

        company_name = info.get("longName", "")
        sector = info.get("sector", "")
        market_cap = info.get("marketCap", "")
        pe_ratio = info.get("trailingPE", "")
        range_52w = f"{info.get('fiftyTwoWeekLow')} - {info.get('fiftyTwoWeekHigh')}"

        prompt = generate_prompt(company_name, ticker.upper(), sector, market_cap, pe_ratio, range_52w)

        response = client.chat.completions.create(
            model="gpt-4.1-nano",
            messages=[
                {"role": "system", "content": "You are a helpful financial analyst."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=600
        )

        summary_text = response.choices[0].message.content.strip()

        print("📦 RAW GPT OUTPUT ↓↓↓\n")
        print(summary_text)
        print("\n========================\n")

        section_map = split_sections(summary_text)

        return jsonify({
            "company_name": company_name,
            "ticker": ticker.upper(),
            "business_summary": section_map.get("Business Summary", ""),
            "swot": section_map.get("SWOT", ""),
            "outlook": section_map.get("Outlook", ""),
            "market_cap": market_cap,
            "pe_ratio": pe_ratio,
            "range_52w": range_52w,
            "sector": sector,
            "raw_summary": summary_text  # <- for debug inspection
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
import requests

@app.route("/news/<ticker>")
def get_stock_news(ticker):
    try:
        news_api_key = os.getenv("NEWS_API_KEY")

        url = "https://newsapi.org/v2/everything"
        params = {
            "q": ticker,
            "sortBy": "publishedAt",
            "language": "en",
            "pageSize": 5,
            "apiKey": news_api_key
        }

        response = requests.get(url, params=params)
        data = response.json()

        articles = [
            {
                "title": a.get("title"),
                "publisher": a.get("source", {}).get("name"),
                "link": a.get("url"),
                "providerPublishTime": a.get("publishedAt")
            }
            for a in data.get("articles", [])
        ]

        return jsonify({"ticker": ticker.upper(), "news": articles})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
