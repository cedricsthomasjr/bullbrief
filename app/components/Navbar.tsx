"use client";

import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-zinc-800 bg-black/80">
      <div className="mx-auto px-6 md:px-12 py-4 flex items-center justify-between max-w-7xl">
        <Link href="/" className="flex items-center gap-2 text-blue-400 font-bold text-lg">
          <BriefcaseBusiness className="w-5 h-5" />
          BullBrief
        </Link>
        <nav className="text-sm text-zinc-400 space-x-6 hidden md:block">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/about" className="hover:text-white transition">About</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
