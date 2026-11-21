"use client";

import React, { useState, useEffect } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({
  code,
  language = "tsx",
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const activeTheme = isDark ? themes.vsDark : themes.github;

  return (
    <div className="relative my-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-hidden shadow-xs">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-100/80 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400">
          <span className="font-medium">{filename}</span>
          <span className="uppercase text-[10px] tracking-wider text-zinc-500 font-semibold">
            {language}
          </span>
        </div>
      )}
      <button
        onClick={handleCopy}
        aria-label="Copy code to clipboard"
        className="absolute top-2.5 right-2.5 z-10 px-2 py-1 rounded-md bg-white dark:bg-zinc-800/90 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all text-xs flex items-center gap-1.5 border border-zinc-200 dark:border-zinc-700/60 shadow-xs cursor-pointer"
      >
        {copied ? (
          <>
            <Check size={13} className="text-emerald-600 dark:text-emerald-400" />
            <span className="text-emerald-600 dark:text-emerald-400 font-medium text-[11px]">
              Copied
            </span>
          </>
        ) : (
          <>
            <Copy size={13} />
            <span className="text-[11px]">Copy</span>
          </>
        )}
      </button>

      <Highlight theme={activeTheme} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} p-4 text-[13px] font-mono overflow-x-auto leading-relaxed bg-transparent`}
            style={{ ...style, background: "transparent" }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="inline-block w-8 select-none text-zinc-400 dark:text-zinc-600 text-right pr-4 text-xs font-mono">
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
