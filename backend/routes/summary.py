# backend/app/routes/summary.py
from flask import Blueprint, jsonify
from dotenv import load_dotenv
import os
import yfinance as yf
from utils.prompt import generate_prompt
from utils.sections import split_sections
from utils.helpers import map_to_tradingview_exchange
load_dotenv()
summary_bp = Blueprint("summary", __name__)
from openai import OpenAI

client = OpenAI()

@summary_bp.route("/summary/<ticker>")
def get_summary(ticker):
    try:
        stock = yf.Ticker(ticker)
        info = stock.info

        company_name = info.get("longName", "")
        sector = info.get("sector", "")
        market_cap = info.get("marketCap", "")
        pe_ratio = info.get("trailingPE", "")
        range_52w = f"{info.get('fiftyTwoWeekLow')} - {info.get('fiftyTwoWeekHigh')}"
        raw_exchange = info.get("exchange", "NAS")
        exchange_symbol = f"{map_to_tradingview_exchange(raw_exchange)}:{ticker.upper()}"

        prompt = generate_prompt(company_name, ticker.upper(), sector, market_cap, pe_ratio, range_52w)

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful financial analyst."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=600
        )

        summary_text = response.choices[0].message.content.strip()
        section_map = split_sections(summary_text)

        return jsonify({
            "company_name": company_name,
            "ticker": ticker.upper(),
            "exchange": raw_exchange,
            "exchange_symbol": exchange_symbol,
            "business_summary": section_map.get("Business Summary", ""),
            "swot": section_map.get("SWOT", ""),
            "outlook": section_map.get("Outlook", ""),
            "market_cap": market_cap,
            "pe_ratio": pe_ratio,
            "range_52w": range_52w,
            "sector": sector,
            "current_price": info.get("currentPrice"),
            "eps_ttm": info.get("trailingEps"),
            "forward_pe": info.get("forwardPE"),
            "dividend_yield": info.get("dividendYield"),
            "beta": info.get("beta"),
            "volume": info.get("volume"),
            "avg_volume": info.get("averageVolume"),
            "peg_ratio": info.get("pegRatio"),
            "price_to_sales": info.get("priceToSalesTrailing12Months"),
            "price_to_book": info.get("priceToBook"),
            "roe": info.get("returnOnEquity"),
            "free_cashflow": info.get("freeCashflow"),
            "debt_to_equity": info.get("debtToEquity"),
            "profit_margin": info.get("profitMargins"),
            "institutional_ownership": info.get("heldPercentInstitutions"),
            "short_percent": info.get("shortPercentOfFloat"),
            "raw_summary": summary_text
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
