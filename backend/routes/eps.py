import requests
from flask import Flask, jsonify
from flask import Blueprint

from dotenv import load_dotenv
import os

load_dotenv()
FMP_API_KEY = os.getenv("FMP_API_KEY")
eps_bp = Blueprint("eps", __name__)


@eps_bp.route("/eps-history/<ticker>")
def get_eps_history(ticker):
    url = f"https://financialmodelingprep.com/api/v3/income-statement/{ticker}?limit=20&apikey={FMP_API_KEY}"
    response = requests.get(url)
    data = response.json()

    eps_data = [
        {"year": item["calendarYear"], "eps": item["epsdiluted"]}
        for item in data
        if "calendarYear" in item and "epsdiluted" in item
    ]

    # Optional: sort by year descending
    eps_data = sorted(eps_data, key=lambda x: x["year"], reverse=True)

    return jsonify({"ticker": ticker.upper(), "eps_history": eps_data})
