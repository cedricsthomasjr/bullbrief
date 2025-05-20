import ExecutiveCard from "./ExecutiveCard";

type Executive = {
  name: string;
  title: string;
  pay: string;
};

export default function ExecutiveGrid({ execs }: { execs: Executive[] }) {
  if (!execs || execs.length === 0) {
    console.log("❌ No execs to render"); // keep this for now
    return null;
  }

  console.log("✅ Rendering ExecutiveGrid with", execs.length, "execs");

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold text-blue-300 mb-4">💼 Executive Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {execs.map((exec, i) => (
          <ExecutiveCard key={i} exec={exec} />
        ))}
      </div>
    </section>
  );
}
