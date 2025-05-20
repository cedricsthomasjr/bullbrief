type Exec = {
  name: string;
  title: string;
  pay: string;
};

export default function ExecutiveCard({ exec }: { exec: Exec }) {
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 shadow-md hover:border-blue-400 transition">
      <h3 className="text-lg font-semibold text-white">{exec.name}</h3>
      <p className="text-sm text-gray-400">{exec.title}</p>
      <p className="text-sm mt-2 text-green-400 font-mono">
        {exec.pay === "--" ? "Not Disclosed" : `$${exec.pay}`}
      </p>
    </div>
  );
}
