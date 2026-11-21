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
        return <Sparkles size={14} className="text-blue-500" />;
      case 1:
        return <Sliders size={14} className="text-indigo-500" />;
      case 2:
        return <Database size={14} className="text-emerald-500" />;
      default:
        return <Layers size={14} className="text-zinc-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Example Switcher Tabs */}
      {allExamples.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          {allExamples.map((ex, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 font-semibold shadow-xs border border-zinc-200 dark:border-zinc-700"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
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
        <div className="flex items-start gap-2 px-3.5 py-2.5 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-300">
          <Code2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">{currentExample.title}: </span>
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
