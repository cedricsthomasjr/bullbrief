type Exec = { name: string; title: string; pay: string };

export default function ExecutiveCard({ exec }: { exec: Exec }) {
  const formattedPay =
    exec.pay === "--" ? "Not Disclosed" : `$${Number(exec.pay).toLocaleString()}`;

  return (
    <div
      className="rounded-xl p-5 space-y-2 transition-all"
      style={{ backgroundColor: "#0c1829", border: "1px solid rgba(56,189,248,0.1)" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(56,189,248,0.22)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(56,189,248,0.1)")}
    >
      <div>
        <h3 className="text-sm font-semibold text-blue-50 leading-snug">{exec.name}</h3>
        <p className="text-xs text-slate-500 mt-0.5">{exec.title}</p>
      </div>
      <p
        className="text-xs font-mono tabular-nums"
        style={{ color: exec.pay === "--" ? "#334155" : "#10b981" }}
      >
        {formattedPay}
      </p>
    </div>
  );
}
