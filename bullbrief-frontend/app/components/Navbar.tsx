"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrendingUp } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/compare", label: "Compare" },
    { href: "/glossary", label: "Glossary" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
      style={{
        backgroundColor: "rgba(6, 12, 26, 0.85)",
        borderBottom: "1px solid rgba(56, 189, 248, 0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(99,102,241,0.2))",
              border: "1px solid rgba(56, 189, 248, 0.25)",
            }}
          >
            <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <span className="font-bold text-sm gradient-text">BullBrief</span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                pathname === link.href
                  ? "text-sky-300"
                  : "text-slate-500 hover:text-slate-300"
              }`}
              style={
                pathname === link.href
                  ? { backgroundColor: "rgba(56, 189, 248, 0.08)" }
                  : {}
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
