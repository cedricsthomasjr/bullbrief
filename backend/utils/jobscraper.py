import requests
from bs4 import BeautifulSoup

def get_job_text_from_url(url: str) -> str:
    try:
        res = requests.get(url, timeout=10)
        soup = BeautifulSoup(res.text, "html.parser")
        paragraphs = soup.find_all("p")
        return "\n".join(p.text.strip() for p in paragraphs if len(p.text.strip()) > 40)
    except Exception as e:
        return f"Could not scrape job description. Error: {str(e)}"

