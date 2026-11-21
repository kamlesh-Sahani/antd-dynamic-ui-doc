"use client";

import React, { useState } from "react";
import { UTILS_DATA, UtilItem } from "@/data/utilsData";
import CodeBlock from "@/components/CodeBlock";
import {
  Wrench,
  Search,
  CheckCircle2,
  Play,
} from "lucide-react";
import {
  isSafeUrl,
  adjustColor,
  numberToWords,
  isArray,
  isObject,
  isNumber,
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
      <div className="space-y-3 pb-6 border-b border-[#ede5d8]">
        <div className="text-xs font-bold text-[#785c4b] uppercase tracking-wider">
          Pure Utilities & Type Guards
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-[#362117] flex items-center gap-2">
          <Wrench className="text-[#c4432b]" size={28} />
          <span>Utilities & Type Guards Reference</span>
        </h1>

        <p className="text-sm sm:text-base text-[#5c4738] leading-relaxed max-w-3xl">
          antd-dynamic-ui ships with 15+ zero-dependency utility functions, schema generators, and 100% dogfooded type guards. Every component inside the library strictly dogfoods these guards to prevent runtime crashes.
        </p>
      </div>

      {/* Interactive Live Playground */}
      <div className="rounded-2xl border border-[#ede5d8] bg-[#f5eee3] p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-[#362117]">
          <Play size={16} className="text-[#c4432b] fill-[#c4432b]" />
          <span>Interactive Live Utilities Sandbox</span>
        </div>
        <p className="text-xs text-[#785c4b]">
          Test the runtime utility functions live in your browser:
        </p>

        <div className="grid md:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#5c4738]">Select Utility</label>
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
              className="w-full text-xs p-2 rounded-lg border border-[#ede5d8] bg-white text-[#362117]"
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
            <label className="text-xs font-semibold text-[#5c4738]">Input Argument</label>
            <input
              type="text"
              value={playgroundInput}
              onChange={(e) => setPlaygroundInput(e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-[#ede5d8] bg-white text-[#362117] font-mono"
            />
          </div>

          <div className="space-y-1 flex flex-col justify-end">
            <button
              onClick={() => runTest(selectedUtilForTest, playgroundInput)}
              className="w-full text-xs font-bold py-2 px-4 rounded-lg bg-[#362117] hover:bg-[#261710] text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Play size={13} />
              <span>Execute Function</span>
            </button>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-white text-xs font-mono flex items-center justify-between border border-[#ede5d8] shadow-xs">
          <span className="text-[#5c4738]">
            {selectedUtilForTest}({playgroundInput}) =&gt;
          </span>
          <span className="text-[#437a3b] font-bold">
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
            <Search className="absolute left-2.5 top-2.5 text-[#8a7566]" size={15} />
            <input
              type="text"
              placeholder="Search utilities by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-[#ede5d8] bg-white text-[#362117] placeholder:text-[#a49384] focus:outline-hidden focus:ring-1 focus:ring-[#e05d44]"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-3 py-1 rounded-lg transition-colors cursor-pointer font-semibold ${
                  activeCategory === cat
                    ? "bg-[#362117] text-white"
                    : "bg-[#f2ebde] text-[#785c4b] hover:bg-[#ede5d8] hover:text-[#362117]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Utilities Table */}
      <div className="overflow-x-auto border border-[#ede5d8] bg-white rounded-xl shadow-[0_1px_4px_rgba(54,33,23,0.04)]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#f7f2ea] border-b border-[#ede5d8]">
              <th className="py-3 px-4 font-bold text-[#362117]">Utility Name</th>
              <th className="py-3 px-4 font-bold text-[#362117]">Category</th>
              <th className="py-3 px-4 font-bold text-[#362117]">Type Signature</th>
              <th className="py-3 px-4 font-bold text-[#362117]">Return Type</th>
              <th className="py-3 px-4 font-bold text-[#362117] text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ede5d8]">
            {filteredUtils.map((util) => {
              const isExpanded = expandedUtil === util.name;
              return (
                <React.Fragment key={util.name}>
                  <tr
                    onClick={() => setExpandedUtil(isExpanded ? null : util.name)}
                    className="hover:bg-[#fcfaf7] cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-[#362117] whitespace-nowrap">
                      {util.name}
                    </td>
                    <td className="py-3 px-4 text-[#785c4b] whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full bg-[#f2ebde] text-[#785c4b] text-[10px] font-bold border border-[#ede5d8]">
                        {util.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-[#5c4738] max-w-xs truncate">
                      {util.signature}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-[#437a3b] font-bold whitespace-nowrap">
                      {util.returns}
                    </td>
                    <td className="py-3 px-4 text-right text-[#785c4b] font-semibold hover:text-[#362117]">
                      {isExpanded ? "▲ Hide" : "▼ Expand"}
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr className="bg-[#fcfaf7]">
                      <td colSpan={5} className="p-4 space-y-3 border-t border-[#ede5d8]">
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-[#362117]">
                            Description
                          </h4>
                          <p className="text-xs text-[#5c4738] leading-relaxed">
                            {util.description}
                          </p>
                        </div>

                        {util.params.length > 0 && (
                          <div className="space-y-1">
                            <h4 className="text-xs font-bold text-[#362117]">
                              Parameters
                            </h4>
                            <div className="space-y-1">
                              {util.params.map((p, idx) => (
                                <div key={idx} className="text-xs flex gap-2">
                                  <span className="font-mono text-[#362117] font-semibold">{p.name}</span>
                                  <span className="font-mono text-[#c07212] text-[11px]">({p.type})</span>
                                  <span className="text-[#5c4738]">— {p.description}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-[#362117]">
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
