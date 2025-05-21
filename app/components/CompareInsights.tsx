export default function CompareInsights({ insight }: { insight: string }) {
    return (
      <div className="mt-6 bg-zinc-900 p-4 rounded-xl text-white">
        <h3 className="text-lg font-semibold mb-2 text-blue-400">AI Insights</h3>
        <p className="text-sm leading-relaxed whitespace-pre-line">{insight}</p>
      </div>
    );
  }
  