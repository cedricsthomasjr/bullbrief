from flask import Blueprint, request, jsonify
from openai import OpenAI
from utils.scraper import scrape_macrotrends
from utils.helpers import resolve_slug
import os

router = Blueprint("interpret", __name__)
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@router.route("/interpret/<ticker>", methods=["GET"])
def interpret_metric(ticker):
    metric = request.args.get("metric")
    if not metric:
        return jsonify({"error": "Metric parameter is required"}), 400

    slug = resolve_slug(ticker)
    data = scrape_macrotrends(ticker.upper(), slug)

    metric_data = data.get(metric)
    if not metric_data or not isinstance(metric_data, list):
        return jsonify({"error": f"No valid data found for metric '{metric}'"}), 404

    # Format data string: "2024: 500, 2023: 450, ..."
    trend_string = ", ".join(f"{row['year']}: {row['value']}" for row in metric_data[:10])

    prompt = f"""
You are a financial analyst. Interpret the trend in the {metric} data for {ticker.upper()} using the values below:

{trend_string}

Describe key changes, notable spikes or dips, and what it might mean for investors.
"""

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )

    return jsonify({ "analysis": response.choices[0].message.content.strip() })
