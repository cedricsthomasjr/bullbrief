export async function fetchJobInsights(url: string) {
    const res = await fetch("http://localhost:8000/jobmode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
  
    if (!res.ok) throw new Error("Failed to fetch job data");
    return res.json();
  }
  