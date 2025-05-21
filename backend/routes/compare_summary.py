from flask import Blueprint, request, jsonify
import yfinance as yf
from openai import OpenAI
import os

compare_bp = Blueprint("compare", __name__)
client = OpenAI()

def safe(val):
    return round(val, 6) if isinstance(val, (int, float)) else None

def fetch_ticker_data(ticker):
    try:
        stock = yf.Ticker(ticker)
        info = stock.info

        if not info or "shortName" not in info:
            print(f"[⚠️ Skipped] Incomplete info for {ticker}")
            return None

        return {
            "ticker": ticker,
            "company_name": info.get("shortName"),
            "market_cap": safe(info.get("marketCap")),
            "pe_ratio": safe(info.get("trailingPE")),
            "roe": safe(info.get("returnOnEquity")),
            "profit_margin": safe(info.get("profitMargins")),
            "sector": info.get("sector")
        }

    except Exception as e:
        print(f"[❌ ERROR] Failed to fetch {ticker}: {str(e)}")
        return None

@compare_bp.route("/compare-summary", methods=["POST"])
def compare_summary():
    try:
        tickers = request.json.get("tickers", [])
        tickers = [t.strip().upper() for t in tickers]

        print(f"🔍 Incoming tickers: {tickers}")

        companies = [fetch_ticker_data(t) for t in tickers]
        companies = [c for c in companies if c]

        if len(companies) < 2:
            return jsonify({"tickers": [], "insight": "Not enough valid companies to compare."})

        prompt = "\n".join([
            f"{c['company_name']} ({c['ticker']}): "
            f"PE={c['pe_ratio'] or 'N/A'}, "
            f"ROE={c['roe'] or 'N/A'}, "
            f"Margin={c['profit_margin'] or 'N/A'}"
            for c in companies
        ])

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": f"Compare the following:\n{prompt}"}]
        )

        return jsonify({
            "tickers": companies,
            "insight": response.choices[0].message.content
        })

    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500
