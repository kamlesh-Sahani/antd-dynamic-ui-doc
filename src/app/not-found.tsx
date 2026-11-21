import React from "react";
import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-[#f5eee3] border border-[#ede5d8] flex items-center justify-center text-[#c4432b]">
        <FileQuestion size={32} />
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight text-[#362117]">
        Page or Component Not Found
      </h1>
      <p className="text-sm text-[#5c4738] max-w-md">
        The documentation page or component specification you requested does not exist or has been relocated.
      </p>
      <Link
        href="/docs"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#362117] hover:bg-[#261710] text-white text-xs font-bold transition-colors shadow-xs"
      >
        <ArrowLeft size={14} />
        <span>Return to Documentation</span>
      </Link>
    </div>
  );
}
