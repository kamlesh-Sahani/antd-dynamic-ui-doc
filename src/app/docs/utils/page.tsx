"use client";

import React, { useState } from "react";
import { UTILS_DATA, UtilItem } from "@/data/utilsData";
import CodeBlock from "@/components/CodeBlock";
import {
  Wrench,
  Search,
  Filter,
  CheckCircle2,
  Terminal,
  Play,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import {
  isSafeUrl,
  adjustColor,
  numberToWords,
  isArray,
  isObject,
  isString,
  isNumber,
  isFunction,
  isUndefined,
  isNotEmpty,
} from "antd-dynamic-ui";

const CATEGORIES = [
  "All",
  "Form & Validation",
  "API & Network",
  "Security & Sanitization",
  "Formatters & Colors",
  "Type Guards",
] as const;

export default function UtilsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expandedUtil, setExpandedUtil] = useState<string | null>("generateZodSchema");

  // Interactive Live Playground State
  const [playgroundInput, setPlaygroundInput] = useState("https://example.com/api");
  const [selectedUtilForTest, setSelectedUtilForTest] = useState<string>("isSafeUrl");
  const [playgroundResult, setPlaygroundResult] = useState<any>(true);

  const filteredUtils = UTILS_DATA.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.signature.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const runTest = (utilName: string, inputVal: string) => {
    setSelectedUtilForTest(utilName);
    try {
      switch (utilName) {
        case "isSafeUrl":
          setPlaygroundResult(isSafeUrl(inputVal));
          break;
        case "adjustColor":
          setPlaygroundResult(adjustColor(inputVal, -20));
          break;
        case "numberToWords":
          setPlaygroundResult(numberToWords(Number(inputVal) || 0));
          break;
        case "isArray":
          setPlaygroundResult(isArray(JSON.parse(inputVal)));
          break;
        case "isObject":
          setPlaygroundResult(isObject(JSON.parse(inputVal)));
          break;
        case "isNumber":
          setPlaygroundResult(isNumber(Number(inputVal)));
          break;
        case "isNotEmpty":
          setPlaygroundResult(isNotEmpty(inputVal));
          break;
        default:
          setPlaygroundResult("Unknown test");
      }
    } catch (err: any) {
      setPlaygroundResult(`Execution Error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
          Pure Utilities & Type Guards
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <Wrench className="text-blue-600 dark:text-blue-400" size={28} />
          <span>Utilities & Type Guards Reference</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
          antd-dynamic-ui ships with 15+ zero-dependency utility functions, schema generators, and 100% dogfooded type guards. Every component inside the library strictly dogfoods these guards to prevent runtime crashes.
        </p>
      </div>

      {/* Interactive Live Playground */}
      <div className="rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-blue-900 dark:text-blue-300">
          <Play size={16} className="text-blue-600 dark:text-blue-400 fill-blue-600" />
          <span>Interactive Live Utilities Sandbox</span>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Test the runtime utility functions live in your browser:
        </p>

        <div className="grid md:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Select Utility</label>
            <select
              value={selectedUtilForTest}
              onChange={(e) => {
                const util = e.target.value;
                setSelectedUtilForTest(util);
                if (util === "isSafeUrl") setPlaygroundInput("https://corp.io");
                else if (util === "adjustColor") setPlaygroundInput("#2563eb");
                else if (util === "numberToWords") setPlaygroundInput("2026");
                else if (util === "isArray") setPlaygroundInput("[1, 2, 3]");
                else if (util === "isObject") setPlaygroundInput('{"key":"value"}');
                else if (util === "isNumber") setPlaygroundInput("42");
                else setPlaygroundInput("Sample");
              }}
              className="w-full text-xs p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
            >
              <option value="isSafeUrl">isSafeUrl(url)</option>
              <option value="adjustColor">adjustColor(hex, -20)</option>
              <option value="numberToWords">numberToWords(number)</option>
              <option value="isArray">isArray(jsonArray)</option>
              <option value="isObject">isObject(jsonObject)</option>
              <option value="isNumber">isNumber(val)</option>
              <option value="isNotEmpty">isNotEmpty(val)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Input Argument</label>
            <input
              type="text"
              value={playgroundInput}
              onChange={(e) => setPlaygroundInput(e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-mono"
            />
          </div>

          <div className="space-y-1 flex flex-col justify-end">
            <button
              onClick={() => runTest(selectedUtilForTest, playgroundInput)}
              className="w-full text-xs font-medium py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Play size={13} />
              <span>Execute Function</span>
            </button>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-white dark:bg-zinc-900 text-xs font-mono flex items-center justify-between border border-blue-200/80 dark:border-zinc-800 shadow-xs">
          <span className="text-zinc-600 dark:text-zinc-400">
            {selectedUtilForTest}({playgroundInput}) =&gt;
          </span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
            {typeof playgroundResult === "boolean"
              ? playgroundResult
                ? "true"
                : "false"
              : String(playgroundResult)}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 text-zinc-400" size={15} />
            <input
              type="text"
              placeholder="Search utilities by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-1 w-full sm:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Utilities Table */}
      <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800">
              <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">Utility Name</th>
              <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">Category</th>
              <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">Type Signature</th>
              <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">Return Type</th>
              <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {filteredUtils.map((util) => {
              const isExpanded = expandedUtil === util.name;
              return (
                <React.Fragment key={util.name}>
                  <tr
                    onClick={() => setExpandedUtil(isExpanded ? null : util.name)}
                    className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/40 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                      {util.name}
                    </td>
                    <td className="py-3 px-4 text-zinc-500 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] font-medium">
                        {util.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-zinc-700 dark:text-zinc-300 max-w-xs truncate">
                      {util.signature}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                      {util.returns}
                    </td>
                    <td className="py-3 px-4 text-right text-zinc-400 hover:text-blue-500">
                      {isExpanded ? "▲ Hide" : "▼ Expand"}
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr className="bg-zinc-50/50 dark:bg-zinc-900/20">
                      <td colSpan={5} className="p-4 space-y-3">
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                            Description
                          </h4>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {util.description}
                          </p>
                        </div>

                        {util.params.length > 0 && (
                          <div className="space-y-1">
                            <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                              Parameters
                            </h4>
                            <div className="space-y-1">
                              {util.params.map((p, idx) => (
                                <div key={idx} className="text-xs flex gap-2">
                                  <span className="font-mono text-blue-500">{p.name}</span>
                                  <span className="font-mono text-amber-500 text-[11px]">({p.type})</span>
                                  <span className="text-zinc-500">— {p.description}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                            Practical Code Examples
                          </h4>
                          <CodeBlock code={util.example} language="typescript" filename={`${util.name}.basic.ts`} />
                          {util.secondaryExample && (
                            <CodeBlock code={util.secondaryExample} language="typescript" filename={`${util.name}.advanced.ts`} />
                          )}
                          {util.advancedExample && (
                            <CodeBlock code={util.advancedExample} language="typescript" filename={`${util.name}.integration.tsx`} />
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
