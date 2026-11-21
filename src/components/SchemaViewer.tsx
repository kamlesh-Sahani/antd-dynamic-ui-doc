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
    <div className="my-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 overflow-hidden shadow-xs">
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <FileJson className="text-blue-400" size={18} />
          <div>
            <h4 className="text-xs font-semibold text-zinc-200">{title}</h4>
            {description && <p className="text-[11px] text-zinc-400">{description}</p>}
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied JSON</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy JSON</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-xs font-mono text-emerald-400 bg-zinc-950 overflow-x-auto leading-relaxed max-h-[450px]">
        {jsonString}
      </pre>
    </div>
  );
}
