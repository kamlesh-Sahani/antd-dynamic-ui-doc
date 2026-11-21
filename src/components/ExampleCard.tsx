"use client";

import React, { useState } from "react";
import CodeBlock from "./CodeBlock";
import { Code2, ChevronDown, ChevronUp } from "lucide-react";

interface ExampleCardProps {
  index: number;
  title: string;
  description?: string;
  code: string;
  language?: string;
  filename?: string;
  preview: React.ReactNode;
}

export default function ExampleCard({
  index,
  title,
  description,
  code,
  language = "tsx",
  filename,
  preview,
}: ExampleCardProps) {
  const [showCode, setShowCode] = useState(true);

  return (
    <div className="rounded-2xl border border-[#ede5d8] bg-white overflow-hidden shadow-[0_2px_12px_rgba(54,33,23,0.04)]">
      {/* Example Header */}
      <div className="px-6 py-4 bg-[#fbf8f2] border-b border-[#ede5d8] flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#f2ebde] text-[#785c4b] border border-[#ede5d8]">
              Example {index + 1}
            </span>
            <h3 className="text-base font-bold text-[#362117]">
              {title}
            </h3>
          </div>
          {description && (
            <p className="text-xs text-[#5c4738] max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <button
          onClick={() => setShowCode(!showCode)}
          className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white hover:bg-[#fffdfa] text-[#362117] border border-[#ede5d8] shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <Code2 size={14} className="text-[#c4432b]" />
          <span>{showCode ? "Hide Code" : "View Code"}</span>
          {showCode ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {/* Live Interactive Preview Box */}
      <div className="p-6 bg-white">
        <div className="flex items-center gap-2 mb-3 text-[11px] font-bold text-[#785c4b] uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#437a3b] animate-pulse" />
          <span>Live Interactive Demo</span>
        </div>
        {preview}
      </div>

      {/* Code Block */}
      {showCode && (
        <div className="border-t border-[#ede5d8] bg-[#f5eee3]">
          <CodeBlock
            code={code}
            language={language}
            filename={filename || `Example.${index + 1}.tsx`}
          />
        </div>
      )}
    </div>
  );
}
