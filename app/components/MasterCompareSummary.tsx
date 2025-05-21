export default function MasterCompareSummary({ summary }: { summary: string }) {
    if (!summary) return null;
  
    return (
      <div className="bg-blue-950 text-white rounded-xl p-6 mt-10 border border-blue-600 shadow-xl max-w-5xl mx-auto">
        <h3 className="text-lg font-semibold text-cyan-300 mb-2">📊 Master Comparison Summary</h3>
        <p className="text-sm text-gray-200 leading-relaxed">{summary}</p>
      </div>
    );
  }
  