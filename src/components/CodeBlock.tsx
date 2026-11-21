"use client";

import React, { useState } from "react";
import { Highlight, PrismTheme } from "prism-react-renderer";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

// Warm artisanal toast syntax theme matching React Hot Toast palette
const toastPrismTheme: PrismTheme = {
  plain: {
    color: "#362117",
    backgroundColor: "transparent",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: "#9c8473", fontStyle: "italic" },
    },
    {
      types: ["keyword", "tag", "operator", "rule"],
      style: { color: "#c4432b", fontWeight: "bold" },
    },
    {
      types: ["string", "attr-value", "char"],
      style: { color: "#437a3b" },
    },
    {
      types: ["number", "boolean", "constant"],
      style: { color: "#c07212" },
    },
    {
      types: ["function", "class-name", "builtin"],
      style: { color: "#2563eb", fontWeight: "600" },
    },
    {
      types: ["attr-name", "property"],
      style: { color: "#785c4b" },
    },
    {
      types: ["punctuation", "selector"],
      style: { color: "#8a7566" },
    },
    {
      types: ["variable"],
      style: { color: "#8b5cf6" },
    },
  ],
};

export default function CodeBlock({
  code,
  language = "tsx",
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="relative my-4 rounded-xl border border-[#ede5d8] bg-[#f5eee3] text-[#362117] overflow-hidden shadow-[0_1px_4px_rgba(54,33,23,0.04)]">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#ede5d8] border-b border-[#e2d7c5] text-xs font-mono text-[#362117]">
          <span className="font-semibold">{filename}</span>
          <span className="uppercase text-[10px] tracking-wider text-[#785c4b] font-bold">
            {language}
          </span>
        </div>
      )}
      <button
        onClick={handleCopy}
        aria-label="Copy code to clipboard"
        className="absolute top-2.5 right-2.5 z-10 px-2.5 py-1 rounded-lg bg-white hover:bg-[#fffdf9] text-[#362117] hover:text-[#2d1a10] transition-all text-xs flex items-center gap-1.5 border border-[#ede5d8] shadow-[0_1px_3px_rgba(54,33,23,0.06)] cursor-pointer"
      >
        {copied ? (
          <>
            <Check size={13} className="text-emerald-700" />
            <span className="text-emerald-700 font-bold text-[11px]">
              Copied
            </span>
          </>
        ) : (
          <>
            <Copy size={13} className="text-[#785c4b]" />
            <span className="text-[11px] font-semibold text-[#5c4738]">Copy</span>
          </>
        )}
      </button>

      <Highlight theme={toastPrismTheme} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} p-4 text-[13px] font-mono overflow-x-auto leading-relaxed bg-transparent`}
            style={{ ...style, background: "transparent" }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="inline-block w-8 select-none text-[#a49384] text-right pr-4 text-xs font-mono">
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
