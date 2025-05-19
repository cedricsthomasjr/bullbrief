from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from openai import OpenAI
import yfinance as yf

load_dotenv()

app = Flask(__name__)
CORS(app)

client = OpenAI()  # ← v1.0+ style

def generate_prompt(company_name, ticker, sector, market_cap, pe_ratio, range_52w):
    return f"""
You are a financial analyst assistant. Summarize the following company's core business, recent performance, and industry position. Include a brief SWOT analysis and an investor-friendly outlook.

Company: {company_name}
Stock Ticker: {ticker}
Sector: {sector}
Market Cap: {market_cap}
P/E Ratio: {pe_ratio}
52-Week Range: {range_52w}

Format:
- Business Summary
- SWOT
- Outlook
"""


@app.route("/summary/<ticker>")
def get_summary(ticker):
    try:
        stock = yf.Ticker(ticker)
        info = stock.info

        # Pull data
        company_name = info.get("longName", "")
        sector = info.get("sector", "")
        market_cap = info.get("marketCap", "")
        pe_ratio = info.get("trailingPE", "")
        range_52w = f"{info.get('fiftyTwoWeekLow')} - {info.get('fiftyTwoWeekHigh')}"

        # Format prompt
        prompt = generate_prompt(company_name, ticker.upper(), sector, market_cap, pe_ratio, range_52w)

        # GPT-4o or fallback to gpt-4
        response = client.chat.completions.create(
            model="gpt-4.1-nano",
            messages=[
                {"role": "system", "content": "You are a helpful financial analyst."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=500
        )

        summary_text = response.choices[0].message.content

        return jsonify({
            "company_name": company_name,
            "ticker": ticker.upper(),
            "summary": summary_text,
            "market_cap": market_cap,
            "pe_ratio": pe_ratio,
            "range_52w": range_52w,
            "sector": sector
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
