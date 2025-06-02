from fastapi import APIRouter, Request
from pydantic import BaseModel
from utils.scraper import get_job_text_from_url
from utils.jobprompt import generate_job_insight_prompt
from openai import OpenAI
import os
import json

router = APIRouter()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class JobRequest(BaseModel):
    url: str

@router.post("/jobmode")
async def jobmode_route(payload: JobRequest):
    job_text = get_job_text_from_url(payload.url)
    prompt = generate_job_insight_prompt(job_text)

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.4,
    )

    content = response.choices[0].message.content
    try:
        parsed = json.loads(content)
    except Exception as e:
        parsed = {"error": "Failed to parse AI response", "raw": content}

    return parsed
