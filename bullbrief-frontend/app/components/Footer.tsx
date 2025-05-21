"use client";

export default function Footer() {
  return (
    <footer className="bg-black text-zinc-500 border-t border-zinc-800 py-6 mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-sm">
        <p>© {new Date().getFullYear()} BullBrief. Built by CJ Thomas.</p>
        <div className="space-x-4 mt-2 md:mt-0">
          <a href="https://github.com/cedricsthomasjr" target="_blank" className="hover:text-white transition">GitHub</a>
          <a href="https://www.linkedin.com/in/cedric-thomas-jr/" target="_blank" className="hover:text-white transition">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
