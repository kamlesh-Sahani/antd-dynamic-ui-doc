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
    return <p className="text-sm text-[#785c4b] py-4 italic">No known response mismatches reported.</p>;
  }

  return (
    <div className="my-6 space-y-6">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="rounded-2xl border border-[#ede5d8] bg-white p-6 shadow-[0_2px_12px_rgba(54,33,23,0.04)]"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-[#fdf5eb] border border-[#fbd38d] flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="text-[#c07212]" size={18} />
            </div>
            <div className="space-y-2 w-full">
              <h4 className="font-bold text-[#362117] text-base">
                {item.issue}
              </h4>
              <p className="text-sm text-[#5c4738] leading-relaxed">
                <strong className="text-[#362117]">Why it happens: </strong>
                {item.cause}
              </p>
              <div className="text-sm text-[#5c4738] leading-relaxed">
                <strong className="text-[#362117]">How to fix it: </strong>
                {item.solution}
              </div>

              {(item.incorrectSnippet || item.correctSnippet) && (
                <div className="grid md:grid-cols-2 gap-4 mt-4 pt-3 border-t border-[#ede5d8]">
                  {item.incorrectSnippet && (
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#c4432b] mb-1">
                        <XCircle size={14} />
                        <span>Incorrect Backend Response</span>
                      </div>
                      <CodeBlock code={item.incorrectSnippet} language="json" />
                    </div>
                  )}
                  {item.correctSnippet && (
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#437a3b] mb-1">
                        <CheckCircle2 size={14} />
                        <span>Expected Schema Payload</span>
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
