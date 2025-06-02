def generate_job_insight_prompt(job_text: str) -> str:
    return f"""
You are a career strategist assistant.

Here is a job listing:
{job_text}

Extract and return the following in JSON:
- job_title
- company
- location
- role_summary
- talking_points (array of 3)
- how_to_stand_out
- company_swot: {{ strengths, weaknesses, opportunities, threats }}
"""
