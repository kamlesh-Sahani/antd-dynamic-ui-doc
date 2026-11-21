"use client";

import React from "react";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import CodeBlock from "./CodeBlock";

export interface TroubleshootingItem {
  issue: string;
  cause: string;
  solution: string;
  incorrectSnippet?: string;
  correctSnippet?: string;
}

interface TroubleshootCardProps {
  items: TroubleshootingItem[];
}

export default function TroubleshootCard({ items }: TroubleshootCardProps) {
  if (!items || items.length === 0) {
    return <p className="text-sm text-zinc-500 py-4 italic">No known response mismatches reported.</p>;
  }

  return (
    <div className="my-6 space-y-6">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/10 p-5 shadow-xs"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" size={20} />
            <div className="space-y-2 w-full">
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base">
                {item.issue}
              </h4>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <strong className="text-zinc-900 dark:text-zinc-200">Why it happens: </strong>
                {item.cause}
              </p>
              <div className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <strong className="text-zinc-900 dark:text-zinc-200">How to fix it: </strong>
                {item.solution}
              </div>

              {(item.incorrectSnippet || item.correctSnippet) && (
                <div className="grid md:grid-cols-2 gap-4 mt-4 pt-2 border-t border-amber-200/60 dark:border-amber-900/30">
                  {item.incorrectSnippet && (
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 mb-1">
                        <XCircle size={14} />
                        <span>Incorrect Backend Response</span>
                      </div>
                      <CodeBlock code={item.incorrectSnippet} language="json" />
                    </div>
                  )}
                  {item.correctSnippet && (
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                        <CheckCircle2 size={14} />
                        <span>Expected Backend Response</span>
                      </div>
                      <CodeBlock code={item.correctSnippet} language="json" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
