export default function AISummaryBlock({
    summary,
    ticker,
  }: {
    summary: string;
    ticker: string;
  }) {
    return (
      <div className="bg-zinc-900 rounded-xl p-4 text-white">
        <h3 className="text-blue-400 font-semibold mb-2 text-sm">
          AI Summary – {ticker}
        </h3>
        <p className="text-sm leading-relaxed whitespace-pre-line">{summary || "No summary available."}</p>
      </div>
    );
  }
  