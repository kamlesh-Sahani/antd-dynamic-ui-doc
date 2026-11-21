import React from "react";
import CodeBlock from "@/components/CodeBlock";
import { CheckCircle2, AlertTriangle, Package, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Installation & Setup",
  description: "Install antd-dynamic-ui and its peer dependencies with npm, pnpm, yarn, or bun.",
};

export default function InstallationPage() {
  const npmCmd = `npm install antd-dynamic-ui antd @ant-design/icons react-hook-form zod dayjs`;
  const pnpmCmd = `pnpm add antd-dynamic-ui antd @ant-design/icons react-hook-form zod dayjs`;
  const yarnCmd = `yarn add antd-dynamic-ui antd @ant-design/icons react-hook-form zod dayjs`;
  const bunCmd = `bun add antd-dynamic-ui antd @ant-design/icons react-hook-form zod dayjs`;

  const react19Note = `// If installing on React 19, use the --legacy-peer-deps flag if any third-party peer dependency has not updated its peer ranges:
npm install antd-dynamic-ui --legacy-peer-deps`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">Getting Started</div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Installation & Dependencies
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          antd-dynamic-ui requires React 18+ or 19+, Ant Design 5+, and modern form validation libraries.
        </p>
      </div>

      {/* Package Managers */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Package size={18} className="text-blue-500" />
          Package Manager Installation
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">npm</h3>
            <CodeBlock code={npmCmd} language="bash" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">pnpm</h3>
            <CodeBlock code={pnpmCmd} language="bash" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">yarn</h3>
            <CodeBlock code={yarnCmd} language="bash" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">bun</h3>
            <CodeBlock code={bunCmd} language="bash" />
          </div>
        </div>
      </div>

      {/* Peer Dependencies Table */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <ShieldCheck size={18} className="text-emerald-500" />
          Peer Dependencies Overview
        </h2>
        <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800">
                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">Package</th>
                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">Required Version</th>
                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="py-3 px-4 font-mono font-medium text-blue-600 dark:text-blue-400">react</td>
                <td className="py-3 px-4 font-mono text-zinc-600 dark:text-zinc-400">&gt;=18.0.0 || ^19.0.0</td>
                <td className="py-3 px-4 text-zinc-700 dark:text-zinc-300">Core React UI runtime</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-medium text-blue-600 dark:text-blue-400">antd</td>
                <td className="py-3 px-4 font-mono text-zinc-600 dark:text-zinc-400">&gt;=5.0.0</td>
                <td className="py-3 px-4 text-zinc-700 dark:text-zinc-300">Ant Design base component library</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-medium text-blue-600 dark:text-blue-400">@ant-design/icons</td>
                <td className="py-3 px-4 font-mono text-zinc-600 dark:text-zinc-400">&gt;=5.0.0</td>
                <td className="py-3 px-4 text-zinc-700 dark:text-zinc-300">Ant Design icon system for drawers, tables, and buttons</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-medium text-blue-600 dark:text-blue-400">react-hook-form</td>
                <td className="py-3 px-4 font-mono text-zinc-600 dark:text-zinc-400">&gt;=7.0.0</td>
                <td className="py-3 px-4 text-zinc-700 dark:text-zinc-300">High-performance form state engine without unnecessary re-renders</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-medium text-blue-600 dark:text-blue-400">zod</td>
                <td className="py-3 px-4 font-mono text-zinc-600 dark:text-zinc-400">&gt;=3.20.0</td>
                <td className="py-3 px-4 text-zinc-700 dark:text-zinc-300">Runtime schema parsing and client-side form validation</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-medium text-blue-600 dark:text-blue-400">dayjs</td>
                <td className="py-3 px-4 font-mono text-zinc-600 dark:text-zinc-400">&gt;=1.11.0</td>
                <td className="py-3 px-4 text-zinc-700 dark:text-zinc-300">Immutable lightweight date-time parsing for DateField & DateRangeField</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* React 19 Note */}
      <div className="rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20 p-4 space-y-2">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-semibold text-sm">
          <AlertTriangle size={18} />
          <span>React 19 Installation Tip</span>
        </div>
        <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
          antd-dynamic-ui is verified 100% compatible with React 19. If you encounter peer dependency warnings
          with legacy tooling during npm install, simply pass the <code className="text-amber-700 dark:text-amber-300">--legacy-peer-deps</code> flag.
        </p>
        <CodeBlock code={react19Note} language="bash" />
      </div>
    </div>
  );
}
