"use client";
import { ReactNode } from "react";

type Props = {
  label: string;
  children: ReactNode;
};

export default function Tooltip({ label, children }: Props) {
  return (
    <div className="group relative w-full cursor-help">
      <div className="bg-zinc-800 px-3 py-1 rounded-full w-full text-left">
        {children}
      </div>
      <div className="absolute z-10 hidden group-hover:block top-full mt-1 left-0 w-64 text-xs bg-zinc-900 text-gray-200 border border-zinc-700 rounded p-2 shadow-xl">
        {label}
      </div>
    </div>
  );
}
