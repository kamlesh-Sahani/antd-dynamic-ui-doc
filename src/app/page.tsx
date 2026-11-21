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
  Sliders,
  CheckCircle2,
  Scissors,
  PackageCheck,
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

  return (
    <div className="relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[1000px] h-[500px] bg-gradient-to-b from-blue-100/50 via-indigo-50/20 to-transparent dark:from-blue-950/20 dark:via-zinc-950/0 blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 max-w-6xl mx-auto text-center space-y-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-900 shadow-xs">
            <Sparkles size={14} className="text-blue-600 dark:text-blue-400" />
            <span>v1.0.0 Now Available with React 19 & Next.js 15</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-900 shadow-xs">
            <Scissors size={13} className="text-emerald-600 dark:text-emerald-400" />
            <span>100% Tree-Shakeable ESM</span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 max-w-4xl mx-auto leading-[1.15]">
          Build Enterprise Web Apps with{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
            Declarative JSON Schemas
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          The ultimate Ant Design accelerator. Render 60fps virtualized data tables,
          compile complex multi-step forms with automatic Zod validation, and eliminate bundle bloat
          with modular, 100% tree-shakeable ES modules.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/docs"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all shadow-md hover:shadow-lg shadow-blue-500/20"
          >
            <span>Get Started</span>
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/docs/components/dynamic-table"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-medium text-sm transition-all shadow-xs"
          >
            <span>Explore Components</span>
          </Link>
          <a
            href="https://github.com/kamlesh-Sahani/antd-dynamic-ui"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 font-medium text-sm transition-all"
          >
            <span>GitHub</span>
          </a>
        </div>

        {/* Quick Install Terminal */}
        <div className="pt-6 max-w-2xl mx-auto">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950 text-left overflow-hidden shadow-xs">
            <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-100/80 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-zinc-500 dark:text-zinc-400" />
                <div className="flex gap-1.5 ml-2">
                  {(["npm", "pnpm", "yarn"] as const).map((pm) => (
                    <button
                      key={pm}
                      onClick={() => setSelectedPm(pm)}
                      className={`text-xs px-2.5 py-0.5 rounded-md transition-all cursor-pointer ${
                        selectedPm === pm
                          ? "bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 font-semibold shadow-xs border border-zinc-200 dark:border-zinc-700"
                          : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                      }`}
                    >
                      {pm}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 py-0.5 px-2 rounded-md hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                {copiedPkg ? (
                  <>
                    <Check size={13} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-4 font-mono text-xs text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-950 overflow-x-auto whitespace-nowrap">
              <span className="text-blue-600 dark:text-blue-400 font-bold">$ </span>
              {installCmds[selectedPm]}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Engineered for Modern Enterprise Frontends
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Everything you need to deliver complex business dashboards in hours instead of weeks.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-3 shadow-xs hover:border-blue-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Zap size={20} />
            </div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              60fps Virtualized DynamicTable
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Handles 100,000+ records effortlessly. Features rAF-throttled ResizeObserver,
              adaptive virtualization thresholds, drag-and-drop column reordering, export to Excel, and nested filters.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-3 shadow-xs hover:border-blue-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Scissors size={20} />
            </div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Zero-Bloat Tree-Shaking
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Every component, hook, and utility is independently chunked into modular ES exports.
              Importing a single field like <code className="text-xs">InputField</code> or a hook like <code className="text-xs">useFetch</code> never pulls the rest of the library into your client bundle.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-3 shadow-xs hover:border-blue-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Automated Zod Form Engine
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Define forms using a simple 2D row/column JSON schema. The runtime compiles
              type-safe Zod validation on the fly with custom regex, conditional visibility, and error states.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-3 shadow-xs hover:border-blue-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <Layers size={20} />
            </div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              22+ Standard Form Fields
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              From debounced SelectApiField to S3-compatible UploadField, Country with ISO flags,
              Phone with international dialing codes, OTP, Rating, and ColorPickers.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-3 shadow-xs hover:border-blue-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Cpu size={20} />
            </div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              100% Dogfooded Type-Guards
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Zero undefined errors. All internal components strictly dogfood exported utilities
              (<code className="text-xs">isArray</code>, <code className="text-xs">isObject</code>, <code className="text-xs">isString</code>), guaranteeing rock-solid stability.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-3 shadow-xs hover:border-blue-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Database size={20} />
            </div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Custom Reactive Hooks
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Comes equipped with <code className="text-xs">useFetch</code> with caching & abort controllers,
              <code className="text-xs">useGridFilters</code> with Zustand sync, and <code className="text-xs">useApiOptions</code> with debounce.
            </p>
          </div>
        </div>
      </section>

      {/* Benchmark Highlights */}
      <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/40 p-8 space-y-6">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <CheckCircle2 className="text-emerald-500" size={20} />
            Production-Ready Architecture Benchmark
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">60 FPS</div>
              <div className="text-xs text-zinc-500 mt-1">Virtual Scrolling</div>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">100%</div>
              <div className="text-xs text-zinc-500 mt-1">Tree-Shakeable ESM</div>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">22+</div>
              <div className="text-xs text-zinc-500 mt-1">Form Controls</div>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">0 ms</div>
              <div className="text-xs text-zinc-500 mt-1">Layout Thrashing</div>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">Strict</div>
              <div className="text-xs text-zinc-500 mt-1">TypeScript 5</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 sm:px-6 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Ready to supercharge your Ant Design workflow?
        </h2>
        <div className="flex justify-center gap-4">
          <Link
            href="/docs/installation"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all shadow-md shadow-blue-500/20"
          >
            Read the Installation Guide
          </Link>
          <Link
            href="/docs/troubleshooting"
            className="px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-medium text-sm transition-all"
          >
            Response Mismatch Guide
          </Link>
        </div>
      </section>
    </div>
  );
}
