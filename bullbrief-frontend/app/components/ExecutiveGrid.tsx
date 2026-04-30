import ExecutiveCard from "./ExecutiveCard";

type Executive = {
  name: string;
  title: string;
  pay: string;
};

export default function ExecutiveGrid({ execs }: { execs: Executive[] }) {
  if (!execs || execs.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {execs.map((exec, i) => (
        <ExecutiveCard key={i} exec={exec} />
      ))}
    </div>
  );
}
