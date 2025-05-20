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

    # Normalize the metric key (case-insensitive match)
    matched_key = next((k for k in data.keys() if k.lower() == metric.lower()), None)

    if not matched_key or not isinstance(data[matched_key], list):
        return jsonify({ "error": f"No valid data found for metric '{metric}'" }), 404

    metric_data = data[matched_key]  # ✅ THIS LINE MUST BE OUTSIDE THE 'if'

    # Format data string: "2024: 500, 2023: 450, ..."
    trend_string = ", ".join(f"{row['year']}: {row['value']}" for row in metric_data[:10])

    prompt = f"""
You are a financial analyst. Briefly summarize the {metric} trend for {ticker.upper()} from the following data:

{trend_string}

Use clear, simple language. Focus on direction, key jumps, and investor relevance. Limit to 4 bullet points max.
"""


    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    return jsonify({ "analysis": response.choices[0].message.content.strip() })
