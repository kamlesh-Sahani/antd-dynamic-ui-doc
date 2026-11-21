import React from "react";
import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
        <FileQuestion size={32} />
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
        Page or Component Not Found
      </h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
        The documentation page or component specification you requested does not exist or has been relocated.
      </p>
      <Link
        href="/docs"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-sm"
      >
        <ArrowLeft size={14} />
        <span>Return to Documentation</span>
      </Link>
    </div>
  );
}
