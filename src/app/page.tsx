"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Terminal,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Database,
  CheckCircle2,
  Scissors,
} from "lucide-react";

export default function HomePage() {
  const [copiedPkg, setCopiedPkg] = useState(false);
  const [selectedPm, setSelectedPm] = useState<"npm" | "pnpm" | "yarn">("npm");

  const installCmds = {
    npm: "npm install antd-dynamic-ui antd @ant-design/icons react-hook-form zod",
    pnpm: "pnpm add antd-dynamic-ui antd @ant-design/icons react-hook-form zod",
    yarn: "yarn add antd-dynamic-ui antd @ant-design/icons react-hook-form zod",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmds[selectedPm]);
    setCopiedPkg(true);
    setTimeout(() => setCopiedPkg(false), 2000);
  };

  const checklistItems = [
    "Hot by default",
    "Easy to use",
    "60fps Virtual Scrolling",
    "Automated Zod Engine",
    "22+ Form Controls",
    "Promise & Async API",
    "100% Tree-Shakeable",
    "Zero Layout Thrashing",
    "Headless Hooks",
  ];

  return (
    <div className="relative overflow-hidden bg-[#fbf8f2] text-[#362117]">
      {/* Warm Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[900px] h-[450px] bg-gradient-to-b from-[#f3e7d5]/60 via-[#f8ede0]/30 to-transparent blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 max-w-5xl mx-auto text-center space-y-8">
        {/* Hanging Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-[#f2ebde] text-[#785c4b] border border-[#ede5d8] shadow-xs">
            <Sparkles size={14} className="text-[#c4432b]" />
            <span>v1.0.0 Now Available for React 19 & Next.js 15</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-[#f5eee3] text-[#362117] border border-[#ede5d8] shadow-xs">
            <Scissors size={13} className="text-[#437a3b]" />
            <span>100% Tree-Shakeable ESM</span>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#362117] max-w-4xl mx-auto leading-[1.12]">
            The Best Ant Design Suite in Town.
            <span className="block text-[#e05d44] mt-2 font-extrabold">
              Declarative JSON Schemas.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#5c4738] max-w-2xl mx-auto leading-relaxed pt-2 font-medium">
            Smoking hot 60fps virtualized data tables, automated Zod form compilation,
            and modular 100% tree-shakeable ES modules.
          </p>
        </div>

        {/* Recessed Pill Button Bar (React Hot Toast Style) */}
        <div className="pt-2">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-[#f2ebde] border border-[#ede5d8] shadow-[inset_0_1px_3px_rgba(54,33,23,0.06)]">
            <Link
              href="/docs"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-[#fffdf9] text-[#362117] font-bold text-sm transition-all shadow-[0_2px_8px_rgba(54,33,23,0.08)] hover:-translate-y-0.5 cursor-pointer"
            >
              <span>🚀 Get Started</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/docs/components/dynamic-table"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-[#fffdf9] text-[#362117] font-bold text-sm transition-all shadow-[0_2px_8px_rgba(54,33,23,0.08)] hover:-translate-y-0.5 cursor-pointer"
            >
              <span>📦 Explore Components</span>
            </Link>
            <a
              href="https://github.com/kamlesh-Sahani/antd-dynamic-ui"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-[#fffdf9] text-[#362117] font-bold text-sm transition-all shadow-[0_2px_8px_rgba(54,33,23,0.08)] hover:-translate-y-0.5 cursor-pointer"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                style={{ width: 16, height: 16 }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Feature Checklist (Exact React Hot Toast Style) */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6 max-w-xl mx-auto text-left text-xs font-semibold text-[#362117]">
          {checklistItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-[#c4432b] font-bold">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Quick Install Terminal */}
        <div className="pt-8 max-w-2xl mx-auto">
          <div className="rounded-2xl border border-[#ede5d8] bg-[#f5eee3] text-left overflow-hidden shadow-[0_2px_12px_rgba(54,33,23,0.05)]">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#ede5d8] border-b border-[#ded3c3]">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-[#785c4b]" />
                <div className="flex gap-1.5 ml-2">
                  {(["npm", "pnpm", "yarn"] as const).map((pm) => (
                    <button
                      key={pm}
                      onClick={() => setSelectedPm(pm)}
                      className={`text-xs px-2.5 py-0.5 rounded-md transition-all cursor-pointer font-bold ${
                        selectedPm === pm
                          ? "bg-white text-[#362117] shadow-xs border border-[#ded3c3]"
                          : "text-[#785c4b] hover:text-[#362117]"
                      }`}
                    >
                      {pm}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-[#362117] font-semibold py-1 px-2.5 rounded-lg bg-white border border-[#ded3c3] hover:bg-[#fffefc] shadow-xs transition-colors cursor-pointer"
              >
                {copiedPkg ? (
                  <>
                    <Check size={13} className="text-[#437a3b]" />
                    <span className="text-[#437a3b] font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} className="text-[#785c4b]" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-4 font-mono text-xs text-[#362117] bg-[#f5eee3] overflow-x-auto whitespace-nowrap">
              <span className="text-[#c4432b] font-bold">$ </span>
              {installCmds[selectedPm]}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#362117]">
            Engineered for High-Velocity Frontends
          </h2>
          <p className="text-sm sm:text-base text-[#5c4738] max-w-2xl mx-auto">
            Everything you need to deliver complex enterprise dashboards in hours instead of weeks.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="rounded-2xl border border-[#ede5d8] bg-white p-6 space-y-3 shadow-[0_2px_12px_rgba(54,33,23,0.04)] hover:shadow-[0_8px_24px_rgba(54,33,23,0.08)] hover:border-[#ded3c3] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#f5eee3] flex items-center justify-center text-[#c4432b] border border-[#ede5d8]">
              <Zap size={20} />
            </div>
            <h3 className="text-base font-bold text-[#362117]">
              60fps Virtualized DynamicTable
            </h3>
            <p className="text-xs sm:text-sm text-[#5c4738] leading-relaxed">
              Handles 100,000+ records effortlessly. Features rAF-throttled ResizeObserver,
              adaptive virtualization thresholds, drag-and-drop column reordering, export to Excel, and nested filters.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-2xl border border-[#ede5d8] bg-white p-6 space-y-3 shadow-[0_2px_12px_rgba(54,33,23,0.04)] hover:shadow-[0_8px_24px_rgba(54,33,23,0.08)] hover:border-[#ded3c3] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#f5eee3] flex items-center justify-center text-[#437a3b] border border-[#ede5d8]">
              <Scissors size={20} />
            </div>
            <h3 className="text-base font-bold text-[#362117]">
              Zero-Bloat Tree-Shaking
            </h3>
            <p className="text-xs sm:text-sm text-[#5c4738] leading-relaxed">
              Every component, hook, and utility is independently chunked into modular ES exports.
              Importing a single field like <code className="text-xs bg-[#f5eee3] px-1 py-0.5 rounded font-mono">InputField</code> never pulls unneeded code.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-2xl border border-[#ede5d8] bg-white p-6 space-y-3 shadow-[0_2px_12px_rgba(54,33,23,0.04)] hover:shadow-[0_8px_24px_rgba(54,33,23,0.08)] hover:border-[#ded3c3] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#f5eee3] flex items-center justify-center text-[#362117] border border-[#ede5d8]">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-base font-bold text-[#362117]">
              Automated Zod Form Engine
            </h3>
            <p className="text-xs sm:text-sm text-[#5c4738] leading-relaxed">
              Define forms using a simple 2D row/column JSON schema. The runtime compiles
              type-safe Zod validation on the fly with custom regex, conditional visibility, and error states.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="rounded-2xl border border-[#ede5d8] bg-white p-6 space-y-3 shadow-[0_2px_12px_rgba(54,33,23,0.04)] hover:shadow-[0_8px_24px_rgba(54,33,23,0.08)] hover:border-[#ded3c3] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#f5eee3] flex items-center justify-center text-[#c07212] border border-[#ede5d8]">
              <Layers size={20} />
            </div>
            <h3 className="text-base font-bold text-[#362117]">
              22+ Standard Form Fields
            </h3>
            <p className="text-xs sm:text-sm text-[#5c4738] leading-relaxed">
              From debounced SelectApiField to S3-compatible UploadField, Country with ISO flags,
              Phone with international dialing codes, OTP, Rating, and ColorPickers.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="rounded-2xl border border-[#ede5d8] bg-white p-6 space-y-3 shadow-[0_2px_12px_rgba(54,33,23,0.04)] hover:shadow-[0_8px_24px_rgba(54,33,23,0.08)] hover:border-[#ded3c3] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#f5eee3] flex items-center justify-center text-[#362117] border border-[#ede5d8]">
              <Cpu size={20} />
            </div>
            <h3 className="text-base font-bold text-[#362117]">
              100% Dogfooded Type-Guards
            </h3>
            <p className="text-xs sm:text-sm text-[#5c4738] leading-relaxed">
              Zero undefined errors. All internal components strictly dogfood exported utilities
              (<code className="text-xs bg-[#f5eee3] px-1 py-0.5 rounded font-mono">isArray</code>, <code className="text-xs bg-[#f5eee3] px-1 py-0.5 rounded font-mono">isObject</code>), guaranteeing rock-solid stability.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="rounded-2xl border border-[#ede5d8] bg-white p-6 space-y-3 shadow-[0_2px_12px_rgba(54,33,23,0.04)] hover:shadow-[0_8px_24px_rgba(54,33,23,0.08)] hover:border-[#ded3c3] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#f5eee3] flex items-center justify-center text-[#c4432b] border border-[#ede5d8]">
              <Database size={20} />
            </div>
            <h3 className="text-base font-bold text-[#362117]">
              Custom Reactive Hooks
            </h3>
            <p className="text-xs sm:text-sm text-[#5c4738] leading-relaxed">
              Comes equipped with <code className="text-xs bg-[#f5eee3] px-1 py-0.5 rounded font-mono">useFetch</code> with caching & abort controllers,
              <code className="text-xs bg-[#f5eee3] px-1 py-0.5 rounded font-mono">useGridFilters</code> with Zustand sync, and <code className="text-xs bg-[#f5eee3] px-1 py-0.5 rounded font-mono">useApiOptions</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Benchmark Highlights */}
      <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="rounded-2xl border border-[#ede5d8] bg-[#f5eee3] p-8 space-y-6 shadow-xs">
          <h3 className="text-lg font-bold text-[#362117] flex items-center gap-2">
            <CheckCircle2 className="text-[#437a3b]" size={20} />
            Production-Ready Architecture Benchmark
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="p-4 rounded-xl bg-white border border-[#ede5d8] shadow-xs">
              <div className="text-2xl font-black text-[#c4432b]">60 FPS</div>
              <div className="text-xs font-semibold text-[#785c4b] mt-1">Virtual Scrolling</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#ede5d8] shadow-xs">
              <div className="text-2xl font-black text-[#437a3b]">100%</div>
              <div className="text-xs font-semibold text-[#785c4b] mt-1">Tree-Shakeable ESM</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#ede5d8] shadow-xs">
              <div className="text-2xl font-black text-[#362117]">22+</div>
              <div className="text-xs font-semibold text-[#785c4b] mt-1">Form Controls</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#ede5d8] shadow-xs">
              <div className="text-2xl font-black text-[#c07212]">0 ms</div>
              <div className="text-xs font-semibold text-[#785c4b] mt-1">Layout Thrashing</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#ede5d8] shadow-xs">
              <div className="text-2xl font-black text-[#362117]">Strict</div>
              <div className="text-xs font-semibold text-[#785c4b] mt-1">TypeScript 5</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 sm:px-6 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#362117]">
          Ready to supercharge your Ant Design workflow?
        </h2>
        <div className="flex justify-center gap-4">
          <Link
            href="/docs/installation"
            className="px-6 py-3 rounded-xl bg-[#362117] hover:bg-[#261710] text-white font-bold text-sm transition-all shadow-[0_2px_8px_rgba(54,33,23,0.12)] hover:-translate-y-0.5"
          >
            Read the Installation Guide
          </Link>
          <Link
            href="/docs/components/dynamic-table"
            className="px-6 py-3 rounded-xl border border-[#ede5d8] bg-white hover:bg-[#fffdf9] text-[#362117] font-bold text-sm transition-all shadow-[0_2px_8px_rgba(54,33,23,0.06)] hover:-translate-y-0.5"
          >
            Explore Components
          </Link>
        </div>
      </section>
    </div>
  );
}
