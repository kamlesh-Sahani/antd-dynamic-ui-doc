"use client";

import React, { useState } from "react";
import { Copy, Check, FileJson } from "lucide-react";

interface SchemaViewerProps {
  title?: string;
  description?: string;
  schema: object | string;
}

export default function SchemaViewer({
  title = "Expected API Response Payload",
  description = "Your backend API must return JSON matching this exact structure.",
  schema,
}: SchemaViewerProps) {
  const [copied, setCopied] = useState(false);
  const jsonString = typeof schema === "string" ? schema : JSON.stringify(schema, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="my-6 rounded-2xl border border-[#ede5d8] bg-[#f5eee3] overflow-hidden shadow-[0_2px_8px_rgba(54,33,23,0.04)]">
      <div className="flex items-center justify-between px-4 py-3 bg-[#ede5d8] border-b border-[#ded3c3]">
        <div className="flex items-center gap-2.5">
          <FileJson className="text-[#c4432b]" size={18} />
          <div>
            <h4 className="text-xs font-bold text-[#362117]">{title}</h4>
            {description && <p className="text-[11px] text-[#785c4b]">{description}</p>}
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg bg-white hover:bg-[#fffefc] text-[#362117] font-semibold border border-[#ded3c3] shadow-xs transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check size={13} className="text-[#437a3b]" />
              <span className="text-[#437a3b] font-bold">Copied JSON</span>
            </>
          ) : (
            <>
              <Copy size={13} className="text-[#785c4b]" />
              <span>Copy JSON</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-xs font-mono text-[#362117] bg-[#f5eee3] overflow-x-auto leading-relaxed max-h-[450px]">
        {jsonString}
      </pre>
    </div>
  );
}
