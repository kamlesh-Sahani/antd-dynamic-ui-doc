"use client";

import React, { useState } from "react";
import CodeBlock from "./CodeBlock";
import { Code2, Sparkles, Sliders, Database, Layers } from "lucide-react";

export interface CodeExampleItem {
  title: string;
  description?: string;
  code: string;
  language?: string;
  filename?: string;
}

interface MultiCodeExamplesProps {
  componentTitle: string;
  defaultCode: string;
  examples?: CodeExampleItem[];
}

export default function MultiCodeExamples({
  componentTitle,
  defaultCode,
  examples,
}: MultiCodeExamplesProps) {
  const allExamples: CodeExampleItem[] =
    examples && examples.length > 0
      ? examples
      : [
          {
            title: "Basic Setup",
            description: `Standard integration for ${componentTitle} with default props.`,
            code: defaultCode,
            language: "tsx",
            filename: `${componentTitle}.basic.tsx`,
          },
        ];

  const [activeIndex, setActiveIndex] = useState(0);
  const currentExample = allExamples[activeIndex] || allExamples[0];

  const getIconForIndex = (index: number) => {
    switch (index) {
      case 0:
        return <Sparkles size={14} className="text-[#c4432b]" />;
      case 1:
        return <Sliders size={14} className="text-[#362117]" />;
      case 2:
        return <Database size={14} className="text-[#437a3b]" />;
      default:
        return <Layers size={14} className="text-[#785c4b]" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Example Switcher Tabs */}
      {allExamples.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#f2ebde] border border-[#ede5d8]">
          {allExamples.map((ex, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-[#362117] font-bold shadow-[0_1px_3px_rgba(54,33,23,0.06)] border border-[#ede5d8]"
                    : "text-[#785c4b] hover:text-[#362117] hover:bg-[#f7f2ea]"
                }`}
              >
                {getIconForIndex(idx)}
                <span>
                  {idx + 1}. {ex.title}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Current Example Description */}
      {currentExample.description && (
        <div className="flex items-start gap-2.5 px-4 py-2.5 rounded-xl bg-[#f5eee3] border border-[#ede5d8] text-xs text-[#5c4738]">
          <Code2 size={16} className="text-[#c4432b] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#362117]">{currentExample.title}: </span>
            <span>{currentExample.description}</span>
          </div>
        </div>
      )}

      {/* Code Block */}
      <CodeBlock
        code={currentExample.code}
        language={currentExample.language || "tsx"}
        filename={currentExample.filename || `${componentTitle}.example.tsx`}
      />
    </div>
  );
}
