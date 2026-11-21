import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap, ShieldAlert, Cpu, Sparkles } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "Introduction & Architecture",
  description: "Learn how antd-dynamic-ui turns declarative JSON schemas into high-performance Ant Design components.",
};

export default function DocsIntroPage() {
  const quickStartSnippet = `import React from "react";
import { DynamicTable } from "antd-dynamic-ui";
import "antd/dist/reset.css";

const tableConfig = {
  columns: [
    { title: "ID", key: "id", type: "number", width: 80 },
    { title: "Name", key: "name", type: "string", filterable: true, searchable: true },
    { title: "Role", key: "role", type: "tag", width: 120 },
    { title: "Status", key: "status", type: "badge", width: 100 },
  ],
  rows: [
    { id: 1, name: "Alice Johnson", role: "Admin", status: "success" },
    { id: 2, name: "Bob Smith", role: "Editor", status: "processing" },
    { id: 3, name: "Charlie Brown", role: "Viewer", status: "default" },
  ],
  totalRows: 3,
};

export default function UsersView() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <DynamicTable
        columns={tableConfig.columns}
        rows={tableConfig.rows}
        totalRows={tableConfig.totalRows}
        pagination={{ page: 1, limit: 10 }}
        searchable
        filterOptions={{ showFilters: true }}
      />
    </div>
  );
}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <span>Overview</span>
          <span>•</span>
          <span>v1.0.0</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Introduction to antd-dynamic-ui
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
          <strong>antd-dynamic-ui</strong> is a next-generation, declarative UI framework
          designed for Ant Design 5.x and React 18/19. It abstracts the tedious boilerplate of
          building enterprise administrative dashboards by allowing teams to drive tables,
          forms, modals, and layouts directly from clean, type-safe JSON schemas.
        </p>
      </div>

      {/* The Problem & Solution */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Why Schema-Driven UI?
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          In typical React enterprise apps, engineers write thousands of lines of repetitive JSX:
          configuring Ant Design table columns with custom render functions, wiring up
          form items with validation rules, managing pagination state, handling filter drawers,
          and writing ad-hoc responsive logic.
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          <strong>antd-dynamic-ui flips this paradigm:</strong> your backend or state management
          defines the schema (columns, fields, validation types, options), and the framework compiles
          it into optimized, accessible Ant Design components.
        </p>
      </div>

      {/* Feature Comparison */}
      <div className="my-6 overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800">
              <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">Capability</th>
              <th className="py-3 px-4 font-semibold text-rose-600 dark:text-rose-400">Traditional Ant Design</th>
              <th className="py-3 px-4 font-semibold text-emerald-600 dark:text-emerald-400">antd-dynamic-ui</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            <tr>
              <td className="py-3 px-4 font-medium text-zinc-800 dark:text-zinc-200">Table Columns</td>
              <td className="py-3 px-4 text-zinc-500">Manual JSX renderers, explicit sorters and width logic</td>
              <td className="py-3 px-4 text-zinc-800 dark:text-zinc-200 font-semibold">Declarative JSON type specifiers (<code className="text-blue-500">"tag"</code>, <code className="text-blue-500">"date"</code>, <code className="text-blue-500">"badge"</code>)</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-medium text-zinc-800 dark:text-zinc-200">Form Validation</td>
              <td className="py-3 px-4 text-zinc-500">Manual Ant Design rules or custom async validators</td>
              <td className="py-3 px-4 text-zinc-800 dark:text-zinc-200 font-semibold">Automatic Zod compilation via <code className="text-blue-500">generateZodSchema</code></td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-medium text-zinc-800 dark:text-zinc-200">Virtual Scrolling</td>
              <td className="py-3 px-4 text-zinc-500">Requires complex virtual-list plugin integration</td>
              <td className="py-3 px-4 text-zinc-800 dark:text-zinc-200 font-semibold">Built-in adaptive 60fps virtualization (&gt;50 rows) with rAF throttling</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-medium text-zinc-800 dark:text-zinc-200">Column Reordering & Export</td>
              <td className="py-3 px-4 text-zinc-500">Requires third-party dnd-kit and xlsx wiring</td>
              <td className="py-3 px-4 text-zinc-800 dark:text-zinc-200 font-semibold">Out-of-the-box column drawer and export modal built-in</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-medium text-zinc-800 dark:text-zinc-200">Type Safety & Guards</td>
              <td className="py-3 px-4 text-zinc-500">Prone to runtime <code className="text-rose-500">Cannot read property of undefined</code></td>
              <td className="py-3 px-4 text-zinc-800 dark:text-zinc-200 font-semibold">100% dogfooded utility guards (<code className="text-blue-500">isArray</code>, <code className="text-blue-500">isObject</code>)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Quick Start Snippet */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          5-Minute Quick Start
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Render a full featured table with pagination, column sorting, and custom cells with just a configuration array:
        </p>
        <CodeBlock code={quickStartSnippet} language="tsx" filename="UsersView.tsx" />
      </div>

      {/* Navigation Next steps */}
      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 grid sm:grid-cols-2 gap-4">
        <Link
          href="/docs/installation"
          className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 bg-white dark:bg-zinc-900/60 transition-all space-y-1 block"
        >
          <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">Next Step</div>
          <div className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-between">
            <span>Installation & Setup</span>
            <ArrowRight size={16} />
          </div>
          <p className="text-xs text-zinc-500">Install via npm, pnpm or yarn with peer dependencies.</p>
        </Link>

        <Link
          href="/docs/frameworks"
          className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 bg-white dark:bg-zinc-900/60 transition-all space-y-1 block"
        >
          <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">Frameworks</div>
          <div className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-between">
            <span>Next.js & Vite Integration</span>
            <ArrowRight size={16} />
          </div>
          <p className="text-xs text-zinc-500">Configure SSR registry, CSS extraction, and React 19.</p>
        </Link>
      </div>
    </div>
  );
}
